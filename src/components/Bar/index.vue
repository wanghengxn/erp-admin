<template>
  <div class="bar-item">
    <el-icon :size="10" :class="[info.className, `status-${info.grade?.toLowerCase()}`]">
      <svg-icon name="ep:caret-bottom"></svg-icon>
    </el-icon>
    <div class="title" :class="[info.className, `status-${info.grade?.toLowerCase()}`]">{{ info.amount }}</div>
    <div class="bar" :class="[info.className, `status-${info.grade?.toLowerCase()}`]" :style="{ height: ratio + '%' }"></div>
    <div class="name">{{ info.grade }}</div>
  </div>
</template>

<script setup>
defineProps({
  typeClass: {
    type: String,
    default: ''
  },
  info: {
    type: Object,
    default() {
      return {}
    }
  },
  ratio: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped lang="scss">
.bar-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  text-align: center;
  height: 100%;
  .name {
    font-size: 10px;
    font-weight: bold;
    flex-shrink: 0;
  }
  .title {
    color: #A9ABAB !important;
    font-size: 10px;
    flex-shrink: 0;
  }
  .bar {
    width: 20px;
    border-radius: 10px;
    background: #DEDFE0;
  }
  .el-icon {
    display: none;
  }
  &.active {
    .el-icon {
      display: block;
    }
    .title {
      &.status-s {
        color: var(--status-s) !important;
      }

      &.status-a {
        color: var(--status-a) !important;
      }

      &.status-b {
        color: var(--status-b) !important;
      }

      &.status-c {
        color: var(--status-c) !important;
      }

      &.status-d {
        color: var(--status-d) !important;
      }
    }
    .bar {
      &.status-s {
        background-color: var(--status-s);
      }

      &.status-a {
        background-color: var(--status-a);
      }

      &.status-b {
        background-color: var(--status-b);
      }

      &.status-c {
        background-color: var(--status-c);
      }

      &.status-d {
        background-color: var(--status-d);
      }
    }
  }
}
</style>
