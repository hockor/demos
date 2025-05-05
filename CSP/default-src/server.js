const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 设置CSP头，default-src演示
app.use((req, res, next) => {
  // 只允许从当前源加载资源，不允许任何外部资源
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'"
  );
  next();
});

// 服务静态文件
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
}); 