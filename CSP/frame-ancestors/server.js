const express = require('express');
const path = require('path');
const app = express();
const port = 3008;

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 允许被特定域名嵌入的页面
app.get('/content', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'self' http://localhost:3008; default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'content.html'));
});

// 不允许被任何页面嵌入的页面
app.get('/no-embedding', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'none'; default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'no-embedding.html'));
});

// 允许任何页面嵌入的页面
app.get('/allow-all', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors *; default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'allow-all.html'));
});

// 测试页面 - 尝试嵌入其他页面
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`frame-ancestors 示例运行在 http://localhost:${port}`);
}); 