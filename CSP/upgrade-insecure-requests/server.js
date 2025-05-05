const express = require('express');
const path = require('path');

const app = express();
const PORT = 3002;

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 处理 / 路由，设置 CSP 头部，包含 upgrade-insecure-requests 指令
app.get('/', (req, res) => {
  // 从查询参数中获取是否启用 CSP
  const enableCSP = req.query.csp !== 'off';

  if (enableCSP) {
    // 设置 CSP 头部，包含 upgrade-insecure-requests 指令
    res.setHeader(
      'Content-Security-Policy',
      "upgrade-insecure-requests; default-src 'self' https:; img-src 'self' https: http:; script-src 'self' https: http: 'unsafe-inline'"
    );
  }

  // 发送 HTML 文件
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`访问 http://localhost:${PORT} 查看带有 upgrade-insecure-requests 的页面`);
  console.log(`访问 http://localhost:${PORT}?csp=off 查看不带有 upgrade-insecure-requests 的页面`);
}); 