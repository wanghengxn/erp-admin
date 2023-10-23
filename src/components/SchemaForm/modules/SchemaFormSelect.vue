<template>
  <el-select
    style="width: 100%;" :collapse-tags-tooltip="true" v-bind="{ ...attr }" :collapse-tags="true"
    :model-value="props.modelValue"
    @change="changeHandler"
  >
    <el-option v-if="attr.showAll" label="全部" value="">全部</el-option>
    <template v-for="(item, index) in localOptions" :key="index">
      <el-option :label="item.label" :value="item.value" :disabled="item.disabled">{{ item.customLabel || item.label }}</el-option>
    </template>
  </el-select>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { computed } from 'vue'
import { ElSelect, ElOption } from 'element-plus'

const props = defineProps({
  modelValue: [String, Number, Array],
  attr: {
    type: Object,
    default: () => {
      return { placeholder: '请选择' }
    }
  },
  formItem: {
    type: Object
  }
})
const emit = defineEmits(['update:modelValue', 'search'])
const changeHandler = e => {
  emit('update:modelValue', e)
  if (props.attr.isSearchBar) {
    emit('search')
  }
}

const localOptions = computed(() => props.formItem?.options || [])

</script>

<style lang="scss" scoped>
.el-select {
  font-size: 0;
}
</style>
