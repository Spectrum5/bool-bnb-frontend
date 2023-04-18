import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue({
        template: {
            compilerOptions: {
                isCustomElement: (tag) => ['swiper-slide'].includes(tag),
                isCustomElement: (tag) => ['swiper-container'].includes(tag),
            }
        }
    })],

    // Qui facciamo un'importazione globale (quindi per tutti i componenti) di alcuni file .scss
    css: {
        preprocessorOptions: {
            scss: {
                // Attenzione al percorso!
                additionalData: `
                    @import './src/styles/partials/reset.scss';
                    @import './src/styles/partials/variables.scss';
                    @import './src/styles/partials/mixins.scss';
                `
            }
        }
    }
})
