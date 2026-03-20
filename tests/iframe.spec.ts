import { test, expect } from '@playwright/test';
 
test.describe('Iframe Tests', () => {
 
  test('should interact with content inside iframe',
    async ({ page }) => {
    // Tạo trang có iframe
    await page.setContent(`
      <html><body>
        <h1>Trang chính</h1>
        <p id="main-status">Chưa nhận dữ liệu</p>
        <iframe id="child-frame" srcdoc="
          <html><body>
            <h2>Iframe Content</h2>
            <input id='iframe-input' type='text'
              placeholder='Nhập dữ liệu' />
            <button id='iframe-btn'
              onclick='document.getElementById(
                &quot;iframe-result&quot;).textContent
                = document.getElementById(
                &quot;iframe-input&quot;).value'>
              Xác nhận</button>
            <p id='iframe-result'></p>
          </body></html>
        " width="400" height="300"></iframe>
      </body></html>
    `);
 
    // 1. Tương tác với trang chính
    await expect(page.locator('#main-status'))
      .toHaveText('Chưa nhận dữ liệu');
 
    // 2. Tương tác với nội dung trong iframe
    const frame = page.frameLocator('#child-frame');
 
    // Điền dữ liệu vào input trong iframe
    await frame.locator('#iframe-input')
      .fill('Hello from Playwright');
 
    // Click button trong iframe
    await frame.locator('#iframe-btn').click();
 
    // Xác minh kết quả trong iframe
    await expect(frame.locator('#iframe-result'))
      .toHaveText('Hello from Playwright');
  });
 
  test('should handle nested iframes',
    async ({ page }) => {
    await page.setContent(`
      <html><body>
        <iframe id="outer" srcdoc="
          <html><body>
            <h2>Outer Iframe</h2>
            <iframe id='inner' srcdoc='
              <html><body>
                <p id=&quot;deep-text&quot;>
                  Deep nested content</p>
                <button id=&quot;deep-btn&quot;>
                  Click me</button>
              </body></html>
            ' width='300' height='200'></iframe>
          </body></html>
        " width="500" height="400"></iframe>
      </body></html>
    `);
 
    // Truy cập nested iframe: outer -> inner
    const outer = page.frameLocator('#outer');
    const inner = outer.frameLocator('#inner');
 
    // Tương tác với phần tử trong nested iframe
    await expect(inner.locator('#deep-text'))
      .toHaveText('Deep nested content');
    await inner.locator('#deep-btn').click();
  });
});
