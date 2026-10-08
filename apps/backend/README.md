# Taskboard backend

This is an Encore.ts application with one small taskboard service.

```text
services/taskboard/
├── encore.service.ts
├── api/
├── application/
├── mappers/
└── tests/
```

The service owns typed API adapters and application orchestration. The pure
state transition remains in @taskboard/core. Start the backend with encore run,
inspect the local dashboard, and keep encore check and encore test as
visible proof commands.

The backend tsconfig resolves the Encore imports to the declaration files shipped
in `encore.dev/dist/`. This keeps TypeScript focused on the starter's code while
using the SDK's real public types. `encore check` remains the authoritative
Encore graph and compiler check. See [the type-boundary note](types/README.md).
