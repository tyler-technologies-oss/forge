import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    conditions: ['import', 'module', 'browser', 'default']
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['node_modules']
      }
    }
  },
  optimizeDeps: {
    exclude: ['@tylertech/forge-extended']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        'forge-register': path.resolve(process.cwd(), 'forge-register.ts'),
        'ready-transition': path.resolve(process.cwd(), 'src/ready-transition.ts'),
        'theme-listener': path.resolve(process.cwd(), 'src/theme-listener.ts'),
        'theme': path.resolve(process.cwd(), 'theme.scss'),
        'styles': path.resolve(process.cwd(), 'styles.css')
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});
