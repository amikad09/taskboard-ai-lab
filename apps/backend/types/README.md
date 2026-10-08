# Encore type boundary

The backend TypeScript project resolves `encore.dev/api` and
`encore.dev/service` to the declaration files shipped in the installed Encore
SDK:

```text
node_modules/encore.dev/dist/api/mod.d.ts
node_modules/encore.dev/dist/service/mod.d.ts
```

The package's type export points at its implementation `.ts` files. With the
current strict TypeScript release, compiling those implementation files also
checks upstream runtime internals and produces findings outside the starter's
source. The declaration output is the SDK's public type surface and keeps the
application compiler focused on learner code.

`encore check` remains authoritative for Encore's application graph, endpoint
registration, and runtime compilation. This alias is a resolution boundary,
not a replacement for Encore validation. If a future SDK changes its shipped
declaration layout, update this path and re-run the clean-install proof before
recording a lesson.
