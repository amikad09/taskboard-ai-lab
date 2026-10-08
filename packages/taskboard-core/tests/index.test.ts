import { describe, expect, it } from "vitest";
import { seedTasks, toggleTask } from "../src/index";

describe("toggleTask", () => {
  it("toggles an incomplete task to complete", () => {
    const result = toggleTask(seedTasks(), "brief");

    expect(result.changed).toBe(true);
    expect(result.tasks.find((task) => task.id === "brief")?.completed).toBe(true);
  });

  it("toggles a complete task back to incomplete", () => {
    const first = toggleTask(seedTasks(), "brief");
    const second = toggleTask(first.tasks, "brief");

    expect(second.tasks.find((task) => task.id === "brief")?.completed).toBe(false);
  });

  it("preserves all other tasks", () => {
    const before = seedTasks();
    const result = toggleTask(before, "brief");

    expect(result.tasks.filter((task) => task.id !== "brief")).toEqual(
      before.filter((task) => task.id !== "brief"),
    );
  });

  it("leaves state unchanged for an unknown ID", () => {
    const before = seedTasks();
    const result = toggleTask(before, "missing");

    expect(result.changed).toBe(false);
    expect(result.tasks).toEqual(before);
  });

  it("restores the original state after two toggles", () => {
    const before = seedTasks();
    const once = toggleTask(before, "brief");
    const twice = toggleTask(once.tasks, "brief");

    expect(twice.tasks).toEqual(before);
  });
});
