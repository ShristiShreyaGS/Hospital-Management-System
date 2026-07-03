import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

Given('I am on the login page', async ({ page }) => {
  await page.goto('/login');
});

When('I enter email {string} and password {string}', async ({ page }, email, password) => {
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
});

When('I click Sign In', async ({ page }) => {
  await page.click('button[type="submit"]');
});

Then('I should be on the dashboard', async ({ page }) => {
  await page.waitForURL('**/dashboard', { timeout: 5000 });
  await expect(page).toHaveURL(/dashboard/);
});

Then('I should see an error message', async ({ page }) => {
  const errorDiv = page.locator('.login-error');
  await expect(errorDiv).toBeVisible();
});