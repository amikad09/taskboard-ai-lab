/**
 * Pure Taskboard state transitions.
 *
 * @remarks
 * This module has no framework, network, filesystem, clock, or provider
 * dependency. An unknown ID leaves every task unchanged. Keeping this policy
 * pure makes it cheap to test and safe for an agent to inspect without loading
 * the Encore runtime.
 */

/** The domain representation of one Taskboard row. */
export interface Task {
  /** Stable identifier used by the transition function. */
  readonly id: string;
  /** Human-readable task label. */
  readonly title: string;
  /** Current completion state. */
  readonly completed: boolean;
}

/** Result of applying one pure task transition. */
export interface ToggleTaskResult {
  /** New task array; the input array is never mutated. */
  readonly tasks: Task[];
  /** Whether a known task was found and changed. */
  readonly changed: boolean;
}

/**
 * Creates the deterministic task set used by the local teaching application.
 *
 * @returns A fresh array that callers may own and replace.
 */
export function seedTasks(): Task[] {
  return [
    { id: "brief", title: "Write a bounded feature brief", completed: false },
    { id: "context", title: "Choose focused project context", completed: false },
    { id: "proof", title: "Record verification evidence", completed: false },
  ];
}

/**
 * Toggles one task without mutating the supplied array.
 *
 * @param tasks - Current task state. It is treated as immutable input.
 * @param taskId - Identifier to toggle.
 * @returns The next state and whether a known task changed.
 * @remarks Unknown identifiers return a copied, equivalent state with
 * `changed: false`. This makes a missing-row request observable without
 * inventing a mutation.
 */
export function toggleTask(tasks: readonly Task[], taskId: string): ToggleTaskResult {
  let changed = false;
  const nextTasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return { ...task };
    }

    changed = true;
    return { ...task, completed: !task.completed };
  });

  return { tasks: nextTasks, changed };
}
