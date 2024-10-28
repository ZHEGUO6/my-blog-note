export default {
    plugins: [],
    build: {
        rollupOptions: {
            external: ['vitepress'],
            output: {
                globals: {
                    vitepress: 'vitepress'
                }
            }
        }
    }
}
