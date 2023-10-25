<script setup name="ReloadPrompt">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const {
  needRefresh,
  updateServiceWorker
} = useRegisterSW()

const close = async() => {
  needRefresh.value = false
}
</script>

<template>
  <div v-if="needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      页面有更新，请点击“重新载入”查看最新内容。如果点击无反应，请手动强制刷新该页面。
    </div>
    <button @click="updateServiceWorker()">重新载入</button>
    <button @click="close">关闭</button>
  </div>
</template>

<style lang="scss" scoped>
.pwa-toast {
  position: fixed;
  z-index: 10000;
  right: 0;
  bottom: 0;
  width: 300px;
  margin: 16px;
  padding: 12px;
  border: 1px solid var(--el-border-color-darker);
  border-radius: 4px;
  text-align: left;
  box-shadow: var(--el-box-shadow);
  background-color: var(--el-bg-color);
  .message {
    margin-bottom: 8px;
  }
  button {
    border: 1px solid var(--el-border-color);
    outline: none;
    margin-right: 5px;
    border-radius: 2px;
    padding: 3px 10px;
    cursor: pointer;
    &:hover {
      border-color: var(--el-border-color-darker);
    }
  }
}
</style>
