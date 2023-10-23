<template>
  <div class="flex-row h100">
    <el-slider class="edit-slider h100" v-bind="{ ...attr }" :model-value="modelValue" @input="inputHandler" />
    <span class="ml10 font12" style="width: 4em;text-align: right">{{ modelValue }}%</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  attr: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const emit = defineEmits(['update:modelValue'])
const inputHandler = e => {
  emit('update:modelValue', e)
}
</script>

<style scoped lang="scss">
.edit-slider {
  &::v-deep(.el-slider__button) {
    width: 14px;
    height: 14px;
    background: var(--color-primary);
    border: 2px solid var(--color-whites);
    border-radius: 50%;
  }
  &::v-deep(.el-slider__button-wrapper) {
    top: -14px;
  }
  &::v-deep(.el-slider__runway) {
    height: 8px;
    border-radius: 8px;
    background: #EFEEEF;
    .el-slider__bar {
      height: 8px;
      border-radius: 8px;
    }
  }
}
</style>
