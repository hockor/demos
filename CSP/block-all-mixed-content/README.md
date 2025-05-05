# CSP block-all-mixed-content Demo

这个 demo 展示了 Content Security Policy (CSP) 中 `block-all-mixed-content` 指令的使用方法。此指令指示浏览器阻止所有通过 HTTP 加载的资源，即使在 HTTPS 页面中也是如此。

## 功能

- 设置一个包含 `block-all-mixed-content` 指令的 CSP 头部
- 页面中故意包含 HTTP 资源 (图片、脚本和样式)
- 演示浏览器如何阻止这些混合内容
- 提供开关来比较有无阻止混合内容的效果

## 使用方法

1. 安装依赖：`npm install`
2. 启动服务器：`node server.js`
3. 访问 https://localhost:3003 (注意是 HTTPS)
4. 查看控制台，注意 HTTP 资源是如何被阻止的
5. 点击页面上的开关比较有无 `block-all-mixed-content` 的效果

## 文件结构

- `server.js`: Express HTTPS 服务器，设置 CSP 头部
- `public/index.html`: 包含混合内容的 HTML 页面
- `public/script.js`: 处理页面交互和状态显示的脚本
- `package.json`: 项目依赖
- `keys/`: 存放自签名 SSL 证书的文件夹

## 注意

1. 此 demo 使用自签名 SSL 证书，浏览器会显示安全警告，这是正常的，请点击"高级"并继续访问。
2. 为了清楚地观察效果，建议在浏览器的开发者工具中查看网络请求和控制台。 