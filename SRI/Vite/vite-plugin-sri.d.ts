declare module 'vite-plugin-sri' {
  export interface SriOptions {
    algorithms?: string[];
    crossorigin?: 'anonymous' | 'use-credentials';
    includeAssets?: string | string[];
  }
  
  const sri: (options?: SriOptions) => PluginOption;
  export default sri;
} 