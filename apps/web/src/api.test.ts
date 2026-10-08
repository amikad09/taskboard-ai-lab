import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchTasks, isListTasksResponse, isToggleTaskResponse, toggleTask } from "./api";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("API response guards", () => {
  it("accepts a valid task list", () => {
    expect(
      isListTasksResponse({
        tasks: [{ id: "brief", title: "Write a brief", completed: false }],
      }),
    ).toBe(true);
  });

  it("rejects malformed task data", () => {
    expect(isListTasksResponse({ tasks: [{ id: "brief" }] })).toBe(false);
  });

  it("accepts a toggle response with an explicit changed flag", () => {
    expect(
      isToggleTaskResponse({
        tasks: [],
        targetId: "missing",
        changed: false,
      }),
    ).toBe(true);
  });

  it("classifies a read network failure as non-mutating", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));

    await expect(fetchTasks()).rejects.toMatchObject({
      kind: "network",
      operation: "load-tasks",
      mayHaveCommitted: false,
    });
  });

  it("classifies an unconfirmed toggle response as potentially committed", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ unexpected: true }), {
          headers: { "content-type": "application/json" },
          status: 200,
        }),
      ),
    );

    await expect(toggleTask("brief")).rejects.toMatchObject({
      kind: "invalid-response",
      operation: "toggle-task",
      mayHaveCommitted: true,
    });
  });

  it("does not start a request with an empty task identifier", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(toggleTask("  ")).rejects.toMatchObject({
      kind: "invalid-input",
      mayHaveCommitted: false,
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("classifies an already-cancelled mutation before fetch", async () => {
    const controller = new AbortController();
    controller.abort();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(toggleTask("brief", controller.signal)).rejects.toMatchObject({
      kind: "aborted",
      operation: "toggle-task",
      mayHaveCommitted: true,
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
