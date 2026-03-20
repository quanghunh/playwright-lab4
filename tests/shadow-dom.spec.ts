import { test, expect } from '@playwright/test';
 
test.describe('Shadow DOM Tests', () => {
 
  test('should interact with elements inside Shadow DOM',
    async ({ page }) => {
    // Tạo trang HTML có Shadow DOM component
    await page.setContent(`
      <html><body>
        <h1>Shadow DOM Demo</h1>
        <my-component></my-component>
        <script>
          class MyComponent extends HTMLElement {
            constructor() {
              super();
              const shadow = this.attachShadow({mode:'open'});
              shadow.innerHTML = \`
                <style>
                  .shadow-btn { padding: 10px 20px;
                    background: #1abc9c; color: white;
                    border: none; cursor: pointer; }
                  .result { margin-top: 10px;
                    color: #2c3e50; }
                </style>
                <div class="shadow-container">
                  <h2>Inside Shadow DOM</h2>
                  <input type="text" id="shadow-input"
                    placeholder="Nhập tên của bạn" />
                  <button class="shadow-btn"
                    id="shadow-btn">Gửi</button>
                  <p class="result" id="result"></p>
                </div>
              \`;
              shadow.getElementById('shadow-btn')
                .addEventListener('click', () => {
                  const val = shadow
                    .getElementById('shadow-input').value;
                  shadow.getElementById('result')
                    .textContent = 'Xin chào, ' + val + '!';
                });
            }
          }
          customElements.define(
            'my-component', MyComponent);
        </script>
      </body></html>
    `);
 
    // Playwright tự động pierce vào Shadow DOM
    const input = page.locator('#shadow-input');
    await input.fill('Playwright');
 
    const btn = page.locator('#shadow-btn');
    await btn.click();
 
    // Xác minh kết quả bên trong Shadow DOM
    await expect(page.locator('#result'))
      .toHaveText('Xin chào, Playwright!');
  });
 
  test('should find shadow elements by role',
    async ({ page }) => {
    await page.setContent(`
      <html><body>
        <custom-form></custom-form>
        <script>
          class CustomForm extends HTMLElement {
            constructor() {
              super();
              const shadow = this.attachShadow({mode:'open'});
              shadow.innerHTML = \`
                <label for="email">Email</label>
                <input type="email" id="email"
                  placeholder="you@example.com" />
                <button type="submit">Đăng ký</button>
              \`;
            }
          }
          customElements.define(
            'custom-form', CustomForm);
        </script>
      </body></html>
    `);
 
    // Sử dụng getByLabel – pierce qua Shadow DOM
    await page.getByLabel('Email').fill('test@mail.com');
 
    // Sử dụng getByRole – pierce qua Shadow DOM
    await page.getByRole('button', { name: 'Đăng ký' })
      .click();
 
    // Xác minh giá trị input
    await expect(page.getByLabel('Email'))
      .toHaveValue('test@mail.com');
  });
});
