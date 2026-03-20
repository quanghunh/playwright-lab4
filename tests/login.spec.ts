import { test, expect } from '@playwright/test';
 
test.describe('CURA Healthcare - Login Tests', () => {
 
  // Chạy trước mỗi test: điều hướng đến trang
  test.beforeEach(async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com');
  });
 
  test('should login successfully with valid credentials',
    async ({ page }) => {
    // Click Make Appointment
    await page.click('#btn-make-appointment');
 
    // Điền thông tin đăng nhập
    await page.fill('#txt-username', 'John Doe');
    await page.fill('#txt-password', 'ThisIsNotAPassword');
    await page.click('#btn-login');
 
    // Xác minh chuyển đến trang đặt lịch
    await expect(page.locator('h2'))
      .toHaveText('Make Appointment');
  });
 
  test('should show error with invalid credentials',
    async ({ page }) => {
    await page.click('#btn-make-appointment');
    await page.fill('#txt-username', 'invalid');
    await page.fill('#txt-password', 'wrong');
    await page.click('#btn-login');
 
    // Xác minh thông báo lỗi
    await expect(page.locator('.text-danger'))
      .toBeVisible();
  });
});
