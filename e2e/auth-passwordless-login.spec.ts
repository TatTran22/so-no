import { expect, test } from '@playwright/test'

const LOCAL_HOST_URL = 'http://localhost:8888/'

test('test', async ({ page }) => {
  await page.goto(LOCAL_HOST_URL)
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(
    page
      .getByRole('tabpanel', { name: 'Passwordless' })
      .getByRole('button', { name: 'Login' })
  ).toBeVisible()

  await page.getByRole('tab', { name: 'Email and Password' }).click()
  await expect(
    page
      .getByRole('tabpanel', { name: 'Email and Password' })
      .getByRole('button', { name: 'Login' })
  ).toBeVisible()
  // await page.getByText('Đã gửi thành công').click()
})
