/**
 * Maps pure task state to the public Taskboard response shape.
 *
 * @remarks
 * This mapper does not make domain decisions or perform I/O. It is the narrow
 * boundary where the internal domain value becomes a wire-safe DTO.
 */

import type { Task } from "@taskboard/core";
import type { TaskDto } from "@taskboard/contracts";

/**
 * Maps one domain task to its public DTO.
 *
 * @param task - Domain value owned by the pure core.
 * @returns A structurally independent DTO.
 */
function toTaskDto(task: Task): TaskDto {
  return {
    id: task.id,
    title: task.title,
    completed: task.completed,
  };
}

/**
 * Maps a read-only task collection to public DTOs.
 *
 * @param tasks - Domain values in display order.
 * @returns A new array containing one DTO per input task.
 */
export function toTaskDtos(tasks: readonly Task[]): TaskDto[] {
  return tasks.map(toTaskDto);
}
