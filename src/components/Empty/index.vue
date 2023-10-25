<template>
  <el-empty :description="desc" :image-size="60">
    <template v-if="imgType" #image>
      <img :src="getSrc(imgType)" alt="" width="60">
    </template>
    <template #description>
      <slot name="desc">
        <p>{{ desc }}</p>
      </slot>
    </template>
  </el-empty>
</template>

<script setup>
defineProps({
  desc: {
    type: String,
    default: ' '
  },
  imgType: {
    type: String,
    default: ''
  }
})

const getSrc = (name) => {
  const path = `../../assets/images/empty/${name}.png`;
  const modules = import.meta.globEager("../../assets/images/empty/*.png");
  return modules[path].default;
}
</script>

<style scoped lang="scss">
.el-empty {
  height: 100%;
  flex: 1;
}
.svg-icon {
  font-size: 60px;
}
.el-empty {
  &:deep(.el-empty__description) {
    margin-top: 6px;
    p {
      line-height: 1.5 !important;
      color: #ADAFB0;
    }
  }
}
</style>
