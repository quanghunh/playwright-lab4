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
  await page.getByText('Medicaid', { exact: true }).click();
 
  // Fill date - click first then fill (date picker)
  // Website uses dd/mm/yyyy format (e.g., 30/12/2025 = Dec 30, 2025)
  const dateInput = page.locator('#txt_visit_date');
  await dateInput.click();
  await dateInput.fill('30/12/2025');
  await page.keyboard.press('Enter'); // Close date picker

  // Fill comment
  await page.fill('#txt_comment',
    'Test appointment via Playwright');
 
  // Submit
  await page.getByRole('button',
    { name: 'Book Appointment' }).click();
 
  // Verify confirmation - wait for URL change first
  await page.waitForURL(/appointment/, { timeout: 10000 });
  await expect(
    page.getByText('Appointment Confirmation')
  ).toBeVisible();
});
