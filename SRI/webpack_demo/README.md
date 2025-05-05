# Webpack TodoList 项目 (带 SRI 支持)

这是一个基于Webpack构建的简单TodoList应用，并使用了webpack-subresource-integrity实现子资源完整性(SRI)功能。同时，我们添加了SRI验证失败时的回退机制。

## 项目功能

- 添加、删除、标记完成待办事项
- 显示总待办事项数和已完成数量
- 使用SRI (Subresource Integrity) 保证资源安全
- SRI验证失败时自动回退到源站资源
- 完全兼容内容安全策略(CSP)

## SRI 说明

SRI (子资源完整性) 是一种安全功能，允许浏览器验证获取的资源是否被篡改。当浏览器获取带有完整性属性的资源时，会先检查资源的加密哈希值是否匹配。

### 本项目SRI实现

本项目使用 `webpack-subresource-integrity` 插件自动计算并添加了完整性哈希值。查看生成的 `dist/index.html` 文件，你会看到：

```html
<script src="bundle.[hash].js" 
  integrity="sha384-XXXX" 
  crossorigin="anonymous">
</script>
```

这些integrity属性包含了资源的SHA-384哈希值，确保资源未被篡改。

### CSP兼容的SRI回退机制

我们添加了CSP友好的SRI错误处理机制，具有以下特点：

1. 完全遵循CSP最佳实践，不使用内联事件处理程序(如onerror属性)
2. 不使用eval()、new Function()等受CSP限制的API
3. 通过事件委托和全局事件监听处理SRI验证失败和成功事件
4. 实现原理：
   - 在页面头部添加一个错误处理脚本
   - 通过捕获模式监听全局error和load事件
   - 当检测到SRI验证失败时创建新的脚本元素并替换原始脚本

这种实现方式可以在启用了严格CSP的网站上正常工作，同时保持SRI的安全特性。

### 如何验证SRI是否生效

1. 构建项目：`npm run build`
2. 启动预览服务器：`npm run serve`
3. 打开浏览器开发工具 (F12)，查看Network选项卡和Console选项卡
4. 刷新页面，检查JavaScript资源的响应头和载入情况
5. 查看HTML源代码中的integrity属性和SRI处理脚本

如果要测试SRI保护和回退机制：
1. 修改dist文件夹中的JS文件
2. 重新刷新页面，浏览器会先尝试加载被修改的资源
3. SRI验证失败后，会触发错误处理脚本
4. 控制台会显示回退加载信息
5. 应用最终会使用从源站重新加载的资源继续运行

## 与CSP兼容的注意事项

如果您的网站启用了严格的CSP策略，建议配置如下允许：

```
Content-Security-Policy: script-src 'self'; style-src 'self';
```

我们的SRI回退机制完全遵循这种严格的CSP配置，不需要添加'unsafe-inline'或'unsafe-eval'等不安全的源。

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建（带SRI）
npm run build

# 预览构建结果
npm run serve
``` 