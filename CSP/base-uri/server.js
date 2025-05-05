const express = require('express');
const path = require('path');
const app = express();
const port = 3006;

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 受限的页面 - 仅允许同源的base标签
app.get('/', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "base-uri 'self'; default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 无限制的页面 - 不限制base-uri
app.get('/unrestricted', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'unrestricted.html'));
});

// 完全禁止的页面 - 禁止所有base标签
app.get('/blocked', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "base-uri 'none'; default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'blocked.html'));
});

app.listen(port, () => {
  console.log(`base-uri 示例运行在 http://localhost:${port}`);
}); 