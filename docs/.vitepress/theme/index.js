/*
 * @Author: zheguo 3188606474@qq.com
 * @Date: 2024-09-13 20:39:45
 * @LastEditors: zheguo 3188606474@qq.com
 * @LastEditTime: 2024-09-20 15:38:01
 * @FilePath: \vite_press_one\docs\.vitepress\theme\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// // https://vitepress.dev/guide/custom-theme
// import { h } from 'vue'
// import DefaultTheme from 'vitepress/theme'
// import './style.CSS'

// /** @type {import('vitepress').Theme} */
// export default {
//   extends: DefaultTheme,
//   Layout: () => {
//     return h(DefaultTheme.Layout, null, {
//       // https://vitepress.dev/guide/extending-default-theme#layout-slots
//     })
//   },
//   enhanceApp({ app, router, siteData }) {
//     // ...
//   }
// }

// 1. 导入 vitepress 主题
import Theme from '@escook/vitepress-theme'
// 2. 导入配套的 CSS 样式（此步骤不能省略）
import '@escook/vitepress-theme/style.css'

// 3. 把“导入”的主题“默认导出”即可
export default Theme