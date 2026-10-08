/**
 * Encore service declaration for the fictional Taskboard feature.
 *
 * @remarks
 * Service registration is the only responsibility here. Endpoint transport
 * belongs in `api/`; application orchestration belongs in `application/`; and
 * state policy belongs in `@taskboard/core`.
 */

import { Service } from "encore.dev/service";

export default new Service("taskboard");
