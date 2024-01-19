import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import tailwindcssnesting from 'tailwindcss/nesting';

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        devSourcemap: true,
        postcss: {
            plugins: [tailwindcssnesting, tailwindcss],
        },
    },
    plugins: [react()],
});
