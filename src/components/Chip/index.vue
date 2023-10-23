<script setup name="Chip">
defineProps({
  type: {
    type: String,
    default: ''
  },
  closable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div
    class="chip" :class="[
      type ? `chip--${type}` : ''
    ]"
  >
    <div class="content">
      <slot />
      <span v-if="closable" class="closable" @click="emit('close')">
        <el-icon>
          <svg-icon name="i-ep:close-bold" />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chip {
  display: inline-block;
  vertical-align: middle;
  padding: 0 10px;
  margin-right: 2px;
  border-radius: 20px;
  background-color: var(--el-fill-color-light);
  color: var(--el-text-color-primary);
  transition: background-color 0.3s, var(--el-transition-color);
  .content {
    display: flex;
    align-items: center;
    min-height: 28px;
    font-size: 12px;
    :deep(.el-avatar) {
      width: 24px;
      height: 24px;
      line-height: 24px;
      margin-left: -8px;
      margin-right: 5px;
    }
    .closable {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-left: 5px;
      margin-right: -4px;
      font-size: 14px;
      background-color: var(--el-fill-color-darker);
      color: var(--el-text-color-primary);
      transition: background-color 0.3s, var(--el-transition-color);
      &:hover {
        opacity: 0.7;
      }
    }
  }
  &--primary {
    background-color: var(--el-color-primary);
    color: #fff;
    .content .closable {
      background-color: var(--el-color-primary-dark-2);
    }
  }
  &--success {
    background-color: var(--el-color-success);
    color: #fff;
    .content .closable {
      background-color: var(--el-color-success-dark-2);
    }
  }
  &--info {
    background-color: var(--el-color-info);
    color: #fff;
    .content .closable {
      background-color: var(--el-color-info-dark-2);
    }
  }
  &--warning {
    background-color: var(--el-color-warning);
    color: #fff;
    .content .closable {
      background-color: var(--el-color-warning-dark-2);
    }
  }
  &--danger {
    background-color: var(--el-color-danger);
    color: #fff;
    .content .closable {
      background-color: var(--el-color-danger-dark-2);
    }
  }
}
</style>
