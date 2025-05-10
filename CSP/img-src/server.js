const express = require('express');
const path = require('path');
const app = express();
const port = 3003;

// 设置CSP头，img-src演示
app.use((req, res, next) => {
  // 允许从当前域和 placehold.co 加载图片
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' https://placehold.co "
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