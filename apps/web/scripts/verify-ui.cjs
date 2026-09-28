// Run with an existing Playwright module: node scripts/verify-ui.cjs <module-path> [base-url]
// All /api traffic is fulfilled in the browser. This never contacts the backend.
const { chromium } = require(process.argv[2] || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.argv[3] || 'http://127.0.0.1:5173';
const output = path.resolve(__dirname, '../../../docs/frontend-qa');
fs.mkdirSync(output, { recursive: true });

const user = { id: 1, username: 'zuzong', email: 'zuzong@example.test', fullName: 'Dương Nhựt Thịnh — Tài khoản kiểm tra giao diện', roles: ['ADMIN', 'STUDENT'] };
const roles = [{ id: 1, code: 'ADMIN', name: 'Quản trị viên' }, { id: 2, code: 'STUDENT', name: 'Sinh viên' }];
const posts = [
  { id: 1, content: 'Có những ngày bài tập nhiều quá, mình chỉ muốn chậm lại một chút. Có ai cũng đang vừa học vừa làm không?\nCùng chia sẻ cách sắp xếp thời gian nhé.', isAnonymous: true, authorUser: null, category: { name: 'Chuyện sinh viên' }, createdAt: '2026-09-27T08:00:00Z', shareCount: 3, _count: { binhLuans: 1, luotThiches: 8 } },
  { id: 2, content: 'Một lời cảm ơn đến những người bạn đã cùng mình vượt qua kỳ thi vừa rồi. Chúc mọi người một học kỳ nhiều trải nghiệm!', isAnonymous: false, authorUser: { fullName: 'Nguyễn Minh Anh' }, category: { name: 'Góc sẻ chia' }, createdAt: '2026-09-26T09:00:00Z', shareCount: 1, _count: { binhLuans: 0, luotThiches: 12 } },
];
let comments = [{ id: 1, content: 'Mình cũng vậy. Cố gắng từng chút một nhé!', isAnonymous: false, authorUser: { fullName: 'Nguyễn Minh Anh' }, createdAt: '2026-09-27T09:00:00Z' }];
let detail = { ...posts[0], reactions: { LIKE: 5, LOVE: 3, HAHA: 0, SAD: 0, ANGRY: 0 }, myReaction: null, binhLuans: comments };
let users = [{ ...user, isActive: true, userRoles: [{ role: roles[1] }] }];
const requests = [];
const results = [];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    let loggedIn = true;
    let mode = 'normal';
    let postDelay = 0;
    await page.route('**/api/**', async (route) => {
      const req = route.request();
      const url = new URL(req.url()).pathname.replace(/^\/api/, '');
      const method = req.method();
      const body = req.postDataJSON();
      requests.push({ url, method, body });
      const json = (data, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(data) });
      if (url === '/auth/refresh') return loggedIn ? json({ accessToken: 'ui-fixture', user }) : json({ message: 'Chưa đăng nhập' }, 401);
      if (url === '/auth/login') { loggedIn = true; return json({ accessToken: 'ui-fixture', user }); }
      if (url === '/auth/logout') { loggedIn = false; return json({}); }
      if (url.startsWith('/auth/')) return mode === 'auth-error' ? json({ message: 'Không thể gửi mã. Vui lòng thử lại.' }, 503) : json({ message: 'Đã gửi mã xác thực.' });
      if (url === '/forum/posts' && method === 'GET') {
        if (postDelay) await new Promise((resolve) => setTimeout(resolve, postDelay));
        return mode === 'error' ? json({ message: 'Test error' }, 503) : json(mode === 'empty' ? [] : posts);
      }
      if (url === '/forum/posts' && method === 'POST') return json({ id: 3 });
      if (url === '/forum/posts/1') return json({ ...detail, binhLuans: comments });
      if (url === '/forum/posts/1/react') {
        detail.myReaction = body.type;
        detail.reactions[body.type] += 1;
        return json({ myReaction: detail.myReaction, reactions: detail.reactions });
      }
      if (url === '/forum/posts/1/share') { detail.shareCount += 1; return json({ shareCount: detail.shareCount }); }
      if (url === '/forum/posts/1/comments') { comments.push({ ...comments[0], id: comments.length + 1, content: body.content }); return json(comments.at(-1)); }
      if (url === '/admin/dashboard') return json({ postCount: 48, pendingPostCount: 6, commentCount: 127, openReportCount: 2, accountCount: 156 });
      if (url === '/admin/forum/posts') return json(posts.map((post) => ({ ...post, status: 'PENDING' })));
      if (url === '/admin/reports') return json([{ id: 1, reason: 'Nội dung cần được kiểm tra', status: 'OPEN', reporterUser: user, confession: { content: posts[0].content }, createdAt: posts[0].createdAt }]);
      if (url === '/admin/users' && method === 'GET') return json(users);
      if (url === '/admin/users/1' && method === 'PUT') {
        users = users.map((item) => ({ ...item, ...(body.roleIds ? { userRoles: roles.filter((role) => body.roleIds.includes(role.id)).map((role) => ({ role })) } : { isActive: body.isActive }) }));
        return json(users[0]);
      }
      if (url === '/admin/roles' && method === 'GET') return json(roles);
      if (url === '/admin/permissions' && method === 'GET') return json([{ id: 1, code: 'MANAGE_USERS', name: 'Quản lý người dùng', description: null }]);
      if (url.startsWith('/admin/') && method !== 'GET') return json({});
      throw new Error(`Unmocked request: ${method} ${url}`);
    });

    const routes = ['/forum', '/forum/1', '/forum/new', '/login', '/register', '/verify-otp?email=zuzong@example.test', '/forgot-password', '/reset-password?email=zuzong@example.test', '/admin', '/admin/forum', '/admin/reports', '/admin/users', '/admin/roles', '/admin/permissions'];
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        loggedIn = true;
        await page.goto(base + route);
        await page.locator('h1').waitFor();
        if (route.startsWith('/admin/') && ['/admin/users', '/admin/roles', '/admin/permissions'].includes(route)) await page.locator('tbody tr').first().waitFor();
        if (route === '/forum') await page.getByText('Bảng tin mới nhất').waitFor();
        await page.waitForTimeout(160);
        const layout = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, missingNames: [...document.querySelectorAll('input:not([type="hidden"]), textarea')].filter((el) => !el.labels?.length && !el.getAttribute('aria-label')).map((el) => el.outerHTML) }));
        assert(layout.document <= layout.viewport + 1, `Overflow ${width} ${route}: ${JSON.stringify(layout)}`);
        assert.equal(layout.missingNames.length, 0, `Unlabeled controls: ${route}`);
        results.push({ width, route, ...layout, pass: true });
        const capture = (width === 360 && ['/forum', '/login', '/admin/users', '/forum/1'].includes(route)) || (width === 768 && ['/forum', '/admin/users'].includes(route)) || (width === 1280 && ['/forum', '/admin', '/register'].includes(route));
        if (capture) await page.screenshot({ path: path.join(output, `${route.replaceAll('/', '-').slice(1)}-${width}.png`), fullPage: true });
      }
    }
    await page.setViewportSize({ width: 360, height: 900 });
    await page.goto(base + '/admin/users');
    const menu = page.getByRole('button', { name: 'Mở menu quản trị' });
    await menu.click();
    await page.getByRole('dialog').waitFor();
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(output, 'admin-menu-360.png'), fullPage: true });
    await page.keyboard.press('Shift+Tab');
    assert(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement)), 'Drawer traps focus');
    await page.keyboard.press('Escape');
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    assert(await menu.evaluate((el) => el === document.activeElement), 'Drawer restores focus');
    await menu.click();
    await page.getByRole('dialog').getByRole('link', { name: 'Vai trò', exact: true }).click();
    await page.waitForURL('**/admin/roles');
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    results.push({ check: 'Admin drawer, focus trap, Escape, focus restoration, navigation', pass: true });

    await page.goto(base + '/forum');
    await page.getByRole('button', { name: 'Mở menu', exact: true }).click();
    await page.getByRole('dialog').waitFor();
    await page.keyboard.press('Escape');
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    results.push({ check: 'Portal mobile menu', pass: true });

    loggedIn = false;
    await page.goto(base + '/login');
    await page.getByLabel('Tên đăng nhập', { exact: true }).fill('zuzong');
    await page.getByLabel('Mật khẩu', { exact: true }).fill('Test123!');
    await page.getByRole('button', { name: 'Hiện mật khẩu', exact: true }).click();
    assert.equal(await page.getByLabel('Mật khẩu', { exact: true }).getAttribute('type'), 'text');
    await page.getByRole('button', { name: 'Ẩn mật khẩu', exact: true }).click();
    await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
    await page.waitForURL('**/admin');
    assert.deepEqual(requests.findLast((r) => r.url === '/auth/login').body, { username: 'zuzong', password: 'Test123!' });
    results.push({ check: 'Password toggle, labeled form and existing login payload', pass: true });

    await page.goto(base + '/forum/new');
    await page.getByLabel('Bạn muốn chia sẻ điều gì?').fill('Bài kiểm tra giao diện');
    await page.getByLabel('Đăng ẩn danh', { exact: true }).check();
    await page.getByRole('button', { name: 'Gửi bài để duyệt' }).click();
    await page.waitForURL('**/forum');
    assert.deepEqual(requests.findLast((r) => r.url === '/forum/posts' && r.method === 'POST').body, { content: 'Bài kiểm tra giao diện', isAnonymous: true });
    await page.goto(base + '/forum/1');
    await page.getByRole('button', { name: 'Thích', exact: false }).first().click();
    await page.locator('button[aria-pressed="true"]').waitFor();
    assert.equal(requests.findLast((r) => r.url.endsWith('/react')).body.type, 'LIKE');
    await page.getByRole('button', { name: 'Chia sẻ', exact: true }).click();
    await page.getByRole('button', { name: 'Đã sao chép link!' }).waitFor();
    await page.getByLabel('Bình luận của bạn').fill('Cảm ơn bạn đã chia sẻ.');
    await page.getByRole('button', { name: 'Gửi bình luận' }).click();
    await page.getByText('Cảm ơn bạn đã chia sẻ.', { exact: true }).waitFor();
    results.push({ check: 'Anonymous post, reaction selection, clipboard and comment payloads', pass: true });

    mode = 'empty';
    await page.goto(base + '/forum');
    await page.getByRole('heading', { name: 'Câu chuyện đầu tiên đang chờ bạn' }).waitFor();
    mode = 'error';
    await page.goto(base + '/forum');
    await page.getByRole('alert').waitFor();
    mode = 'normal';
    await page.getByRole('button', { name: 'Thử lại' }).click();
    await page.getByRole('link', { name: 'Đọc bài của người dùng ẩn danh' }).waitFor();
    postDelay = 1200;
    await page.goto(base + '/forum');
    await page.getByRole('status', { name: 'Đang tải dữ liệu' }).waitFor();
    await page.getByRole('link', { name: 'Đọc bài của người dùng ẩn danh' }).waitFor();
    postDelay = 0;
    results.push({ check: 'Empty, error/retry and loading skeleton states', pass: true });

    loggedIn = false;
    mode = 'auth-error';
    await page.goto(base + '/forgot-password');
    await page.getByLabel('Email', { exact: true }).fill('zuzong@example.test');
    await page.getByRole('button', { name: 'Gửi mã', exact: true }).click();
    await page.getByRole('alert').waitFor();
    results.push({ check: 'Forgot-password error feedback', pass: true });
    mode = 'normal';
    await page.goto(base + '/register');
    await page.getByLabel('Tên đăng nhập', { exact: true }).fill('zuzong');
    await page.getByLabel('Email', { exact: true }).fill('zuzong@example.test');
    await page.getByLabel('Họ tên', { exact: true }).fill('Dương Nhựt Thịnh');
    await page.getByLabel('Mật khẩu', { exact: true }).fill('Test123!');
    await page.getByLabel('Xác nhận mật khẩu', { exact: true }).fill('Test123!');
    await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
    await page.waitForURL('**/verify-otp?**');
    assert.deepEqual(requests.findLast((r) => r.url === '/auth/register').body, { username: 'zuzong', email: 'zuzong@example.test', fullName: 'Dương Nhựt Thịnh', password: 'Test123!' });
    await page.getByRole('button', { name: 'Gửi lại mã OTP' }).click();
    await page.getByText('Đã gửi mã xác thực.', { exact: true }).waitFor();
    await page.getByLabel('Mã OTP', { exact: true }).fill('123456');
    await page.getByRole('button', { name: 'Xác thực', exact: true }).click();
    await page.waitForURL('**/login');
    assert.deepEqual(requests.findLast((r) => r.url === '/auth/verify-otp').body, { email: 'zuzong@example.test', code: '123456' });
    await page.goto(base + '/forgot-password');
    await page.getByLabel('Email', { exact: true }).fill('zuzong@example.test');
    await page.getByRole('button', { name: 'Gửi mã', exact: true }).click();
    await page.getByRole('button', { name: 'Tôi đã có mã, đặt lại mật khẩu' }).click();
    await page.waitForURL('**/reset-password?**');
    await page.getByLabel('Mã OTP', { exact: true }).fill('123456');
    await page.getByLabel('Mật khẩu mới', { exact: true }).fill('Test123!');
    await page.getByRole('button', { name: 'Đặt lại mật khẩu', exact: true }).click();
    await page.waitForURL('**/login');
    assert.deepEqual(requests.findLast((r) => r.url === '/auth/reset-password').body, { email: 'zuzong@example.test', code: '123456', newPassword: 'Test123!' });
    results.push({ check: 'Register, OTP, resend, forgot/reset-password existing payloads and redirects', pass: true });

    loggedIn = true;
    await page.goto(base + '/admin/roles');
    await page.getByLabel('Mã vai trò', { exact: true }).fill('EDITOR');
    await page.getByLabel('Tên vai trò', { exact: true }).fill('Biên tập viên');
    await page.getByRole('button', { name: 'Thêm', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('form input').value === '');
    assert.deepEqual(requests.findLast((r) => r.url === '/admin/roles' && r.method === 'POST').body, { code: 'EDITOR', name: 'Biên tập viên' });
    await page.goto(base + '/admin/permissions');
    await page.getByLabel('Mã quyền', { exact: true }).fill('REVIEW_POSTS');
    await page.getByLabel('Tên quyền', { exact: true }).fill('Duyệt bài');
    await page.getByRole('button', { name: 'Thêm', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('form input').value === '');
    assert.deepEqual(requests.findLast((r) => r.url === '/admin/permissions' && r.method === 'POST').body, { code: 'REVIEW_POSTS', name: 'Duyệt bài' });
    await page.goto(base + '/admin/users');
    await page.getByLabel(`ADMIN cho ${user.fullName}`, { exact: true }).click();
    await page.waitForFunction(() => document.querySelector('input[aria-label^="ADMIN cho"]').checked);
    assert.deepEqual(requests.findLast((r) => r.url === '/admin/users/1').body, { roleIds: [2, 1] });
    await page.getByLabel(`Kích hoạt ${user.fullName}`, { exact: true }).click();
    await page.waitForFunction(() => ![...document.querySelectorAll('input')].find((input) => input.labels?.[0]?.textContent.includes('Kích hoạt')).checked);
    assert.deepEqual(requests.findLast((r) => r.url === '/admin/users/1').body, { isActive: false });
    await page.goto(base + '/admin/forum');
    await page.getByRole('button', { name: 'Duyệt', exact: true }).first().click();
    await page.waitForTimeout(100);
    assert(requests.some((r) => r.url === '/admin/forum/posts/1/approve' && r.method === 'PUT'));
    await page.goto(base + '/admin/reports');
    await page.getByRole('button', { name: 'Đã xử lý', exact: true }).click();
    await page.waitForTimeout(100);
    assert(requests.some((r) => r.url === '/admin/reports/1/resolve' && r.method === 'PUT'));
    results.push({ check: 'Role/permission creation, user role/active toggles, moderation and report endpoints', pass: true });

    await page.goto(base + '/admin');
    await page.getByRole('button', { name: 'Mở menu quản trị' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Đăng xuất' }).click();
    await page.waitForURL('**/login');
    await page.goto(base + '/admin/users');
    await page.waitForURL('**/login');
    results.push({ check: 'Logout and preserved protected-route redirect', pass: true });
    loggedIn = true;
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(base + '/forum');
    const duration = await page.locator('.glass-hover').first().evaluate((el) => getComputedStyle(el).transitionDuration);
    assert(duration.split(',').every((value) => parseFloat(value) <= .001), 'Reduced motion');
    results.push({ check: 'Reduced-motion CSS', duration, pass: true });
    await page.setViewportSize({ width: 640, height: 900 });
    await page.goto(base + '/admin/users');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '200% equivalent layout');
    results.push({ check: '640px reflow (1280px at 200% equivalent)', pass: true });
    assert.equal(errors.length, 0, `Browser exceptions: ${errors.join('; ')}`);
    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ fixtureOnly: true, backendContacted: false, browserErrors: errors, checks: results }, null, 2));
    console.log(`PASS: ${results.length} frontend checks. Evidence: ${output}`);
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
