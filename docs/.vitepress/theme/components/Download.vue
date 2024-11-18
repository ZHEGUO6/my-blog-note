<script setup>
const props = defineProps({
  address: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  // 文件名
  filename: {
    type: String,
    required: true
  }
})

const download = async () => {
	try {
		// 请求/下载文件
		const res = await fetch(props.address);
		// 处理文件
		const blob = await res.blob();
		// 新的URL对象表示指定的File对象或Blob对象
		const url = URL.createObjectURL(blob);
		const alink = document.createElement("a");
		// 添加a标签
		alink.href = url;
		// 添加文件名
		alink.download = props.filename;
		// 模拟点击
		alink.click();
		// 释放内存
		URL.revokeObjectURL(url);
	} catch (err) {
		console.log(err);
	}
};
</script>

<template>
  <div class="link" @click="download()">
    <p>👀{{title}}</p>
  </div>
</template>

<style scoped>
.link{
  cursor: pointer;
  border-radius: 10px;
  background-color: #46b0da;
  padding: 3px;
  text-align: center;
}

.link:hover{
  background-color: #2e9db8;
}

p{
  font-size: 22px;
  font-weight: bold;
  color: #f7f8f8;
}
</style>