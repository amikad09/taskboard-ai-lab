import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "operations/playwright.json" }]],
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "retain-on-failure",
    ...devices["Desktop Chrome"],
  },
  webServer: [
    {
      command: "encore run",
      cwd: "apps/backend",
      url: "http://127.0.0.1:4000/tasks",
      reuseExistingServer: false,
      timeout: 120_000,
    },
    {
      command: "pnpm --dir apps/web dev",
      url: "http://127.0.0.1:5173",
      reuseExistingServer: false,
      timeout: 120_000,
    },
  ],
});
