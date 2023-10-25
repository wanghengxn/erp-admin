<template>
  <el-date-picker size="small" v-bind="{ ...attr }" class="edit-date-input h100" :model-value="props.modelValue" placeholder="" @change="changeDate" />
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

const changeDate = e => {
  console.log(e)
  emit('update:modelValue', e)
}
</script>

<style lang="scss">
.edit-date-input {
  .el-input__wrapper {
    box-shadow: none;
    padding: 0;
    background: transparent;
    .el-input__prefix {
      display: none;
    }
  }
}
</style>
