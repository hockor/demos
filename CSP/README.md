# CSP 指令演示项目

这个项目包含了四个独立的演示，展示了不同 Content Security Policy (CSP) 指令的使用方法和效果。每个演示都有其独立的文件夹，包含前端和后端代码。

## 演示列表

1. [report-uri](./report-uri/): 展示如何配置 CSP 中的 `report-uri` 指令，当 CSP 策略被违反时，向指定 URL 发送违规报告。
2. [report-to](./report-to/): 展示如何使用 `report-to` 指令（`report-uri` 的新版替代），结合 Reporting API 提供更详细的分组报告。
3. [upgrade-insecure-requests](./upgrade-insecure-requests/): 展示 `upgrade-insecure-requests` 指令如何自动将 HTTP 请求升级为 HTTPS，适用于有大量遗留 HTTP 资源的网站。
4. [block-all-mixed-content](./block-all-mixed-content/): 展示 `block-all-mixed-content` 指令如何阻止所有混合内容（HTTPS 页面中的 HTTP 资源）。

## 运行方法

每个演示都有自己的 README 文件，详细介绍了功能和运行方法。一般来说，运行步骤如下：

```bash
# 进入演示目录
cd [demo-directory]

# 安装依赖
npm install

# 启动服务器
npm start
```

## 端口分配

- report-uri: http://localhost:3000
- report-to: http://localhost:3001
- upgrade-insecure-requests: http://localhost:3002
- block-all-mixed-content: https://localhost:3003 (注意是 HTTPS)

## 技术栈

- 前端：HTML、JavaScript、jQuery
- 后端：Node.js、Express

## 注意事项

- `block-all-mixed-content` 演示需要 HTTPS，使用了自签名证书，浏览器可能会显示安全警告。
- `report-to` 指令的功能依赖于浏览器对 Reporting API 的支持，可能需要较新版本的浏览器。
- 请使用浏览器开发者工具的控制台和网络面板查看详细结果。 