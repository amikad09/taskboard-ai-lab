/**
 * Shared wire contracts for the fictional Taskboard API.
 *
 * @remarks
 * These types describe the public request/response boundary. They do not
 * contain business decisions or framework imports. The Encore endpoint and
 * browser client both depend on this package, so a change here is a contract
 * change rather than a local implementation detail.
 */

/** A task value that can safely cross the browser/service boundary. */
export interface TaskDto {
  /** Stable identifier used by the toggle endpoint. */
  readonly id: string;
  /** Human-readable task label rendered by the browser. */
  readonly title: string;
  /** Whether the task is currently complete. */
  readonly completed: boolean;
}

/** Response returned when the browser requests the current task list. */
export interface ListTasksResponse {
  /** Tasks in the service's deterministic display order. */
  readonly tasks: TaskDto[];
}

/** Path parameters accepted by the toggle endpoint. */
export interface ToggleTaskParams {
  /** Identifier of the task the caller wants to toggle. */
  readonly id: string;
}

/**
 * Response returned after a toggle attempt.
 *
 * @remarks
 * `changed` is false when the service received an unknown identifier. A
 * transport failure has no response and must never be represented as a
 * successful `ToggleTaskResponse` by a client.
 */
export interface ToggleTaskResponse {
  /** Complete post-operation task snapshot. */
  readonly tasks: TaskDto[];
  /** Identifier supplied by the caller. */
  readonly targetId: string;
  /** Whether the service changed a known task. */
  readonly changed: boolean;
}

/** Response returned after restoring the deterministic seed state. */
export interface ResetTasksResponse {
  /** Complete post-reset task snapshot. */
  readonly tasks: TaskDto[];
}

/** Stable error shape reserved for a future typed problem response. */
export interface ProblemResponse {
  /** Machine-readable error category. */
  readonly code: string;
  /** Human-readable explanation safe for this local demo. */
  readonly message: string;
}
