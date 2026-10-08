/**
 * Application orchestration for the in-memory Taskboard use cases.
 *
 * @remarks
 * This module owns the demo process state and delegates transitions to the
 * pure core package. It has no Encore imports, so the application policy can be
 * tested without starting a service.
 */

import { seedTasks, toggleTask, type Task, type ToggleTaskResult } from "@taskboard/core";
import type {
  ListTasksResponse,
  ResetTasksResponse,
  ToggleTaskResponse,
} from "@taskboard/contracts";
import { toTaskDtos } from "../mappers/taskboard";

let tasks: Task[] = seedTasks();

/**
 * Returns the current process-local snapshot.
 *
 * @returns DTOs in deterministic display order.
 */
export function listTasks(): ListTasksResponse {
  return { tasks: toTaskDtos(tasks) };
}

/**
 * Toggles one task in the process-local state.
 *
 * @param id - Task identifier received from the API adapter.
 * @returns The complete post-operation snapshot and change flag.
 */
export function toggleTaskById(id: string): ToggleTaskResponse {
  const result: ToggleTaskResult = toggleTask(tasks, id);
  tasks = result.tasks;
  return {
    tasks: toTaskDtos(tasks),
    targetId: id,
    changed: result.changed,
  };
}

/**
 * Replaces process-local state with a fresh deterministic seed.
 *
 * @returns The post-reset snapshot.
 */
export function resetTasks(): ResetTasksResponse {
  tasks = seedTasks();
  return { tasks: toTaskDtos(tasks) };
}
