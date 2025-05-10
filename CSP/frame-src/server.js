const express = require('express');
const path = require('path');
const app = express();
const port = 3003;



// 受限制的页面 - 只允许从特定来源加载iframe
app.get('/', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' https://www.youtube.com https://youtube.com;"
  );
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 无限制的页面 - 默认允许所有iframe
app.get('/unrestricted', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'unrestricted.html'));
});

// 完全禁止的页面 - 禁止所有iframe
app.get('/blocked', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "frame-src 'none'; default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'blocked.html'));
});
// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`frame-src 示例运行在 http://localhost:${port}`);
}); 