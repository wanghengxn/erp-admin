<template>
  <el-input v-if="!attr.querySearch" style="width: 100%;" v-bind="{ ...attr }" :model-value="props.modelValue" @input="inputHandler" @keydown.enter="emit('search')">
    <template v-if="attr.appendSearch" #append>
      <el-button :icon="Search" @click="emit('search')" />
    </template>
  </el-input>
  <el-autocomplete v-else style="width: 100%;" :fetch-suggestions="searchOptions" v-bind="{ ...attr }" :trigger-on-focus="true" :model-value="props.modelValue" @keydown.enter="emit('search')" @input="inputHandler" @select="selectHandle" />
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ElInput } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
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
const emit = defineEmits(['update:modelValue', 'search'])
const inputHandler = e => {
  emit('update:modelValue', e)
}
const selectHandle = e => {
  emit('update:modelValue', e.value)
  if (props.attr.isSearchBar) {
    emit('search')
  }
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
