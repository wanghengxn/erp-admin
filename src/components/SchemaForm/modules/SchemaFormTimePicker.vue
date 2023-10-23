
<template>
  <el-time-picker v-bind="{ ...attr }" v-model:modelValue="localTimeValue" style="width: 100%;" @change="changeHandler" />
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ElTimePicker } from 'element-plus'
import { isEqual } from 'lodash-es'

const props = defineProps({
  modelValue: [Object, Array, String],
  formItem: Object,
  attr: {
    type: Object,
    default: () => {
      return { placeholder: '请输入' }
    }
  }
})
const emit = defineEmits(['update:modelValue'])

const localTimeValue = ref(null)

const changeHandler = e => {
  emit('update:modelValue', e)
}

watch(() => props.modelValue, (newVal, oldVal) => {
  if (!isEqual(newVal, oldVal)) {
    localTimeValue.value = newVal
  }
})

onMounted(() => {
  localTimeValue.value = props.modelValue
})

</script>
