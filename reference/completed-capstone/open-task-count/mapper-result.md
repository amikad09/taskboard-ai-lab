# Mapper result

The response already contains all task records. The browser stores that
validated list only in the ready state. The count can therefore be derived
where the component renders the current list.

| Read                                  | Decision                                                    |
| ------------------------------------- | ----------------------------------------------------------- |
| Active task and project map           | Confirm the outcome and file owner                          |
| `App.tsx`                             | Find ready/loading/error/uncertain state rendering          |
| `api.ts`                              | Confirm runtime response validation and write serialization |
| Contracts                             | Confirm the `completed` boolean is already available        |
| Browser test                          | Locate the real toggle and uncertain-response proof         |
| Package scripts and Playwright config | Confirm finite commands and local server composition        |

No backend edit, response-contract edit, new dependency, Effect, or separate
counter state is needed. Exclude backend internals, generated files, remote
setup, pricing, and the transfer answer from the implementation prompt.

The mapper was the main Codex integration session. Its result is an
instructor observation, not a separate model benchmark or independent B.
