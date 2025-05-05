# CSP default-src 指令演示

这个演示展示了如何使用 CSP 的 `default-src` 指令来控制网页资源的加载。

## 功能说明

`default-src` 是 CSP 的一个回退指令，当某个资源类型没有特定的指令时，浏览器会使用 `default-src` 指定的策略。

本演示设置了 `default-src 'self'`，表示：
- 仅允许从当前域名加载资源
- 阻止所有外部资源（如外部脚本、样式、图片等）
- 如果没有为特定类型资源（如scripts、images等）设置指令，则使用此策略

## 演示内容

本演示包含以下测试：
1. 内部JavaScript（应该成功）
2. 外部jQuery库（应该被阻止）
3. 外部图片（应该被阻止）

## 运行方法

1. 确保已安装Node.js
2. 进入该目录，安装依赖：
   ```
   cd CSP/demos/default-src
   npm install
   ```
3. 启动服务器：
   ```
   node server.js
   ```
4. 在浏览器中访问：`http://localhost:3000`
5. 查看浏览器控制台，可以看到CSP阻止资源加载的错误信息

## 关键代码

服务器端设置CSP头：

```javascript
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'"
  );
  next();
});
```

## 学习要点

1. `default-src` 是其他指令的回退选项
2. 当设置为 `'self'` 时，只允许从相同来源加载资源
3. 了解如何识别CSP阻止的资源（通过浏览器控制台）
4. 了解如何配置Express服务器发送CSP头 