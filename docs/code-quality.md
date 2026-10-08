# Code-quality contract

This starter is a teaching surface for making a small feature easy to inspect,
change, and prove. The rules below describe the behavior the checks are meant
to protect.

## Boundaries

- `apps/web` owns browser state, interaction, request cancellation, response
  validation, and user-facing recovery.
- `apps/backend/services/taskboard/api` owns Encore transport declarations.
- `apps/backend/services/taskboard/application` owns process-local orchestration.
- `packages/contracts` owns wire shapes only; it imports no framework.
- `packages/taskboard-core` owns pure state transitions and has no I/O.

An adapter may translate a boundary. It must not quietly move business policy
into the framework layer.

## Request truth

The browser treats JSON as untrusted until a type guard accepts it. A successful
toggle response is confirmed. A failed toggle response is potentially
committed because the service may have applied the write before the browser
lost the response. The UI shows **Response needs reconciliation** and reloads
the service instead of inventing a result.

Mutations are serialized in the starter. This is a deliberate small-system
policy: it removes a race that would otherwise let an older full-snapshot
response overwrite a newer action. A production application may choose a
different concurrency model, but it must state and test that model.

## TSDoc

Every exported interface, class, function, and value that crosses a package or
framework boundary receives TSDoc. Public documentation should state:

- what the symbol owns;
- its parameters and return value;
- invariants or side effects;
- failure and uncertainty semantics;
- what the symbol does not prove.

TSDoc explains intent. TypeScript, Encore validation, tests, and browser proof
remain the evidence.

## Verification

The minimum proof route is:

```text
format → types → Encore graph → lint → unit tests → Encore tests → build
```

The browser route adds composed loading, keyboard interaction, unavailable
service, concurrent-write prevention, and uncertain-mutation recovery. A green
cache hit or wrapper does not replace the leaf command that proves the claim.

## Agent editing rule

Before editing, an agent reads `docs/README.md`, `docs/project-map.md`,
`docs/plans/active.md`, and `docs/checks/latest.md`. The task brief names the
allowed files, acceptance cases, checks, and rollback. An agent may propose a
new dependency or boundary, but it must stop for owner review before adding it.
