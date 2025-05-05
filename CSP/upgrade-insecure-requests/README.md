# CSP upgrade-insecure-requests Demo

这个 demo 展示了 Content Security Policy (CSP) 中 `upgrade-insecure-requests` 指令的使用方法。此指令会自动将页面中的所有 HTTP 请求升级为 HTTPS，对于有大量遗留 HTTP 资源的网站尤其有用。

## 功能

- 设置一个包含 `upgrade-insecure-requests` 指令的 CSP 头部
- 页面中故意包含 HTTP 资源 (图片和脚本)
- 演示浏览器如何自动将这些资源升级为 HTTPS

## 使用方法

1. 安装依赖：`npm install`
2. 启动服务器：`node server.js`
3. 访问 http://localhost:3002
4. 查看网络请求，注意 HTTP 资源是如何自动升级到 HTTPS 的
5. 可以尝试切换页面上的开关来比较有无 upgrade-insecure-requests 的效果

## 文件结构

- `server.js`: Express 服务器，设置 CSP 头部
- `public/index.html`: 包含 HTTP 资源的 HTML 页面
- `public/script.js`: 包含 HTTP 资源引用的脚本文件
- `package.json`: 项目依赖

## 注意

为了清楚地观察效果，建议在浏览器的开发者工具中查看网络请求。 