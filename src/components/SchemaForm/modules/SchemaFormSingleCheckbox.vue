<template>
  <el-checkbox :disabled="attr.disabled" v-bind="{ ...attr }" @change="changeHandler">{{ attr.label }}</el-checkbox>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ElCheckbox } from 'element-plus'

defineProps({
  modelValue: {
    type: null,
    default: () => ''
  },
  attr: {
    type: Object
  },
  formItem: {
    type: Object
  }
})
const emit = defineEmits(['update:modelValue'])
const changeHandler = e => {
  emit('update:modelValue', e)
}

</script>
