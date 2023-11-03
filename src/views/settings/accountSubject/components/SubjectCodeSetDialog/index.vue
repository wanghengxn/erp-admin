<template>
  <el-dialog v-model="windowShow" title="科目编码设置" width="600px" :close-on-click-modal="false" @close="onClose">
    <div>
      科目编码
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" :loading="sureLoading" @click="onConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
    
<script setup>
import { defineEmits, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { deepClone } from '@/util'
    
const emit = defineEmits(['on-confirm'])
const windowShow = ref(false)
    
function onClose() {
  windowShow.value = false
}
    
function onConfirm() {
  
}
function show() {
  windowShow.value = true
}
    
defineExpose({
  show
})
</script>
    