# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\features\login.feature.spec.js >> User Login >> Login fails with wrong password
- Location: .features-gen\tests\features\login.feature.spec.js:13:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/login
Call log:
  - navigating to "http://localhost:5173/login", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - strong [ref=e9]: localhost
      - text: refused to connect.
    - generic [ref=e10]:
      - paragraph [ref=e11]: "Try:"
      - list [ref=e12]:
        - listitem [ref=e13]: Checking the connection
        - listitem [ref=e14]:
          - link "Checking the proxy and the firewall" [ref=e15] [cursor=pointer]:
            - /url: "#buttons"
    - generic [ref=e16]: ERR_CONNECTION_REFUSED
  - generic [ref=e17]:
    - button "Reload" [ref=e19] [cursor=pointer]
    - button "Details" [ref=e20] [cursor=pointer]
```

# Test source

```ts
  1  | import { createBdd } from 'playwright-bdd';
  2  | import { expect } from '@playwright/test';
  3  | 
  4  | const { Given, When, Then } = createBdd();
  5  | 
  6  | Given('I am on the login page', async ({ page }) => {
> 7  |   await page.goto('/login');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/login
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
  20 |   await page.waitForURL('**/dashboard', { timeout: 5000 });
  21 |   await expect(page).toHaveURL(/dashboard/);
  22 | });
  23 | 
  24 | Then('I should see an error message', async ({ page }) => {
  25 |   const errorDiv = page.locator('.login-error');
  26 |   await expect(errorDiv).toBeVisible();
  27 | });
```