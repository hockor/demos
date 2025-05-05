# CSP script-src 指令演示

这个演示展示了如何使用 CSP 的 `script-src` 指令来控制JavaScript脚本的加载与执行。

## 功能说明

`script-src` 指令用于控制网页可以加载和执行的JavaScript脚本的来源。它是安全性最关键的CSP指令之一，因为脚本可以完全控制网页行为。

本演示设置了 `script-src 'self' https://code.jquery.com`，表示：
- 允许从当前域加载脚本
- 允许从https://code.jquery.com加载脚本
- 阻止来自其他域的脚本
- 阻止内联脚本（如onclick属性中的代码）
- 阻止eval()和类似的动态代码执行
- 阻止动态生成的脚本

## 演示内容

本演示包含以下测试：
1. 来自允许域的jQuery库（应该成功）
2. HTML内联脚本（应该被阻止）
3. 来自未允许域的外部脚本（应该被阻止）
4. 动态创建的内联脚本（应该被阻止）

## 运行方法

1. 确保已安装Node.js
2. 进入该目录，安装依赖：
   ```
   cd CSP/demos/script-src
   npm install
   ```
3. 启动服务器：
   ```
   node server.js
   ```
4. 在浏览器中访问：`http://localhost:3001`
5. 查看浏览器控制台，可以看到CSP阻止脚本执行的错误信息

## 关键代码

服务器端设置CSP头：

```javascript
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://code.jquery.com"
  );
  next();
});
```

## 学习要点

1. `script-src` 可以精确控制JavaScript的来源
2. 默认情况下，内联脚本和eval都被禁用
3. 如果需要允许内联脚本，需要添加 `'unsafe-inline'` 
4. 如果需要允许eval，需要添加 `'unsafe-eval'`
5. 可以通过特定域名来限制脚本来源 