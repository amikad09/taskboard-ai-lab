import { useCallback, useEffect, useRef, useState } from "react";
import type { TaskDto } from "@taskboard/contracts";
import { fetchTasks, TaskboardClientError, toggleTask } from "./api";
import "./styles.css";

type LoadState =
  | { readonly status: "loading" }
  | { readonly status: "ready"; readonly tasks: TaskDto[] }
  | {
      readonly status: "error";
      readonly operation: "load" | "toggle";
      readonly message: string;
    }
  | { readonly status: "uncertain"; readonly message: string };

type Notice = { readonly message: string } | null;

interface Operation {
  readonly id: number;
  readonly controller: AbortController;
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

/**
 * The learner-facing Taskboard screen.
 *
 * @remarks
 * The component treats every response as untrusted until the client guards
 * it. Mutations are serialized so one browser action cannot overwrite another
 * with an older snapshot. A failed mutation enters an uncertain state when
 * the service may have applied the write; the learner must reload to reconcile
 * instead of being shown a false success.
 */
export default function App() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const operationIdRef = useRef(0);
  const activeControllerRef = useRef<AbortController | null>(null);

  const beginOperation = useCallback((): Operation => {
    activeControllerRef.current?.abort();
    const operation = {
      id: operationIdRef.current + 1,
      controller: new AbortController(),
    };
    operationIdRef.current = operation.id;
    activeControllerRef.current = operation.controller;
    return operation;
  }, []);

  const isCurrent = useCallback(
    (operation: Operation): boolean => operationIdRef.current === operation.id,
    [],
  );

  const load = useCallback(async () => {
    const operation = beginOperation();
    setBusyId(null);
    setNotice(null);
    setState({ status: "loading" });

    try {
      const response = await fetchTasks(operation.controller.signal);
      if (!isCurrent(operation)) {
        return;
      }
      setState({ status: "ready", tasks: response.tasks });
    } catch (error) {
      if (!isCurrent(operation) || operation.controller.signal.aborted) {
        return;
      }
      setState({
        status: "error",
        operation: "load",
        message: errorMessage(error, "The Taskboard could not load."),
      });
    } finally {
      if (isCurrent(operation)) {
        activeControllerRef.current = null;
      }
    }
  }, [beginOperation, isCurrent]);

  useEffect(() => {
    void load();
    return () => {
      operationIdRef.current += 1;
      activeControllerRef.current?.abort();
      activeControllerRef.current = null;
    };
  }, [load]);

  const handleToggle = useCallback(
    async (id: string) => {
      const operation = beginOperation();
      setBusyId(id);
      setNotice(null);

      try {
        const response = await toggleTask(id, operation.controller.signal);
        if (!isCurrent(operation)) {
          return;
        }
        setState({ status: "ready", tasks: response.tasks });
        setNotice({
          message: response.changed
            ? "Task updated and checked by the local service."
            : "That task was not found; no row changed.",
        });
      } catch (error) {
        if (!isCurrent(operation) || operation.controller.signal.aborted) {
          return;
        }

        const mayHaveCommitted =
          error instanceof TaskboardClientError ? error.mayHaveCommitted : true;
        if (mayHaveCommitted) {
          setState({
            status: "uncertain",
            message:
              "The service may have applied the change, but the browser could not confirm it. Reload to reconcile.",
          });
        } else {
          setState({
            status: "error",
            operation: "toggle",
            message: errorMessage(error, "The Taskboard could not update."),
          });
        }
      } finally {
        if (isCurrent(operation)) {
          activeControllerRef.current = null;
          setBusyId(null);
        }
      }
    },
    [beginOperation, isCurrent],
  );

  const isBusy = busyId !== null;

  return (
    <main className="shell">
      <header className="hero">
        <p className="eyebrow">AI Dev Lab · proof-first workspace</p>
        <h1>Taskboard</h1>
        <p>Toggle one task, inspect the request path, and keep the evidence current.</p>
      </header>

      <section className="card" aria-labelledby="tasks-heading">
        <div className="card-heading">
          <div>
            <p className="eyebrow">Current feature</p>
            <h2 id="tasks-heading">Small work that can be checked</h2>
          </div>
          <button
            className="secondary"
            type="button"
            disabled={isBusy || state.status === "loading"}
            onClick={() => void load()}
          >
            Reload
          </button>
        </div>

        <div className="status" role="status" aria-live="polite">
          {notice?.message ?? ""}
        </div>

        {state.status === "loading" && <p className="state-message">Loading Taskboard rows…</p>}

        {(state.status === "error" || state.status === "uncertain") && (
          <div className="state-message error" role="alert">
            <strong>
              {state.status === "uncertain"
                ? "Response needs reconciliation"
                : state.operation === "toggle"
                  ? "Could not confirm update"
                  : "Could not load"}
            </strong>
            <p>{state.message}</p>
            <button
              className="secondary"
              type="button"
              disabled={isBusy}
              onClick={() => void load()}
            >
              Reload
            </button>
          </div>
        )}

        {state.status === "ready" && state.tasks.length === 0 && (
          <p className="state-message">No tasks yet. The empty state is safe.</p>
        )}

        {state.status === "ready" && state.tasks.length > 0 && (
          <ul className="task-list">
            {state.tasks.map((task) => {
              const label = task.completed
                ? "Mark " + task.title + " incomplete"
                : "Mark " + task.title + " complete";
              return (
                <li className="task-row" key={task.id}>
                  <div>
                    <span className="task-title">{task.title}</span>
                    <span className="task-state">{task.completed ? "Complete" : "Open"}</span>
                  </div>
                  <button
                    className={task.completed ? "complete" : "primary"}
                    type="button"
                    aria-pressed={task.completed}
                    aria-label={label}
                    disabled={isBusy}
                    onClick={() => void handleToggle(task.id)}
                  >
                    {busyId === task.id ? "Saving…" : task.completed ? "Undo" : "Complete"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <footer className="footer">
        <span>Local demo data resets when the Encore process restarts.</span>
        <span>Keyboard path and status feedback are part of the feature.</span>
      </footer>
    </main>
  );
}
