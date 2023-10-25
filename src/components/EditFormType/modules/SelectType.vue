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
const emit = defineEmits(['update:modelValue'])
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

const changeHandler = e => {
  emit('update:modelValue', e)
}
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
