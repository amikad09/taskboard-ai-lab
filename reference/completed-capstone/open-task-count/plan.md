# Approved instructor plan

1. Preserve the learner baseline in a disposable instructor copy.
2. Derive the number from `state.tasks` only when `state.status === "ready"`.
   Use a plain expression; no new state, API, or Effect.
3. Render a labelled, politely announced summary for ready responses,
   including empty responses. Remove it while loading, failed, or uncertain.
4. Add browser assertions for initial count, toggle/undo, empty response,
   loading, failure, uncertainty, and preserved keyboard focus.
5. Format the two changed files; run focused web types, lint, Vitest, and the
   browser route. Then run the finite workspace route and Knip diagnostic.
6. Preserve a clean answer. In a second disposable copy, replace the derived
   value with a fixed count. Predict the real toggle/undo assertion will fail;
   run that exact browser test, preserve the red, restore the exact bytes,
   and rerun it.
7. Give a fresh read-only Codex session the brief, current source/tests, diff,
   and evidence. Repair only a demonstrated finding.
8. Save the answer patch, review, measurement limits, and transfer handoff.

**Allowed edits:** `apps/web/src/App.tsx` and
`tests/browser/taskboard.spec.ts`. The current user authorized the P5
instructor implementation; another confirmation is not required for these
bounded local edits.

**Stop:** red baseline, scope drift, unknown response, second counter state,
new dependency, secret, destructive action, publication, or mutation launcher.

**Rollback:** retain the answer and restore only the two preserved source
files. Keep diagnostic output; never reset the starter's dirty worktree.
