# 简介
**HTML（HyperText Markup Language）标签及其属性非常多，涵盖了从最基本的文档结构到复杂的交互式元素。下面列出了一些常见的 HTML 标签及其常用的属性，但请注意，HTML5 不断发展，新的标签和属性可能会被引入，旧的可能会被弃用。**
## 文档结构标签
```text
<html>: 定义 HTML 文档的根元素。
lang: 指定文档的语言。
<head>: 包含文档元数据，如 <title>、<meta>、<link> 等。
<title>: 设置文档的标题，显示在浏览器标签上。
<body>: 包含文档的所有可见内容。
文本内容标签
<p>: 段落。
<a>: 锚点，用于创建超链接。
href: 指定链接的目标 URL。
target: 指定链接在何处打开，如 _blank 表示新窗口。
<img>: 图像。
src: 图像文件的 URL。
alt: 图像不可见时的替代文本。
<br>: 换行。
<hr>: 水平线。
<span>: 用于对文本的一部分应用样式或添加 JavaScript 功能。
<strong>: 强调文本的重要性。
<em>: 对文本进行强调。
<b>: 加粗文本（不推荐，除非用于 CSS 样式）。
<i>: 斜体文本（不推荐，除非用于 CSS 样式）。
<u>: 下划线文本（不推荐，除非用于 CSS 样式）。
<del>: 删除线文本。
<ins>: 下划线文本，表示插入。
<mark>: 高亮文本。
<small>: 小字体文本。
<pre>: 预格式化文本。
<code>: 计算机代码片段。
<blockquote>: 块引用。
<q>: 短引用。
<abbr>: 缩写。
<address>: 联系信息。
<cite>: 引用作品的标题。
<bdo>: 双向覆盖。
```

## 列表标签
```text
<ul>: 无序列表。
<ol>: 有序列表。
<li>: 列表项。
```

## 表格标签
```text
<table>: 表格。
border: 表格边框宽度。
<tr>: 表格行。
<th>: 表格头部单元格。
scope: 表示单元格是否是行或列的标题。
<td>: 表格数据单元格。
<thead>: 表格头部。
<tbody>: 表格主体。
<tfoot>: 表格尾部。
```
## 表单标签
```text
<form>: 表单。
action: 表单提交的 URL。
method: 提交方式，如 GET 或 POST。
<input>: 输入字段。
type: 输入类型，如 text, password, checkbox, radio, submit 等。
name: 控件名称。
value: 控件值。
<button>: 按钮。
type: 按钮类型，如 submit, reset, button。
<textarea>: 多行文本输入。
<select>: 下拉列表。
<option>: 列表项。
<label>: 标签。
for: 关联的控件 ID。
<fieldset>: 分组表单控件。
<legend>: 表单控件组的标题。
```

## 新增的语义化标签
```text
<section>: 文档中的节或区域。
<article>: 文档、页面、应用程序或站点中的独立内容。
<aside>: 与页面主要内容相关但可以被单独处理的内容。
<header>: 介绍性内容或一组导航链接。
<footer>: 包含页面底部的信息。
<nav>: 导航链接的容器。
<main>: 文档或文档区域的主要内容。
<video>: 视频标签。
<audio>: 音频标签。
```
**这只是 HTML 标签的一个概览，实际上还有许多其他标签和属性，具体使用时应参考最新的 HTML5 规范。此外，HTML5 还支持全局属性，如 class, id, style, data- 等，这些属性可以应用于任何 HTML 元素。**