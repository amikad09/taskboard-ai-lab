# Instructor task brief

**Outcome:** show the number of open tasks from the latest server response.

**Read:** `docs/plans/active.md`, `docs/project-map.md`, `apps/web/src/App.tsx`,
`apps/web/src/api.ts`, and `packages/contracts/src/index.ts`.

**Exclude:** backend implementation, generated Encore output, unrelated docs,
lockfile, and the transfer-task answer.

**Allowed:** `apps/web/src/App.tsx` and
`tests/browser/taskboard.spec.ts` only. A response-contract change requires a
new plan; it is not necessary for this task.

**Must remain:** Encore endpoints, package boundaries, task transitions,
request error/uncertain feedback, and the latest-response semantics.

**Acceptance:**

- the initial count equals the number of incomplete tasks;
- a successful toggle updates the count from the returned response;
- undo restores the count;
- an empty response shows zero;
- a failed or uncertain request does not claim a successful count update;
- the count stays readable and the existing keyboard action keeps focus.

**Checks:** focused web type/lint/test/browser checks, then full `pnpm verify`,
`pnpm test:browser`, and `pnpm deadcode`.

**Stop:** red baseline, scope drift, a second counter state, new dependency,
secret, or unknown response contract.
