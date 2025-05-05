# CSP style-src 指令演示

这个演示展示了如何使用 CSP 的 `style-src` 指令来控制CSS样式的加载和应用。

## 功能说明

`style-src` 指令用于控制网页可以加载和应用的CSS样式的来源。这对于防止XSS攻击和保持页面样式一致性非常重要。

本演示设置了 `style-src 'self' https://cdnjs.cloudflare.com`，表示：
- 允许从当前域加载样式
- 允许从https://cdnjs.cloudflare.com加载样式
- 阻止来自其他域的样式
- 阻止内联样式（如style标签和行内style属性）
- 不阻止通过JavaScript添加的样式（这是CSP的一个特点/限制）

## 演示内容

本演示包含以下测试：
1. 本地样式表（应该成功）
2. 允许的CDN样式表（应该成功）
3. 不允许的CDN样式表（应该被阻止）
4. 内联style标签（应该被阻止）
5. 行内style属性（应该被阻止）
6. JavaScript动态添加的样式（应该成功）

## 运行方法

1. 确保已安装Node.js
2. 进入该目录，安装依赖：
   ```
   cd CSP/demos/style-src
   npm install
   ```
3. 启动服务器：
   ```
   node server.js
   ```
4. 在浏览器中访问：`http://localhost:3002`
5. 查看浏览器控制台，可以看到CSP阻止样式加载的错误信息

## 关键代码

服务器端设置CSP头：

```javascript
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; style-src 'self' https://cdnjs.cloudflare.com"
  );
  next();
});
```

## 学习要点

1. `style-src` 可以精确控制CSS样式的来源
2. 默认情况下，内联样式（style标签和style属性）被禁用
3. 如果需要允许内联样式，需要添加 `'unsafe-inline'`
4. CSP无法阻止通过JavaScript设置的style属性（如element.style.color='red'）
5. 可以通过特定域名来限制样式表来源 