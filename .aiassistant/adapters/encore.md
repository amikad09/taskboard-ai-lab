# Encore route

Service registration: apps/backend/services/taskboard/encore.service.ts.
Typed endpoints: that service's api/ directory.
Domain transitions: packages/taskboard-core.
Runtime: root pnpm dev:backend builds dependencies before encore run.
Checks: pnpm check:encore and pnpm test:encore.

The dashboard makes service/API/trace observations available. Inspect fictional payloads only; traces can contain request data. Deployment and credentials remain outside this local workshop.
