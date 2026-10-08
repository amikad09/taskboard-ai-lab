import type { ListTasksResponse, TaskDto, ToggleTaskResponse } from "@taskboard/contracts";

/** Operations exposed by the browser client. */
export type TaskboardOperation = "load-tasks" | "toggle-task";

/** Failure classes that can be distinguished without inspecting a raw error string. */
export type TaskboardClientErrorKind =
  | "aborted"
  | "invalid-input"
  | "invalid-response"
  | "network"
  | "http";

/**
 * A typed failure at the browser/service boundary.
 *
 * @remarks
 * `mayHaveCommitted` is the important mutation safety signal. A failed write
 * response does not prove that the service did not apply the change, so the
 * UI must reconcile by reading the service again instead of claiming success.
 */
export class TaskboardClientError extends Error {
  /** Operation that produced the failure. */
  readonly operation: TaskboardOperation;

  /** Classification that callers can use for recovery. */
  readonly kind: TaskboardClientErrorKind;

  /** Whether the server may have applied a write before the failure surfaced. */
  readonly mayHaveCommitted: boolean;

  /**
   * Creates a typed client error.
   *
   * @param options - Failure details preserved for the UI and tests.
   */
  constructor(options: {
    readonly operation: TaskboardOperation;
    readonly kind: TaskboardClientErrorKind;
    readonly message: string;
    readonly mayHaveCommitted: boolean;
  }) {
    super(options.message);
    this.name = "TaskboardClientError";
    this.operation = options.operation;
    this.kind = options.kind;
    this.mayHaveCommitted = options.mayHaveCommitted;
  }
}

/**
 * Checks one untrusted value before it becomes a task DTO.
 *
 * @param value - JSON value returned by the service.
 * @returns Whether the value has all required task fields.
 */
function isTask(value: unknown): value is TaskDto {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.completed === "boolean"
  );
}

/**
 * Checks the list response before the browser stores it as application state.
 *
 * @param value - Untrusted JSON returned by the service.
 * @returns Whether the value has the expected list shape.
 */
export function isListTasksResponse(value: unknown): value is ListTasksResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as unknown as Record<string, unknown>).tasks) &&
    (value as { tasks: unknown[] }).tasks.every(isTask)
  );
}

/**
 * Checks the toggle response before the browser applies the new snapshot.
 *
 * @param value - Untrusted JSON returned by the service.
 * @returns Whether the value has the expected toggle shape.
 */
export function isToggleTaskResponse(value: unknown): value is ToggleTaskResponse {
  if (!isListTasksResponse(value)) {
    return false;
  }

  const candidate = value as unknown as Record<string, unknown>;
  return typeof candidate.targetId === "string" && typeof candidate.changed === "boolean";
}

interface JsonRequestOptions<ResponseBody> {
  readonly operation: TaskboardOperation;
  readonly request: RequestInfo | URL;
  readonly init?: RequestInit;
  readonly signal?: AbortSignal;
  readonly mayHaveCommitted: boolean;
  readonly validate: (value: unknown) => value is ResponseBody;
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

function requestFailure(options: {
  readonly operation: TaskboardOperation;
  readonly kind: TaskboardClientErrorKind;
  readonly message: string;
  readonly mayHaveCommitted: boolean;
}): TaskboardClientError {
  return new TaskboardClientError(options);
}

async function requestJson<ResponseBody>(
  options: JsonRequestOptions<ResponseBody>,
): Promise<ResponseBody> {
  if (options.signal?.aborted) {
    throw requestFailure({
      operation: options.operation,
      kind: "aborted",
      message: "The request was cancelled before it started.",
      mayHaveCommitted: options.mayHaveCommitted,
    });
  }

  let response: Response;
  try {
    const init =
      options.signal === undefined
        ? { ...options.init }
        : { ...options.init, signal: options.signal };
    response = await fetch(options.request, init);
  } catch (error) {
    const aborted = options.signal?.aborted || isAbortError(error);
    throw requestFailure({
      operation: options.operation,
      kind: aborted ? "aborted" : "network",
      message: aborted
        ? "The request was cancelled."
        : "The Taskboard service could not be reached.",
      mayHaveCommitted: options.mayHaveCommitted,
    });
  }

  if (!response.ok) {
    throw requestFailure({
      operation: options.operation,
      kind: "http",
      message: `The Taskboard service returned HTTP ${response.status}.`,
      mayHaveCommitted: options.mayHaveCommitted,
    });
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw requestFailure({
      operation: options.operation,
      kind: "invalid-response",
      message: "The Taskboard service returned invalid JSON.",
      mayHaveCommitted: options.mayHaveCommitted,
    });
  }

  if (!options.validate(payload)) {
    throw requestFailure({
      operation: options.operation,
      kind: "invalid-response",
      message: "The Taskboard service returned an unexpected response.",
      mayHaveCommitted: options.mayHaveCommitted,
    });
  }

  return payload;
}

/**
 * Loads the current task snapshot.
 *
 * @param signal - Optional cancellation signal owned by the caller.
 * @returns A validated task snapshot.
 * @throws {@link TaskboardClientError} when transport or response validation
 * fails. Read failures never imply a server-side mutation.
 */
export function fetchTasks(signal?: AbortSignal): Promise<ListTasksResponse> {
  return requestJson({
    operation: "load-tasks",
    request: "/tasks",
    mayHaveCommitted: false,
    validate: isListTasksResponse,
    ...(signal === undefined ? {} : { signal }),
  });
}

/**
 * Requests one task transition.
 *
 * @param id - Non-empty task identifier.
 * @param signal - Optional cancellation signal owned by the caller.
 * @returns A validated post-operation snapshot.
 * @throws {@link TaskboardClientError} when the request cannot be confirmed.
 * A transport or response failure is marked as potentially committed because
 * the service may have processed the write before the browser lost the reply.
 */
export function toggleTask(id: string, signal?: AbortSignal): Promise<ToggleTaskResponse> {
  if (id.trim() === "") {
    return Promise.reject(
      requestFailure({
        operation: "toggle-task",
        kind: "invalid-input",
        message: "A task identifier is required.",
        mayHaveCommitted: false,
      }),
    );
  }

  return requestJson({
    operation: "toggle-task",
    request: "/tasks/" + encodeURIComponent(id) + "/toggle",
    init: { method: "POST" },
    mayHaveCommitted: true,
    validate: isToggleTaskResponse,
    ...(signal === undefined ? {} : { signal }),
  });
}
