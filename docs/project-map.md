# Where the feature lives

| Path                                                     | Owns                                                                |
| -------------------------------------------------------- | ------------------------------------------------------------------- |
| apps/web/src/App.tsx                                     | browser state and accessible interaction                            |
| apps/web/src/api.ts                                      | cancellable requests, response validation and uncertainty semantics |
| apps/backend/services/taskboard/encore.service.ts        | Encore service registration                                         |
| apps/backend/services/taskboard/api/taskboard.api.ts     | typed API endpoints                                                 |
| apps/backend/services/taskboard/application/taskboard.ts | local state and orchestration                                       |
| apps/backend/services/taskboard/mappers/taskboard.ts     | domain → public DTO                                                 |
| packages/contracts/src/index.ts                          | public wire shapes                                                  |
| packages/taskboard-core/src/index.ts                     | pure task transitions                                               |
| docs/code-quality.md                                     | boundary, TSDoc and proof contract                                  |

Web → contracts. Backend → contracts and core. Pure core and contracts have no runtime package dependency.

The backend TypeScript project resolves Encore imports to the declaration files
shipped in `encore.dev/dist/`. `encore check` remains the framework compiler
authority; see [the Encore type boundary](../apps/backend/types/README.md).

For each task, name included files and why they matter. Name tempting exclusions. If the agent asks for more context, ask which decision the extra file answers.
