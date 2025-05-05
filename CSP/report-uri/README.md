# CSP report-uri Demo

这个 demo 展示了 Content Security Policy (CSP) 中 `report-uri` 指令的使用方法。当 CSP 策略被违反时，浏览器会发送一份违规报告到指定的 URL。

## 功能

- 设置一个带有 CSP 限制的网页
- 故意违反 CSP 策略 (通过内联脚本)
- 通过 `/report` 端点接收和查看 CSP 违规报告

## 使用方法

1. 安装依赖：`npm install`
2. 启动服务器：`node server.js`
3. 访问 http://localhost:3000
4. 查看控制台，会发现 CSP 违规警告
5. 在服务器控制台中，可以看到接收到的 CSP 违规报告

## 文件结构

- `server.js`: Express 服务器，设置 CSP 头部并处理报告
- `public/index.html`: 包含故意违反 CSP 的 HTML 页面
- `package.json`: 项目依赖 