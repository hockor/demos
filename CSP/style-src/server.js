const express = require('express');
const path = require('path');
const app = express();
const port = 3002;

// 设置CSP头，style-src演示
app.use((req, res, next) => {
  // 允许从当前域和cdnjs.cloudflare.com加载样式
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; style-src 'self' https://cdnjs.cloudflare.com"
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