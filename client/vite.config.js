import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  server: {
    host: true,
    port: '8085',
    hot: true
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        // {
        //   'axios': [
        //     ['default', 'axios']
        //   ]
        // }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src',
        import.meta.url))
    }
  },
  build: {
      sourcemap: false,
      minify: 'esbuild',
      target: 'esnext',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
          output: {
              // manualChunks(id) {
              //     if (id.includes('node_modules')) {
              //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
              //     }
              // },
              assetFileNames: (assetInfo) => {
                  console.log(assetInfo.name);
                  let extType = assetInfo.name.match(/\.([^.]+)$|$/)[1];
                  if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                      extType = 'image';
                  };
                  if (/woff|woff2|ttf|eot|tiff/i.test(extType)) {
                      extType = 'fonts';
                  };
                  return `build/${extType}/[name].[hash][extname]`;
              },
              chunkFileNames: 'build/js/[name].[hash].js',
              entryFileNames: 'build/js/[name].[hash].js'
          }
      }
  }
});
