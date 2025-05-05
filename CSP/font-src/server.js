const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 设置CSP头 - 只允许从本地和Google Fonts加载字体
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "font-src 'self' https://fonts.gstatic.com; default-src 'self'"
  );
  next();
});

// 主页
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`font-src 示例运行在 http://localhost:${port}`);
}); 