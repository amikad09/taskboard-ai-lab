# Active task

**Outcome:** add an “open tasks” count derived from the latest server response.
**Read:** docs/project-map.md, apps/web/src/App.tsx, apps/web/src/api.ts, packages/contracts/src/index.ts.
**Allowed edit:** apps/web/src/App.tsx and tests/browser/taskboard.spec.ts only.
**Keep:** Encore endpoints, package boundaries, lockfile, task transitions and error feedback.
**Accept:** count updates after toggle/undo; empty list shows zero; failed request never claims a successful count update.
**Checks:** web types/lint/build, focused browser test, full verify before handoff.
**Stop:** red baseline, missing contract, unknown file owner or a new dependency request.
**Rollback:** restore only the preserved files for this change.

Ask the agent for a plan and file list before edits. This is the guided P5 task;
do not paste a completed answer. The separate transfer task is the
all/complete/open filter in [transfer-task.md](../transfer-task.md).
