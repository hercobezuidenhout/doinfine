import { test, expect } from '@playwright/test';

test('renders sign-in when user is not logged in', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page).toHaveURL(/.*sign-in/);
});