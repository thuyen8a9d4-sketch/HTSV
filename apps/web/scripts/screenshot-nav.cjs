const { chromium } = require('C:\\Users\\zuzong\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\node_modules\\playwright');
const path = require('node:path');
const fs = require('node:fs');
const http = require('node:http');

// Simple static server for dist
const dist = path.resolve(__dirname, '../dist');
const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let file = path.join(dist, req.url.split('?')[0]);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(dist, 'index.html');
  }
  const ext = path.extname(file);
  res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

server.listen(4188, async () => {
  console.log('Static server listening on 4188');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  // Mock API
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url()).pathname.replace(/^\/api/, '');
    if (url === '/auth/refresh') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          accessToken: 'fake-token',
          user: { id: 1, fullName: 'Dương Nhựt Thịnh', username: 'zuzong', email: 'zuzong@example.com', roles: ['ADMIN'] }
        })
      });
    }
    if (url === '/forum/posts') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 1,
            content: 'Có ai đang ôn thi kết thúc học phần môn Thiết kế đồ họa không? Mình có tổng hợp tài liệu ôn tập và bài tập mẫu này, mọi người cần thì nhắn nhé!',
            isAnonymous: false,
            createdAt: new Date().toISOString(),
            authorUser: { fullName: 'Dương Nhựt Thịnh' },
            category: { name: 'Góc học tập' },
            _count: { binhLuans: 4, luotThiches: 15 }
          },
          {
            id: 2,
            content: 'Chào các bạn K24, đầu kỳ này ai cần tìm bạn ở ghép ký túc xá hoặc phòng trọ gần trường thì kết nối nhé. Phòng sạch sẽ, yên tĩnh.',
            isAnonymous: true,
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            authorUser: null,
            category: { name: 'Chuyện sinh viên' },
            _count: { binhLuans: 2, luotThiches: 8 }
          },
          {
            id: 3,
            content: 'Hôm nay mình có nhặt được một chiếc thẻ sinh viên tại thư viện tầng 2. Mình đã gửi lại tại bàn thủ thư, bạn nào làm rơi thì ghé nhận nhé!',
            isAnonymous: false,
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            authorUser: { fullName: 'Nguyễn Văn An' },
            category: { name: 'Tìm đồ thất lạc' },
            _count: { binhLuans: 1, luotThiches: 24 }
          }
        ])
      });
    }
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });

  await page.goto('http://127.0.0.1:4188/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const outDir = path.resolve(__dirname, '../../../docs/student-qa/liquid-glass-nav');
  fs.mkdirSync(outDir, { recursive: true });

  // Screenshot 1: Desktop Nav (1280px)
  await page.screenshot({ path: path.join(outDir, 'nav-desktop-1280.png') });
  console.log('Captured desktop nav');

  // Screenshot 2: Mobile Nav (375px)
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, 'nav-mobile-375.png') });
  console.log('Captured mobile nav');

  // Screenshot 3: Mobile Drawer
  await page.click('button[aria-label="Mở menu"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'nav-drawer-375.png') });
  console.log('Captured mobile drawer');

  await browser.close();
  server.close();
  console.log('Done!');
  process.exit(0);
});
