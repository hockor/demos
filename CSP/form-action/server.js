const express = require('express');
const path = require('path');
const app = express();
const port = 3007;

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 支持解析application/x-www-form-urlencoded格式的请求体
app.use(express.urlencoded({ extended: true }));

// 受限版 - 只允许向特定域名提交表单
app.get('/', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "form-action 'self' https://trusted-form-processor.example; default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 无限制版 - 不限制表单提交目标
app.get('/unrestricted', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'unrestricted.html'));
});

// 完全禁止版 - 禁止所有表单提交
app.get('/blocked', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "form-action 'none'; default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
  res.sendFile(path.join(__dirname, 'public', 'blocked.html'));
});

// 模拟表单处理端点
app.post('/form-handler', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>表单提交成功</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 20px auto; padding: 20px; }
        .success { color: green; }
        .back-link { margin-top: 20px; }
      </style>
    </head>
    <body>
      <h1 class="success">表单提交成功!</h1>
      <p>收到的数据:</p>
      <pre>${JSON.stringify(req.body, null, 2)}</pre>
      <div class="back-link">
        <a href="/">返回演示首页</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`form-action 示例运行在 http://localhost:${port}`);
}); 