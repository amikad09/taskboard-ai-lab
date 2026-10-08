import { beforeEach, describe, expect, it } from "vitest";
import { listTasks, resetTasks, toggleTaskById } from "../application/taskboard";

describe("taskboard application", () => {
  beforeEach(() => {
    resetTasks();
  });

  it("toggles a task through the application boundary", () => {
    const before = listTasks();
    const result = toggleTaskById("brief");

    expect(result.changed).toBe(true);
    expect(result.tasks.find((task) => task.id === "brief")?.completed).toBe(
      !before.tasks.find((task) => task.id === "brief")?.completed,
    );
  });

  it("leaves state unchanged for an unknown task", () => {
    const before = listTasks();
    const result = toggleTaskById("missing");

    expect(result.changed).toBe(false);
    expect(result.tasks).toEqual(before.tasks);
  });
});
