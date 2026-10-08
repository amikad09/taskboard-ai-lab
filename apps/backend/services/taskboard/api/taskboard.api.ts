/**
 * Typed Encore API adapters for the Taskboard service.
 *
 * @remarks
 * Endpoint functions map transport inputs to application use cases. They do
 * not contain task-state policy. Encore owns the HTTP boundary and validates
 * the declared request/response shapes at runtime.
 */

import { api } from "encore.dev/api";
import type {
  ListTasksResponse,
  ResetTasksResponse,
  ToggleTaskParams,
  ToggleTaskResponse,
} from "@taskboard/contracts";
import {
  listTasks as listTaskState,
  resetTasks as resetTaskState,
  toggleTaskById,
} from "../application/taskboard";

/** Read the current task snapshot. */
export const listTasks = api(
  { expose: true, method: "GET", path: "/tasks" },
  async (): Promise<ListTasksResponse> => listTaskState(),
);

/** Toggle one task and return the complete post-operation snapshot. */
export const toggle = api(
  { expose: true, method: "POST", path: "/tasks/:id/toggle" },
  async ({ id }: ToggleTaskParams): Promise<ToggleTaskResponse> => toggleTaskById(id),
);

/** Restore the deterministic in-memory task seed. */
export const reset = api(
  { expose: true, method: "POST", path: "/tasks/reset" },
  async (): Promise<ResetTasksResponse> => resetTaskState(),
);
