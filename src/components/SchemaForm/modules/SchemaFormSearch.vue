<template>
  <el-input style="width: 100%;" v-bind="{ ...attr }" :model-value="props.modelValue" @input="inputHandler" />
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ElInput } from 'element-plus'
import { watch } from 'vue'
import { deepClone } from '@/util'

const props = defineProps({
  modelValue: [String, Number],
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
const selectHandle = e => {
  emit('update:modelValue', e.value)
}
const localOptions = ref([])

watch(() => props.formItem, () => {
  if (Array.isArray(props.formItem.options)) {
    localOptions.value = deepClone(props.formItem.options)
  }
}, { deep: true, immediate: true })

function searchOptions(queryString, cb) {
  let result = deepClone(localOptions.value)
  if (queryString) {
    result = result.filter(item => item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
  }
  cb(result)
}

</script>
