

CSS（层叠样式表，Cascading Style Sheets）是一种用于描述 HTML 或 XML 文档样式的语言。它用于控制网页的布局、颜色、字体和其他视觉效果。以下是 CSS 的一些基础知识：

## 基本语法
CSS 规则由选择器和声明块组成:

- 选择器：用于选择 HTML 元素。
- 声明块：包含多个属性和值对

```css
selector {
  property: value;
}

body {
  background-color: lightblue;
  font-family: Arial, sans-serif;
}
```

## 2. 选择器
选择器用于匹配 HTML 元素，并应用样式规则。

- 元素选择器：直接使用元素名称。

```css
  p {
    color: red;
  }
```

- 类选择器：使用 .classname 来选择具有特定类的元素。

```css
  .highlight {
    background-color: yellow;
  }
```

- ID 选择器：使用 #idname 来选择具有特定 ID 的元素。

```css
  #main-title {
    font-size: 24px;
  }
```

- 组合选择器：可以组合多种选择器。

```css
  div p {
    color: blue;
  }
```

## 3. 层叠和优先级

当多个样式规则应用于同一个元素时，浏览器会根据优先级选择一个规则来应用。

**优先级顺序**

1. 内联样式（style 属性） > ID 选择器 > 类选择器 > 元素选择器
2. 后定义的规则优先级更高（CSS 文件中越后面的规则优先级越高）
   

```css
<style>
  p {
    color: red;
  }
</style>

<p style="color: green;">这段文本是绿色的。</p>
```

## 4. 盒模型
盒模型描述了元素的尺寸、边距、边框、填充等。
       **属性**

- margin: 设置外边距。
- padding: 设置内边距。
- border: 设置边框。
- width: 设置宽度。
- height: 设置高度。
- box-sizing: 设置盒模型计算方式（content-box 或 border-box）。

```css
.box {
  margin: 10px;
  border: 1px solid black;
  padding: 20px;
  width: 200px;
  height: 100px;
}
```

## 5. 常用属性
**文本和字体**

- color: 设置文本颜色。
- background-color: 设置背景颜色。
- font-family: 设置字体系列。
- font-size: 设置字体大小。
- font-weight: 设置字体粗细。
- font-style: 设置字体样式（如斜体）。
- text-align: 设置文本对齐方式。
- line-height: 设置行高。
- letter-spacing: 设置字符间距。
- text-decoration: 设置文本装饰（如下划线）。

**背景与边框**

- background-image: 设置背景图像。
- background-repeat: 设置背景图像重复方式。
- background-position: 设置背景图像位置。
- background-size: 设置背景图像大小。
- border-style: 设置边框样式。
- border-width: 设置边框宽度。
- border-color: 设置边框颜色。
- border-radius: 设置圆角半径。

**列表样式**

- list-style-type: 设置列表项标记类型。
- list-style-position: 设置列表项标记位置。
- list-style-image: 设置列表项标记图像。

**表格样式**

- border-collapse: 设置表格边框合并方式。
- caption-side: 设置表格标题位置。
- table-layout: 设置表格布局方式。

**转换与动画**

- transform: 设置元素的转换（如旋转、缩放、倾斜）。
- transition: 设置过渡效果。
- animation: 设置动画效果。

**其他常用属性**

- visibility: 设置元素的可见性（visible, hidden, collapse）。
- opacity: 设置元素的透明度。
- cursor: 设置鼠标指针样式。
- overflow: 设置溢出内容的显示方式（visible, hidden, scroll, auto）。
- float: 设置浮动（left, right, none）。
- clear: 设置清除浮动（left, right, both, none）。

```css
p {
  color: red;
  font-family: Arial, sans-serif;
  font-size: 18px;
  text-align: center;
}
```

**盒子布局**

- display: 设置元素的显示类型（block, inline, inline-block, flex, grid 等）。
- position: 设置元素的定位类型（static, relative, absolute, fixed 等）。
- top/bottom/left/right: 设置绝对定位的位置。
- z-index: 设置元素的堆叠顺序。

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## 6. 响应式设计
**响应式设计使网站在不同设备上都能良好显示**。

**媒体查询**

- 媒体查询允许根据不同屏幕尺寸应用不同的样式

```css
@media (max-width: 600px) {
  body {
    background-color: lightgreen;
  }
}
```

## 7. 动画

```css
/* 定义动画 */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* 应用动画 */
.box {
  animation: fadeIn 2s ease-in-out 0s infinite alternate;
}
```

**动画属性详解**

```css
animation-name
指定 @keyframes 规则的名称。

animation-duration
动画的持续时间。

animation-timing-function
动画的速度曲线，例如 linear、ease、ease-in、ease-out、ease-in-out。

animation-delay
动画开始前的延迟时间。

animation-iteration-count
动画播放次数，infinite 表示无限循环。

animation-direction
动画的方向，例如 normal、reverse、alternate、alternate-reverse。

animation-fill-mode
动画结束后的样式，例如 none、forwards、backwards、both。

animation-play-state
动画的状态，例如 running（默认）或 paused。
```

1. **旋转动画**

```css
/* 定义动画 */
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 应用动画 */
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  animation: rotate 2s linear infinite;
}
```

2. **淡入淡出动画**

```css
/* 定义动画 */
@keyframes fadeInOut {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

/* 应用动画 */
.box {
  width: 100px;
  height: 100px;
  background-color: blue;
  animation: fadeInOut 2s ease-in-out infinite;
}
```

3. **组合动画**

```css
/* 定义动画 */
@keyframes moveAndFade {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  50% {
    transform: translateX(50px);
    opacity: 1;
  }
  100% {
    transform: translateX(100px);
    opacity: 0;
  }
}

/* 应用动画 */
.box {
  width: 100px;
  height: 100px;
  background-color: green;
  animation: moveAndFade 2s ease-in-out infinite;
}
```

4. **动画的简写形式**

```css
.box {
  animation: moveAndFade 2s ease-in-out 0s infinite alternate;
}
```

5. **响应式动画**

```css
/* 定义动画 */
@keyframes fadeInOnMobile {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* 应用动画 */
.box {
  width: 100px;
  height: 100px;
  background-color: yellow;
  animation: fadeInOnMobile 2s ease-in-out infinite;
}

/* 媒体查询 */
@media (max-width: 600px) {
  .box {
    animation: fadeInOnMobile 1s ease-in-out infinite;
  }
}
```

