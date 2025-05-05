# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Vite TodoList 项目 (带 SRI 支持)

这是一个基于Vite构建的简单TodoList应用，并使用了vite-plugin-sri实现子资源完整性(SRI)功能。

## 项目功能

- 添加、删除、标记完成待办事项
- 显示总待办事项数和已完成数量
- 使用SRI (Subresource Integrity) 保证资源安全

## SRI 说明

SRI (子资源完整性) 是一种安全功能，允许浏览器验证获取的资源是否被篡改。当浏览器获取带有完整性属性的资源时，会先检查资源的加密哈希值是否匹配。

### 本项目SRI实现

本项目使用 `vite-plugin-sri` 插件自动计算并添加了完整性哈希值。查看生成的 `dist/index.html` 文件，你会看到：

```html
<script type="module" crossorigin="" src="/assets/index-XXX.js" integrity="sha384-XXXX"></script>
<link rel="stylesheet" crossorigin="" href="/assets/index-XXX.css" integrity="sha384-XXXX">
```

这些integrity属性包含了资源的SHA-384哈希值，确保资源未被篡改。

### 如何验证SRI是否生效

1. 启动预览服务器：`npm run preview`
2. 打开浏览器开发工具 (F12)，查看Network选项卡
3. 刷新页面，检查JavaScript和CSS资源的响应头
4. 查看HTML源代码中的integrity属性

如果要测试SRI保护，可以尝试：
1. 修改dist文件夹中的某个JS或CSS文件
2. 重新刷新页面，浏览器会拒绝加载被修改的资源
3. 控制台会显示类似以下错误：
   ```
   Failed to find a valid digest in the 'integrity' attribute for resource 'http://localhost:4173/assets/index-XXX.js'
   ```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建（带SRI）
npm run build

# 预览构建结果
npm run preview
```
