const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// 设置CSP头，script-src演示
app.use((req, res, next) => {
  // 允许从当前域和code.jquery.com加载JavaScript
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' "
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