// Run with an existing Playwright module: node scripts/verify-ui.cjs <module-path> [base-url]
// All /api traffic is fulfilled in the browser. This never contacts the backend.
const { chromium } = require(process.argv[2] || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.argv[3] || 'http://127.0.0.1:5173';
const output = path.resolve(__dirname, '../../../docs/frontend-optimization-qa');
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
    await context.addInitScript(() => {
      window.__draws = 0;
      for (const type of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
        if (!type) continue;
        for (const method of ['drawArrays', 'drawElements', 'drawArraysInstanced', 'drawElementsInstanced']) {
          const original = type.prototype[method];
          if (original) type.prototype[method] = function (...args) { window.__draws++; return original.apply(this, args); };
        }
      }
    });
    const page = await context.newPage();
    await page.route('**/*', (route) => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.fulfill({ status: 200, body: '' }));
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    let loggedIn = true;
    let mode = 'normal';
    let postDelay = 0;
    await page.route(`${base}/api/**`, async (route) => {
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
        return mode === 'error' ? json({ message: 'Test error' }, 503) : json(mode === 'empty' ? [] : mode === 'invalid' ? {} : posts);
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

    const routes = ['/', '/schedule', '/services', '/requests', '/faq', '/support', '/tuition', '/dorm', '/announcements', '/forum', '/forum/1', '/forum/new', '/login', '/register', '/verify-otp?email=test@example.test', '/forgot-password', '/reset-password?email=test@example.test', '/admin', '/admin/forum', '/admin/reports', '/admin/users', '/admin/roles', '/admin/permissions'];
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        await page.goto(base + route);
        await page.locator('h1').waitFor();
        await page.waitForTimeout(350);
        const layout = await page.evaluate(() => ({
          viewport: innerWidth, document: document.documentElement.scrollWidth,
          unnamed: [...document.querySelectorAll('input:not([type="hidden"]), textarea')].filter((el) => !el.labels?.length && !el.getAttribute('aria-label')).map((el) => el.outerHTML),
        }));
        results.push({ width, route, ...layout });
        console.log(JSON.stringify({ width, route, ...layout }));
        if (route === '/') {
          for (const reveal of await page.locator('.home-reveal').all()) {
            await reveal.scrollIntoViewIfNeeded();
            await page.waitForTimeout(90);
          }
          await page.evaluate(() => scrollTo(0, 0));
          await page.waitForTimeout(600);
        }
        if (['/', '/forum', '/services', '/login', '/admin/users'].includes(route)) await page.screenshot({ path: path.join(output, `${route.replaceAll('/', '-').slice(1) || 'home'}-${width}.png`), fullPage: true });
      }
    }
    const checks = [];
    const mark = (name) => { checks.push(name); console.log(`PASS ${name}`); };
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(base + '/services');
    const menu = page.getByRole('button', { name: 'Mở menu', exact: true });
    await menu.click();
    await page.getByRole('dialog', { name: 'Menu HTSV' }).waitFor();
    await page.keyboard.press('Escape');
    assert(await menu.evaluate((el) => el === document.activeElement));
    assert.equal(await page.evaluate(() => document.body.style.overflow), '');
    mark('Mobile drawer Escape returns focus and restores scroll');

    await page.goto(base + '/requests');
    await page.getByRole('button', { name: 'Gửi yêu cầu mới' }).click();
    const dialog = page.getByRole('dialog', { name: 'Gửi yêu cầu hỗ trợ' });
    await dialog.getByRole('button', { name: 'Lưu yêu cầu mẫu' }).click();
    assert(await dialog.getByRole('alert').count() > 0);
    await dialog.getByLabel('Mã sinh viên', { exact: true }).fill('QA243880');
    await dialog.getByLabel('Lý do yêu cầu', { exact: true }).fill('Kiểm tra yêu cầu hỗ trợ trên điện thoại.');
    await dialog.getByRole('button', { name: 'Lưu yêu cầu mẫu' }).click();
    await page.getByRole('button', { name: 'Theo dõi yêu cầu của tôi' }).click();
    await page.reload();
    await page.getByRole('button', { name: /Xem hồ sơ/ }).waitFor();
    mark('Request validation, save and persistence');

    await page.goto(base + '/forum');
    await page.locator('article').first().waitFor();
    const search = page.getByRole('textbox', { name: 'Tìm kiếm bài viết' });
    await search.fill('khongcobainao987654');
    await page.getByText('Không tìm thấy bài viết phù hợp', { exact: true }).waitFor();
    await search.fill('');
    await page.locator('article').first().waitFor();
    assert.equal(await search.evaluate((el) => getComputedStyle(el).fontSize), '16px');
    mark('Forum search, empty result, mobile input size');
    posts[0].content = 'NoSpaces'.repeat(150);
    await page.reload();
    await page.locator('article').first().waitFor();
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    mark('Long unbroken forum text does not overflow');
    for (const state of ['error', 'invalid', 'empty']) {
      mode = state;
      await page.reload();
      if (state === 'empty') await page.getByText('Chưa có câu chuyện nào', { exact: true }).waitFor();
      else {
        await page.getByText('Chưa thể tải dữ liệu.', { exact: true }).waitFor();
        mode = 'normal';
        await page.getByRole('button', { name: 'Thử lại', exact: true }).click();
        await page.locator('article').first().waitFor();
      }
      mark(`Forum ${state} state and recovery`);
    }
    mode = 'normal';

    await page.evaluate(() => localStorage.setItem('htsv_chatbot_history_v2', '[null]'));
    await page.goto(base + '/services');
    await page.getByRole('button', { name: 'Mở Tư vấn Sinh viên HTSV' }).click();
    await page.getByRole('region', { name: 'Cửa sổ trò chuyện HTSV' }).waitFor();
    const chatInput = page.getByRole('textbox', { name: 'Tin nhắn cho trợ lý HTSV' });
    await chatInput.fill('Học bổng');
    await page.getByRole('button', { name: 'Gửi tin nhắn' }).click();
    await page.getByRole('button', { name: 'Làm mới hội thoại' }).click();
    await page.waitForTimeout(1300);
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('htsv_chatbot_history_v2')).length), 1);
    await page.setViewportSize({ width: 667, height: 375 });
    const chatBounds = await page.locator('#htsv-chat-panel').boundingBox();
    assert(chatBounds.y >= 0 && chatBounds.y + chatBounds.height <= 375);
    await page.screenshot({ path: path.join(output, 'chat-landscape.png') });
    await page.keyboard.press('Escape');
    mark('Chat corrupt history, reset pending answer, landscape and Escape');

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(base + '/');
    await page.waitForFunction(() => window.__draws > 10);
    await page.locator('#home-content-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    const before = await page.evaluate(() => window.__draws);
    await page.waitForTimeout(500);
    assert.equal(await page.evaluate(() => window.__draws), before);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForFunction((count) => window.__draws > count, before);
    mark('Gallery stops GPU draws offscreen and resumes when visible');

    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(base + '/forum');
    await page.locator('article').first().waitFor();
    await page.screenshot({ path: path.join(output, 'forum-dark-reduced-360.png'), fullPage: true });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    mark('Dark theme and reduced motion layout');
    await page.goto(base + '/services');
    await page.locator('h1').waitFor();
    const heavyResources = await page.evaluate(() => performance.getEntriesByType('resource').filter((r) => /three\.module|xylophone-|depth-gallery-/.test(r.name)).map((r) => r.name));
    assert.deepEqual(heavyResources, []);
    mark('Service page does not download WebGL bundles');
    loggedIn = false;
    const refreshCount = requests.filter((r) => r.url === '/auth/refresh').length;
    await page.goto(base + '/forum/new?anonymous=true');
    await page.waitForURL(/\/login\?next=/);
    await page.locator('h1').waitFor();
    assert.equal(requests.filter((r) => r.url === '/auth/refresh').length - refreshCount, 1);
    mark('Guest protected route preserves next URL');

    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ results, checks, errors, requests }, null, 2));
    assert.equal(errors.length, 0, errors.join('\n'));
    assert.equal(results.filter((r) => r.document > r.viewport + 1 || r.unnamed.length).length, 0, 'Layout or accessible labels failed');
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exit(1); });
