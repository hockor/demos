# CSP connect-src 指令演示

这个演示展示了如何使用 CSP 的 `connect-src` 指令来控制网站可以发起的网络请求。

## 功能说明

`connect-src` 指令限制了网站可以通过脚本接口连接的来源。这包括以下API：
- Fetch API
- XMLHttpRequest (AJAX)
- WebSockets
- EventSource (Server-Sent Events)
- Beacon API
- 以及其他网络连接接口

本演示设置了 `connect-src 'self' https://jsonplaceholder.typicode.com`，表示：
- 允许向当前域发起网络请求
- 允许向jsonplaceholder.typicode.com发起网络请求
- 阻止向其他域发起的网络请求

## 演示内容

本演示包含以下测试：
1. 同域Fetch请求（应该成功）
2. 允许的跨域Fetch请求（应该成功）
3. 不允许的跨域Fetch请求（应该被阻止）
4. XMLHttpRequest测试（应遵循与Fetch相同的规则）
5. WebSocket连接测试（应该被阻止）
6. Beacon API请求测试（根据目标网址决定成功或失败）

## 运行方法

1. 确保已安装Node.js
2. 进入该目录，安装依赖：
   ```
   cd CSP/demos/connect-src
   npm install
   ```
3. 启动服务器：
   ```
   node server.js
   ```
4. 在浏览器中访问：`http://localhost:3004`
5. 查看浏览器控制台，可以看到CSP阻止网络请求的错误信息

## 关键代码

服务器端设置CSP头：

```javascript
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self' https://jsonplaceholder.typicode.com; script-src 'self' 'unsafe-inline'"
  );
  next();
});
```

## 学习要点

1. `connect-src` 控制浏览器可以通过脚本API连接的所有网络请求
2. 这是一个非常重要的安全控制，可以防止数据泄露、跨站请求伪造等攻击
3. 如果未设置`connect-src`，则使用`default-src`的值
4. 不同类型的网络请求（Fetch、XHR、WebSocket等）都受相同规则控制
5. 现代Web应用通常需要精心配置该指令，因为它们通常依赖多个API和第三方服务 