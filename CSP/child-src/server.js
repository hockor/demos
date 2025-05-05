const express = require('express');
const path = require('path');
const app = express();
const port = 3004;

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 设置child-src限制，控制iframe和worker
app.get('/', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "child-src 'self' https://www.youtube.com https://youtube.com; default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 提供worker.js脚本
app.get('/worker.js', (req, res) => {
  res.type('application/javascript');
  res.send(`
    // Web Worker 代码
    self.onmessage = function(e) {
      self.postMessage('Worker 收到消息: ' + e.data);
    };
  `);
});

// 提供第三方worker的模拟
app.get('/third-party-worker.js', (req, res) => {
  res.type('application/javascript');
  res.send(`
    // 第三方 Web Worker 代码
    self.onmessage = function(e) {
      self.postMessage('第三方 Worker 收到消息: ' + e.data);
    };
  `);
});

app.listen(port, () => {
  console.log(`child-src 示例运行在 http://localhost:${port}`);
}); 