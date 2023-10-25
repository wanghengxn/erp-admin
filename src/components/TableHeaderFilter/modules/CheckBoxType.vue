<template>
  <div class="list-wrap">
    <div class="list">
      <el-checkbox v-model="checkAll" size="small" @change="changeAll">全选</el-checkbox>
      <el-checkbox-group v-model="selectArr" class="flex-column" size="small">
        <el-checkbox v-for="item in options" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="list-footer">
      <el-button type="primary" size="small" @click="search">确定</el-button>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const emit = defineEmits(['change', 'update:modelValue'])
const props = defineProps({
  modelValue: [String, Number, Array],
  options: {
    type: Array,
    default() {
      return []
    }
  },
  attr: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const selectArr = ref([])
const checkAll = ref(false)

watch(() => props.modelValue, val => {
  selectArr.value = val
})

watch(selectArr, val => {
  checkAll.value = val.length === props.options.length
})

function changeAll(e) {
  if (e) {
    selectArr.value = props.options.map(item => item.value)
  } else {
    selectArr.value = []
  }
}

function search() {
  emit('change', selectArr.value)
  emit('update:modelValue', selectArr.value)
}
</script>

<style scoped lang="scss">
.list {
  max-height: 300px;
  overflow: auto;
}
.list-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #dcdfe6;
  padding-top: 10px;
  margin-top: 10px;
}
</style>
