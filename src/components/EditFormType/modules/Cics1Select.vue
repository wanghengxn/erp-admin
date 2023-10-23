<template>
  <el-select
    v-bind="{ ...attr }" size="small" class="edit-input h100" :model-value="props.modelValue"
    @change="changeHandler"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup>
import { getIndustry } from '@/api/common'

const emit = defineEmits(['update:modelValue', 'changeSelect'])
const props = defineProps({
  modelValue: [String, Number, Array],
  attr: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const options = ref([])

const changeHandler = e => {
  emit('update:modelValue', e)
  const obj = options.value.find(item => item.value === e)
  emit('changeSelect', obj)
}

function getCicsCode() {
  getIndustry().then(res => {
    options.value = res.map(item => {
      return {
        label: item.name,
        value: item.code
      }
    })
  })
}

getCicsCode()
</script>

<style scoped lang="scss">
.edit-input {
  &::v-deep(.select-trigger) {
    height: 100%;
  }
  &::v-deep(.el-input) {
    height: 100%;
    &.is-focus .el-input__wrapper {
      box-shadow: none !important;
    }
  }
  &::v-deep(.el-input__wrapper) {
    box-shadow: none !important;
    background: transparent;
    padding: 0;
  }
}
</style>
