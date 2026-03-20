import { test, expect } from '@playwright/test';
 
test('Locator practice - Make appointment', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com');
 
  // getByRole: tìm button theo role và tên
  await page.getByRole('link', { name: 'Make Appointment' })
    .click();
 
  // getByLabel: tìm input theo label
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Password')
    .fill('ThisIsNotAPassword');
 
  // getByRole: tìm button Login
  await page.getByRole('button', { name: 'Login' }).click();
 
  // Assertions
  await expect(page).toHaveURL(/appointment/);
  await expect(
    page.getByRole('heading', { name: 'Make Appointment' })
  ).toBeVisible();
 
  // getByRole: chọn dropdown
  await page.getByRole('combobox').selectOption(
    'Hongkong CURA Healthcare Center'
  );
 
  // getByText: click checkbox/radio
  await page.getByText('Medicaid').click();
 
  // Fill date và comment
  await page.fill('#txt_visit_date', '01/03/2025');
  await page.fill('#txt_comment',
    'Test appointment via Playwright');
 
  // Submit
  await page.getByRole('button',
    { name: 'Book Appointment' }).click();
 
  // Verify confirmation
  await expect(
    page.getByText('Appointment Confirmation')
  ).toBeVisible();
});
