// Uses an existing Playwright install; all API traffic is fulfilled in this isolated browser.
const { chromium } = require(process.argv[2] || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.argv[3] || 'http://127.0.0.1:5173';
const output = path.resolve(__dirname, '../../../docs/student-qa');
fs.mkdirSync(output, { recursive: true });
const user = { id: 71, username: 'student-test', email: 'student@example.test', fullName: 'Sinh Viên Kiểm Thử', roles: ['STUDENT'] };
const posts = [1, 2, 3, 4].map((id) => ({ id, content: `Câu chuyện sinh viên số ${id}. Cùng chia sẻ cách sắp xếp thời gian học tập và kết nối với bạn bè.`, isAnonymous: id === 4, authorUser: { fullName: 'Tên phải ẩn khi ẩn danh' }, category: { name: 'Học tập' }, createdAt: `2026-09-${20 + id}T08:00:00Z`, shareCount: 0, _count: { binhLuans: id, luotThiches: id * 2 } }));
const results = [];
const traffic = [];
const mark = (name, detail = {}) => { results.push({ name, pass: true, ...detail }); console.log(`PASS: ${name}`); };

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const context = await browser.newContext({ timezoneId: 'Asia/Ho_Chi_Minh' });
    const page = await context.newPage();
    let currentUser = user;
    let mode = 'normal';
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.route('**/api/**', async (route) => {
      const request = route.request();
      const endpoint = new URL(request.url()).pathname.replace('/api', '');
      traffic.push({ method: request.method(), endpoint });
      const json = (body, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
      if (endpoint === '/auth/refresh') return currentUser ? json({ accessToken: 'ui-test-only', user: currentUser }) : json({}, 401);
      if (endpoint === '/auth/logout') { currentUser = null; return json({}); }
      if (endpoint === '/forum/posts') {
        if (mode === 'loading') await new Promise((resolve) => setTimeout(resolve, 1500));
        return mode === 'error' ? json({}, 503) : json(mode === 'empty' ? [] : posts);
      }
      if (endpoint === '/forum/posts/4') return json({ ...posts[3], reactions: { LIKE: 0, LOVE: 0, HAHA: 0, SAD: 0, ANGRY: 0 }, myReaction: null, binhLuans: [] });
      return json([], 200);
    });
    const goto = async (route) => { await page.goto(base + route); await page.locator('h1').waitFor(); };
    const noOverflow = async () => {
      const size = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
      assert(size.document <= size.viewport + 1, JSON.stringify(size));
      return size;
    };
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ['/', '/schedule', '/services', '/requests', '/faq', '/support', '/tuition', '/dorm', '/announcements', '/forum']) {
        await goto(route);
        await noOverflow();
      }
      await goto('/');
      await page.locator('.student-post').first().waitFor();
      const presentation = await page.evaluate(() => ({
        padding: parseFloat(getComputedStyle(document.querySelector('.student-main')).paddingLeft),
        titleSize: parseFloat(getComputedStyle(document.querySelector('h1')).fontSize),
        radius: parseFloat(getComputedStyle(document.querySelector('.student-service')).borderRadius),
      }));
      assert(presentation.padding >= 16 && presentation.titleSize >= 25 && presentation.radius >= 16, `Styles overridden: ${JSON.stringify(presentation)}`);
      assert.equal(await page.locator('.student-service').count(), 18);
      assert.equal(await page.locator('.schedule-day').count(), 7);
      assert.equal(await page.locator('.schedule-today').count(), 1);
      assert.equal(await page.locator('.student-post').count(), 3);
      assert.equal(await page.locator('.student-post').first().getAttribute('href'), '/forum/4');
      assert((await page.locator('.student-post').first().textContent()).includes('Ẩn danh'));
      assert(!(await page.locator('.student-post').first().textContent()).includes('Tên phải ẩn'));
      await page.screenshot({ path: path.join(output, `home-${width}.png`), fullPage: true });
      mark(`Responsive ${width}px: 10 routes, 18 services, 7 days, 3 newest posts`);
      if (width < 1024) {
        const opener = page.getByRole('button', { name: 'Mở menu', exact: true });
        await opener.click();
        const drawer = page.getByRole('dialog', { name: 'Cổng sinh viên' });
        await drawer.waitFor();
        await noOverflow();
        if (width === 360) await page.screenshot({ path: path.join(output, 'drawer-360.png') });
        await page.keyboard.press('Escape');
        assert(await opener.evaluate((el) => el === document.activeElement));
        await opener.click();
        await drawer.getByRole('link', { name: 'Hỏi đáp / FAQ' }).click();
        await page.waitForURL('**/faq');
        assert.equal(await page.locator('dialog[open]').count(), 0);
        mark(`Drawer ${width}px: navigation, Escape, focus return`);
      }
    }
    await page.setViewportSize({ width: 1280, height: 900 });
    await goto('/');
    const search = page.getByRole('textbox', { name: 'Bạn cần tìm dịch vụ gì?' });
    await search.fill('bao hiem');
    await page.locator('[data-search-result]').filter({ hasText: 'Bảo hiểm y tế' }).click();
    await page.getByRole('dialog', { name: 'Bảo hiểm y tế' }).waitFor();
    await page.keyboard.press('Escape');
    await search.fill('hoan thi');
    await page.locator('[data-search-result]').filter({ hasText: 'Xin hoãn thi vì lý do sức khỏe' }).click();
    await page.waitForURL('**/faq#faq-exam');
    assert(await page.locator('#faq-exam').evaluate((el) => el.open));
    mark('Accent-insensitive search and FAQ deep link');
    await goto('/');
    await search.fill('zzzzzzzz');
    assert(await page.getByRole('status').filter({ hasText: 'Chưa tìm thấy' }).isVisible());
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.student-search-results').count(), 0);
    mark('Search empty state and Escape');
    const serviceNames = await page.locator('.student-service').allTextContents();
    for (let index = 0; index < serviceNames.length; index++) {
      await goto('/');
      await page.locator('.student-service').nth(index).click();
      await page.waitForFunction(() => location.pathname !== '/' || !!document.querySelector('dialog[open]'));
      if (await page.locator('dialog[open]').count()) {
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('dialog[open]').count(), 0);
      }
    }
    mark('All 18 service actions open a working destination or dialog');
    await goto('/');
    await page.getByRole('button', { name: 'Giấy xác nhận', exact: true }).click();
    let dialog = page.getByRole('dialog', { name: 'Gửi yêu cầu hỗ trợ' });
    await dialog.getByRole('button', { name: 'Lưu yêu cầu mẫu' }).click();
    assert(await dialog.getByText('Nhập mã sinh viên từ 3 ký tự.').isVisible());
    assert(await dialog.getByText('Mô tả lý do ít nhất 10 ký tự.').isVisible());
    await dialog.getByLabel('Mã sinh viên', { exact: true }).fill('TEST243880');
    await dialog.getByLabel('Lý do yêu cầu').fill('Yêu cầu mẫu dùng để kiểm tra giao diện và lưu trữ.');
    await dialog.getByLabel('Ghi chú').fill('Nội dung kiểm tra.');
    await dialog.getByRole('button', { name: 'Lưu yêu cầu mẫu' }).click();
    dialog = page.getByRole('dialog', { name: 'Đã lưu yêu cầu mẫu' });
    await dialog.waitFor();
    const id = (await dialog.textContent()).match(/YC-\d{4}-[A-F0-9]{8}/)[0];
    await dialog.getByRole('button', { name: 'Theo dõi yêu cầu của tôi' }).click();
    await page.waitForURL('**/requests');
    assert(await page.getByText(id, { exact: false }).isVisible());
    await page.reload();
    await page.getByRole('button', { name: `Xem hồ sơ ${id}`, exact: true }).waitFor();
    mark('Submit validation, defaults, success ID and reload persistence');
    await page.getByLabel('Lọc trạng thái hồ sơ').selectOption('READY');
    assert(await page.getByText('Không có hồ sơ phù hợp').isVisible());
    await page.getByLabel('Lọc trạng thái hồ sơ').selectOption('ALL');
    await page.getByLabel('Tìm mã hoặc loại hồ sơ').fill(id);
    await page.getByRole('button', { name: `Xem hồ sơ ${id}`, exact: true }).click();
    dialog = page.getByRole('dialog', { name: 'Chi tiết yêu cầu mẫu' });
    await dialog.getByRole('button', { name: 'Mô phỏng: tiếp nhận hồ sơ' }).click();
    await dialog.getByRole('button', { name: 'Mô phỏng: hoàn tất xử lý' }).click();
    assert(await dialog.getByText('Hồ sơ mẫu đã hoàn tất.', { exact: false }).isVisible());
    await page.keyboard.press('Escape');
    assert(await page.getByRole('link', { name: '1 hồ sơ mẫu sẵn sàng nhận' }).isVisible());
    mark('Request search/filter and simulated progress with notification badge');
    await page.setViewportSize({ width: 360, height: 900 });
    await page.getByRole('button', { name: 'Gửi yêu cầu mới' }).click();
    dialog = page.getByRole('dialog', { name: 'Gửi yêu cầu hỗ trợ' });
    await noOverflow();
    await dialog.getByLabel('Loại thủ tục').selectOption('Hoãn thi');
    await dialog.getByLabel('Mã sinh viên', { exact: true }).fill('TEST243880');
    await dialog.getByLabel('Lý do yêu cầu').fill('Kiểm tra chức năng hủy hồ sơ mẫu.');
    await dialog.getByRole('button', { name: 'Lưu yêu cầu mẫu' }).focus();
    await page.keyboard.press('Tab');
    assert(await dialog.getByRole('button', { name: 'Đóng menu' }).evaluate((el) => el === document.activeElement));
    await page.screenshot({ path: path.join(output, 'request-modal-360.png') });
    await dialog.getByRole('button', { name: 'Lưu yêu cầu mẫu' }).click();
    await page.getByRole('button', { name: 'Theo dõi yêu cầu của tôi' }).click();
    await page.getByLabel('Tìm mã hoặc loại hồ sơ').fill('');
    await page.getByRole('button', { name: /^Xem hồ sơ YC-/ }).first().click();
    dialog = page.getByRole('dialog', { name: 'Chi tiết yêu cầu mẫu' });
    await dialog.getByRole('button', { name: 'Hủy yêu cầu', exact: true }).click();
    await dialog.getByRole('button', { name: 'Giữ yêu cầu' }).click();
    await dialog.getByRole('button', { name: 'Hủy yêu cầu', exact: true }).click();
    await dialog.getByRole('button', { name: 'Xác nhận hủy' }).click();
    await page.keyboard.press('Escape');
    await page.getByLabel('Lọc trạng thái hồ sơ').selectOption('CANCELLED');
    assert.equal(await page.getByRole('button', { name: /^Xem hồ sơ YC-/ }).count(), 1);
    mark('Mobile form, focus trap, cancel confirmation and retained cancelled record');
    currentUser = { ...user, id: 72 };
    await page.reload();
    await page.getByText('Bạn chưa có yêu cầu nào').waitFor();
    currentUser = null;
    await page.reload();
    await page.getByText('Bạn chưa có yêu cầu nào').waitFor();
    assert.equal(await page.getByRole('link', { name: 'Quản trị', exact: true }).count(), 0);
    mark('Account and guest isolation; no admin navigation for student/guest');
    currentUser = { ...user, roles: ['ADMIN'] };
    await page.setViewportSize({ width: 1280, height: 900 });
    await goto('/');
    assert(await page.getByRole('link', { name: 'Quản trị', exact: true }).isVisible());
    await page.getByLabel('Thông tin tài khoản').click();
    await page.getByRole('button', { name: 'Hồ sơ sinh viên', exact: true }).click();
    await page.getByRole('dialog', { name: 'Hồ sơ sinh viên' }).waitFor();
    await page.keyboard.press('Escape');
    mark('Admin navigation and account profile modal');
    await goto('/forum/4');
    await noOverflow();
    await goto('/forum/new');
    await noOverflow();
    currentUser = null;
    await goto('/forum/new');
    await page.waitForURL('**/login');
    await goto('/admin');
    await page.waitForURL('**/login');
    currentUser = user;
    await goto('/admin');
    await page.waitForURL(base + '/');
    mark('Forum detail/create routes and existing guest/student route guards preserved');
    mode = 'empty';
    await goto('/');
    await page.getByText('Chưa có bài viết.', { exact: false }).waitFor();
    mode = 'error';
    await goto('/');
    await page.getByText('Chưa thể tải dữ liệu.').waitFor();
    mode = 'normal';
    await page.getByRole('button', { name: 'Thử lại', exact: true }).click();
    await page.locator('.student-post').first().waitFor();
    mode = 'loading';
    await goto('/');
    assert(await page.locator('.skeleton').first().isVisible());
    await page.locator('.student-post').first().waitFor();
    mode = 'normal';
    mark('Confession loading, empty, error and retry states');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('.student-service').first().hover();
    assert.equal(await page.locator('.student-service').first().evaluate((el) => getComputedStyle(el).transform), 'none');
    await page.setViewportSize({ width: 640, height: 450 });
    await noOverflow();
    mark('Reduced motion and 200% equivalent reflow (1280 to 640 CSS px)');
    await goto('/support');
    await page.getByRole('button', { name: 'Gửi yêu cầu hỗ trợ', exact: true }).click();
    dialog = page.getByRole('dialog', { name: 'Gửi yêu cầu hỗ trợ' });
    await dialog.getByLabel('Mã sinh viên', { exact: true }).fill('TEST243880');
    await dialog.getByLabel('Lý do yêu cầu').fill('Kiểm tra khi trình duyệt không cho lưu trữ.');
    await page.evaluate(() => { window.__originalSetItem = Storage.prototype.setItem; Storage.prototype.setItem = () => { throw new DOMException('Test quota', 'QuotaExceededError'); }; });
    await dialog.getByRole('button', { name: 'Lưu yêu cầu mẫu' }).click();
    await dialog.getByRole('alert').filter({ hasText: 'Không thể lưu hồ sơ' }).waitFor();
    assert.equal(await dialog.getByLabel('Mã sinh viên', { exact: true }).inputValue(), 'TEST243880');
    await page.evaluate(() => { Storage.prototype.setItem = window.__originalSetItem; });
    await page.keyboard.press('Escape');
    mark('Storage failure is actionable and preserves the entered form');
    await page.evaluate(() => localStorage.setItem('htsv-student-requests-v1', '{broken'));
    await goto('/requests');
    await page.getByRole('alert').filter({ hasText: 'Không đọc được hồ sơ đã lưu' }).waitFor();
    assert.equal(await page.evaluate(() => localStorage.getItem('htsv-student-requests-v1')), '{broken');
    mark('Corrupt local storage is reported and preserved');
    assert.equal(errors.length, 0, errors.join('\n'));
    assert(traffic.every((r) => ['/auth/refresh', '/auth/logout', '/forum/posts', '/forum/posts/4'].includes(r.endpoint)));
    mark('No page errors; no support API or backend mutations');
    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ date: new Date().toISOString(), results, errors, traffic, api: 'Playwright fixtures only; live backend not verified' }, null, 2));
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
