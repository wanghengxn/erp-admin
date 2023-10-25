<template>
  <el-space spacer="-" class="w100">
    <el-input v-bind="{ ...attr }" :model-value="props.modelValue[0]" @input="inputHandler" />
    <el-input v-bind="{ ...attr }" :model-value="props.modelValue[1]" @input="inputHandler" />
  </el-space>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ElInput } from 'element-plus'

const props = defineProps({
  modelValue: [Array],
  formItem: Object,
  attr: {
    type: Object,
    default: () => {
      return { placeholder: '请输入' }
    }
  }
})
const emit = defineEmits(['update:modelValue'])
console.log(props.modelValue)
const inputHandler = e => {
  emit('update:modelValue', e)
}

</script>
