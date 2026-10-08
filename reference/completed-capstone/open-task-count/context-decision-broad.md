# Broad context comparison packet

**Purpose:** compare context discipline, not produce a second implementation.

This packet includes the complete `docs/` tree, all Taskboard source files,
planning history, remote notes, failure fixtures, and the same task brief. It is
labelled broad because much of it cannot change the open-count decision.

**Expected risk:** the agent may spend time summarizing unrelated material,
confuse the transfer filter with the guided task, or propose backend changes
without evidence that the response contract needs them.

**Required comparison fields:** candidate, provider/settings, included files,
excluded files, tool calls, retries, review findings, elapsed time, acceptance
result, and unavailable telemetry as `unknown`.
