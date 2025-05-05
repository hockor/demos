const express = require('express');
const path = require('path');
const app = express();
const port = 3002;

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 设置两个不同的路由，一个启用CSP限制，一个不启用
app.get('/', (req, res) => {
  // 设置CSP头，禁止所有object标签和embed标签的内容
  res.setHeader(
    'Content-Security-Policy',
    "object-src 'none'; default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/unrestricted', (req, res) => {
  // 不设置CSP限制
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'unrestricted.html'));
});

app.listen(port, () => {
  console.log(`object-src 示例运行在 http://localhost:${port}`);
}); 