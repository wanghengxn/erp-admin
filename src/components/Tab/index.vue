<template>
  <div class="tab-wrap">
    <div v-for="item in tabList" :key="item.value" class="tab-item" :class="{ active: item.value === modelValue }" @click="selectItem(item)">
      <i v-if="item.icon" :class="['iconfont', item.icon]" class="mr4"></i>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
  tabList: {
    type: Array,
    default: []
  },
  modelValue: {
    type: [String, Number],
    default: 1
  }
})

function selectItem(item) {
  if (props.modelValue === item.value) {
    return
  }
  emit('update:modelValue', item.value)
  emit('change', item.value)
}
</script>

<style scoped lang="scss">
.tab-wrap {
  display: flex;
  align-items: center;
  .tab-item {
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    transition: all linear .1s;
    border-bottom: 2px solid transparent;
    &:not(:last-child) {
      margin-right: 20px;
    }
    &.active {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
}
</style>
