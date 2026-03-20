import { defineConfig, devices } from '@playwright/test';
 
export default defineConfig({
  // Thư mục chứa test
  testDir: './tests',
 
  // Chạy tất cả test trong 1 file song song
  fullyParallel: true,
 
  // Fail build trên CI nếu có test.only
  forbidOnly: !!process.env.CI,
 
  // Số lần retry khi test fail
  retries: process.env.CI ? 2 : 0,
 
  // Số worker chạy song song
  workers: process.env.CI ? 1 : undefined,
 
  // Reporter: HTML report + console output
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
 
  // Cấu hình chung cho mọi test
  use: {
    // Base URL cho tất cả navigation
    baseURL: 'https://katalon-demo-cura.herokuapp.com',
 
    // Bật Trace cho lần chạy đầu tiên khi retry
    trace: 'on-first-retry',
 
    // Chụp screenshot khi test fail
    screenshot: 'only-on-failure',
 
    // Quay video cho mọi test
    video: 'retain-on-failure',
  },
 
  // ====================================
  // CẤU HÌNH NHIỀU TRÌNH DUYỆT
  // ====================================
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
 
    // Test trên mobile viewport
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
});
