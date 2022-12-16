import { expect, test } from '@playwright/test'

/** replace with env vars if needed */
const LOCAL_HOST_URL = 'http://localhost:8888/'

test('should shown home page', async ({ page }) => {
  await page.goto(LOCAL_HOST_URL)
  await expect(page.getByRole('button', { name: 'Toggle Theme' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'English' })).toBeVisible()
  await expect(page.locator('header > nav > div > a > h1')).toContainText(
    'Debt Book'
  )
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
})

test('click login should redirect to login page', async ({ page }) => {
  await page.goto(LOCAL_HOST_URL)

  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page.locator('form > div > button')).toBeVisible()
})
