# What each check tells you

| Command           | Answers                                                 | Does not prove                              |
| ----------------- | ------------------------------------------------------- | ------------------------------------------- |
| pnpm format:check | formatting matches the tool                             | behavior                                    |
| pnpm check-types  | declared types compose                                  | runtime validation                          |
| pnpm check:encore | Encore graph and endpoint compiler accept the app       | intended behavior                           |
| pnpm lint         | configured static rules pass                            | complete coverage                           |
| pnpm test         | core, application and client cases pass                 | a browser works                             |
| pnpm test:encore  | the Encore test route runs the configured suite         | production readiness                        |
| pnpm build        | shared packages and web compile; backend check succeeds | a deployable backend image                  |
| pnpm test:browser | composed Encore/Vite browser cases pass                 | every device or manual accessibility review |
| pnpm deadcode     | configured entries and imports form a usable Knip graph | dynamic reachability or all unused code     |
| fresh review      | evidence can be challenged independently                | approval or all possible defects            |

pnpm verify runs finite gates in order. Browser checks and manual observations are separate. A cache hit saves repeated work; it does not prove an untested feature.

`pnpm deadcode` is a separate diagnostic. Record and classify its findings
before making a repair. The starter does not run auto-deletion, `--fix`, or a
production-mode scan in the first verification route. See [Knip](knip.md).

[Fault labs](../reference/failure-labs/README.md) teach how a check can miss a believable mistake. No full mutation score is advertised.

The browser request proof also covers two safety properties: writes are
serialized, and a failed write that may have reached the service enters an
uncertain state until a reload reconciles the snapshot. See
[the code-quality contract](code-quality.md).
