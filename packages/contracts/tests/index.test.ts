import { describe, expect, it } from "vitest";
import type { ListTasksResponse, ToggleTaskResponse } from "../src/index";

describe("wire contracts", () => {
  it("keeps the task response shape explicit", () => {
    const response: ListTasksResponse = {
      tasks: [{ id: "brief", title: "Write a brief", completed: false }],
    };

    expect(response.tasks[0]?.id).toBe("brief");
  });

  it("represents an unknown target without inventing a changed task", () => {
    const response: ToggleTaskResponse = {
      tasks: [],
      targetId: "missing",
      changed: false,
    };

    expect(response.changed).toBe(false);
  });
});
