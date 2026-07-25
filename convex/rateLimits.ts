import { RateLimiter, HOUR } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";

/**
 * Limits are deliberately generous — they exist to blunt bots and runaway
 * retries, not to turn away real applicants during a launch push.
 */
export const rateLimiter = new RateLimiter(components.rateLimiter, {
  // A single person re-submitting the form.
  registrationPerEmail: { kind: "token bucket", rate: 5, period: HOUR },
  // Whole-site ceiling, so a scripted flood can't fill the table.
  registrationGlobal: { kind: "fixed window", rate: 200, period: HOUR },

  // Magic-link requests: stops an allowlisted admin being email-bombed.
  adminLinkPerEmail: { kind: "token bucket", rate: 5, period: HOUR, capacity: 2 },
  adminLinkGlobal: { kind: "fixed window", rate: 50, period: HOUR },
});
