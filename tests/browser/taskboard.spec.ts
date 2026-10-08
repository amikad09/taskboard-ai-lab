import { expect, test } from "@playwright/test";

test("loads, toggles with a keyboard, and reports the changed state", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Taskboard" })).toBeVisible();

  const brief = page.getByRole("button", {
    name: /Write a bounded feature brief/,
  });
  await expect(brief).toHaveAttribute("aria-pressed", "false");
  await brief.focus();
  await page.keyboard.press("Enter");
  await expect(brief).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status").filter({ hasText: "Task updated" })).toBeVisible();
});

test("keeps the error state honest when the service is unavailable", async ({ page }) => {
  await page.route("**/tasks", (route) => route.abort());
  await page.goto("/");
  await expect(page.getByRole("alert")).toContainText("Could not load");
});

test("does not allow concurrent writes and exposes an uncertain mutation", async ({ page }) => {
  let release!: () => void;
  const held = new Promise<void>((resolve) => {
    release = resolve;
  });

  await page.route("**/tasks/brief/toggle", async (route) => {
    await held;
    await route.abort();
  });
  await page.goto("/");

  const brief = page.getByRole("button", {
    name: /Write a bounded feature brief/,
  });
  const context = page.getByRole("button", {
    name: /Choose focused project context/,
  });
  await brief.click();
  await expect(context).toBeDisabled();

  release();
  await expect(page.getByRole("alert")).toContainText("could not confirm");
  await expect(page.getByRole("button", { name: "Reload" }).last()).toBeEnabled();
});
