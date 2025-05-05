# CSP img-src 指令演示

这个演示展示了如何使用 CSP 的 `img-src` 指令来控制图片资源的加载。

## 功能说明

`img-src` 指令用于控制网页可以加载的图片的来源。这对于防止跨站图片劫持、阻止未经授权的图片共享以及减少带宽占用非常有用。

本演示设置了 `img-src 'self' https://via.placeholder.com`，表示：
- 允许从当前域加载图片
- 允许从https://via.placeholder.com加载图片
- 阻止来自其他域的图片
- 适用于`<img>`标签、CSS背景图片以及通过JavaScript动态添加的图片

## 演示内容

本演示包含以下测试：
1. 本地图片（应该成功）
2. 允许的外部图片（应该成功）
3. 不允许的外部图片（应该被阻止）
4. CSS背景图片（根据来源决定成功或失败）
5. JavaScript动态添加的图片（遵循与静态图片相同的规则）
6. 内联SVG图片（应该不受CSP img-src影响）

## 运行方法

1. 确保已安装Node.js
2. 进入该目录，安装依赖：
   ```
   cd CSP/demos/img-src
   npm install
   ```
3. 启动服务器：
   ```
   node server.js
   ```
4. 在浏览器中访问：`http://localhost:3003`
5. 查看浏览器控制台，可以看到CSP阻止图片加载的错误信息

## 关键代码

服务器端设置CSP头：

```javascript
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' https://via.placeholder.com"
  );
  next();
});
```

## 学习要点

1. `img-src` 可以精确控制图片的来源
2. 该指令不仅适用于`<img>`标签，也适用于CSS的背景图片
3. 内联SVG不受img-src指令影响，因为它不需要外部资源
4. 你可以使用特定域名、关键字（如'self'）或通配符来定义允许的图片来源
5. 图片是网页上常见的资源，合理配置img-src可以提高安全性并优化带宽使用 