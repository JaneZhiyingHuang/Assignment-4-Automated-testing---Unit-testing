import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

// test 3 4 5
test.describe('Dog App E2E Tests', () => {
  test('Test 3. Create positive E2E test with Playwright', async ({ page }) => {
    const responsePromise = page.waitForResponse('**/api/dogs/random');
    await page.goto(BASE_URL);
    await responsePromise;

    const image = page.locator('img.dog-image');
    await expect(image).toHaveAttribute('src', /^https:\/\//);
  });

  test('Test 4. Create another positive E2E test with Playwright', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForResponse('**/api/dogs/random');

    const responsePromise = page.waitForResponse('**/api/dogs/random');
    await page.getByRole('button', { name: 'Get Another Dog' }).click();
    await responsePromise;

    const image = page.locator('img.dog-image');
    await expect(image).toHaveAttribute('src', /^https:\/\//);
  });

  test('Test 5. Create negative E2E test with Playwright', async ({ page }) => {
    await page.route('**/api/dogs/random', async (route) => {
      await route.abort();
    });

    await page.goto(BASE_URL);

    const errorElement = page.locator('.error').filter({ hasText: /error/i });
    await expect(errorElement).toBeVisible();
  });
});