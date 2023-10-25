<template>
  <el-input size="small" v-bind="{ ...attr }" class="edit-input h100" :model-value="props.modelValue" @input="inputHandler" />
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  attr: {
    type: Object,
    default() {
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
.edit-input {
  &::v-deep(.el-input__wrapper) {
    box-shadow: none;
    padding: 0;
    background: transparent;
  }
}
</style>
