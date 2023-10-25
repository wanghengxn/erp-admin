<template>
  <el-input-number v-bind="{ ...attr }" v-model="content" size="small" :controls="false" class="edit-input h100" @input="inputHandler" />
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
const content = ref(props.modelValue)

watch(() => props.modelValue, val => {
  content.value = val
})
const inputHandler = e => {
  emit('update:modelValue', e)
}
</script>

<style scoped lang="scss">
.edit-input {
  &::v-deep(.el-input) {
    height: 100%;
  }
  &::v-deep(.el-input__wrapper) {
    box-shadow: none;
    padding: 0;
    background: transparent;
  }
}
</style>
