<script setup>
import {ref} from 'vue'

const isShow = ref(false)
const props = defineProps({
  src: {
    type: String,
    default: ''
  }
})

const handleShow = () => {
  window.open(props.src)
}
</script>

<template>
  <div @click="handleShow">
    点击查看图片
  </div>
</template>

<style scoped>

div {
  width: 100%;
  height: 55px;
  background-color: #1b5064;
  color: white;
  font-size: 20px;
  font-weight: bold;
  line-height: 55px;
  text-align: center;
  cursor: pointer;
  border-radius: 6px;
}
</style>