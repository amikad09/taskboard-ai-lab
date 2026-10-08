# Focused context decision

**Candidate:** P5 instructor implementation copy
**Decision:** where should the count be derived?

| Included                          | Reason                              |
| --------------------------------- | ----------------------------------- |
| `docs/plans/active.md`            | authoritative task and acceptance   |
| `docs/project-map.md`             | package ownership and request path  |
| `apps/web/src/App.tsx`            | current UI state and rendering      |
| `apps/web/src/api.ts`             | validated latest response           |
| `packages/contracts/src/index.ts` | response shape                      |
| browser test                      | composed behavior and keyboard path |

**Excluded:** backend application and mapper, generated Encore files, unrelated
planning history, remote/VPS docs, and the transfer answer. They do not answer
the UI derivation decision.

**Unknown before inspection:** whether the response contract already exposes
all tasks needed for the count.
