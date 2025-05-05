/**
 * CSP block-all-mixed-content Demo 服务器
 * 
 * 注意：运行前需要先生成 SSL 证书：
 * 
 * 1. 创建 keys 目录:
 *    mkdir -p keys
 * 
 * 2. 生成自签名证书:
 *    openssl req -x509 -newkey rsa:2048 -keyout keys/key.pem -out keys/cert.pem -days 365 -nodes -subj '/CN=localhost'
 * 
 * 或者直接运行:
 *    npm run generate-cert
 */

const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3003;

// 检查是否存在 SSL 证书文件
try {
  fs.accessSync(path.join(__dirname, 'keys', 'cert.pem'), fs.constants.F_OK);
  fs.accessSync(path.join(__dirname, 'keys', 'key.pem'), fs.constants.F_OK);
} catch (err) {
  console.error('错误: 找不到 SSL 证书文件！');
  console.error('请先运行: npm run generate-cert');
  console.error('或者手动创建证书文件到 keys/ 目录');
  process.exit(1);
}

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 处理 / 路由，设置 CSP 头部，包含 block-all-mixed-content 指令
app.get('/', (req, res) => {
  // 从查询参数中获取是否启用 CSP
  const enableCSP = req.query.csp !== 'off';

  if (enableCSP) {
    // 设置 CSP 头部，包含 block-all-mixed-content 指令
    res.setHeader(
      'Content-Security-Policy',
      "block-all-mixed-content; default-src https:; img-src https: data:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'"
    );
  }

  // 发送 HTML 文件
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 创建 HTTPS 服务器
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'keys', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'keys', 'cert.pem')),
};

const server = https.createServer(httpsOptions, app);

// 启动 HTTPS 服务器
server.listen(PORT, () => {
  console.log(`服务器运行在 https://localhost:${PORT}`);
  console.log(`访问 https://localhost:${PORT} 查看带有 block-all-mixed-content 的页面`);
  console.log(`访问 https://localhost:${PORT}?csp=off 查看不带有 block-all-mixed-content 的页面`);
  console.log('\n注意: 这个服务器使用自签名证书，浏览器可能会显示警告，可以忽略并继续访问');
}); 