<template>
  <el-popover
    ref="popoverRef"
    placement="bottom"
    :width="width"
    trigger="click"
    content=""
  >
    <template #reference>
      <div>
        <span>{{ title }}</span>
        <el-icon class="ml5">
          <svg-icon name="ep:arrow-down-bold" />
        </el-icon>
      </div>
    </template>
    <div class="w100 flex-auto h100">
      <CheckBoxType v-if="type === 'checkbox'" v-model="content" :options="options" @change="search" />
    </div>
  </el-popover>
</template>

<script setup>
import CheckBoxType from './modules/CheckBoxType.vue'

const emit = defineEmits(['update:modelValue', 'search'])
const props = defineProps({
  modelValue: [String, Number, Array],
  type: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 160
  },
  title: {
    type: String,
    default: ''
  },
  attr: {
    type: Object,
    default() {
      return {}
    }
  },
  options: {
    type: Array,
    default() {
      return []
    }
  }
})
const content = ref(props.modelValue)
const popoverRef = ref(null)

watch(() => props.modelValue, val => {
  content.value = val
})

function search(data) {
  emit('update:modelValue', data)
  emit('search', content.value)
  popoverRef.value.hide()
}
</script>

<style scoped lang="scss">

</style>
