<template>
  <el-input-number style="width: 100%;" :value-on-clear="undefined" v-bind="{ ...attr }" :model-value="props.modelValue" @input="inputHandler" />
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ElInputNumber } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: null,
    default: undefined
  },
  formItem: Object,
  attr: {
    type: Object,
    default: () => {
      return { placeholder: '请输入' }
    }
  }
})
const emit = defineEmits(['update:modelValue'])
const inputHandler = e => {
  emit('update:modelValue', e)
}

</script>
