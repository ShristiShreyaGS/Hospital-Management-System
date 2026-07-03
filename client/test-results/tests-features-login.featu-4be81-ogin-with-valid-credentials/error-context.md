# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\features\login.feature.spec.js >> User Login >> Successful login with valid credentials
- Location: .features-gen\tests\features\login.feature.spec.js:6:3

# Error details

```
TimeoutError: page.waitForURL: Timeout 5000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/dashboard" until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: 🏥
      - generic [ref=e7]: HMS
    - heading "Welcome back" [level=2] [ref=e8]
    - paragraph [ref=e9]: Sign in to your hospital account
    - generic [ref=e10]: Invalid password
    - generic [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e13]: Email Address
        - textbox "you@hospital.com" [ref=e14]: admin@hms.com
      - generic [ref=e15]:
        - generic [ref=e16]: Password
        - textbox "••••••••" [ref=e17]: admin123
      - button "Sign In" [ref=e18] [cursor=pointer]
    - paragraph [ref=e19]:
      - text: New patient?
      - link "Register here" [ref=e20] [cursor=pointer]:
        - /url: /register
  - generic [ref=e22]:
    - heading "Hospital Management System" [level=3] [ref=e23]
    - paragraph [ref=e24]: A unified platform for managing patients, doctors, appointments, pharmacy, lab reports, and billing — all in one place.
```

# Test source

```ts
  1  | import { createBdd } from 'playwright-bdd';
  2  | import { expect } from '@playwright/test';
  3  | 
  4  | const { Given, When, Then } = createBdd();
  5  | 
  6  | Given('I am on the login page', async ({ page }) => {
  7  |   await page.goto('/login');
  8  | });
  9  | 
  10 | When('I enter email {string} and password {string}', async ({ page }, email, password) => {
  11 |   await page.fill('input[name="email"]', email);
  12 |   await page.fill('input[name="password"]', password);
  13 | });
  14 | 
  15 | When('I click Sign In', async ({ page }) => {
  16 |   await page.click('button[type="submit"]');
  17 | });
  18 | 
  19 | Then('I should be on the dashboard', async ({ page }) => {
> 20 |   await page.waitForURL('**/dashboard', { timeout: 5000 });
     |              ^ TimeoutError: page.waitForURL: Timeout 5000ms exceeded.
  21 |   await expect(page).toHaveURL(/dashboard/);
  22 | });
  23 | 
  24 | Then('I should see an error message', async ({ page }) => {
  25 |   const errorDiv = page.locator('.login-error');
  26 |   await expect(errorDiv).toBeVisible();
  27 | });
```