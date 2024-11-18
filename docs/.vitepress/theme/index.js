// 1. 导入 vitepress 主题
import Theme from '@escook/vitepress-theme'
// 2. 导入配套的 CSS 样式（此步骤不能省略）
import '@escook/vitepress-theme/style.css'
import './style.css'
import download from './components/Download.vue'

// 3. 把“导入”的主题“默认导出”即可
export default {
    ...Theme,
    enhanceApp({app}) {
        // 4. 配置自定义的组件
        app.component('Download', download)
    }
}