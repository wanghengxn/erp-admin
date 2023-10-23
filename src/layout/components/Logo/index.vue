<script setup name="Logo">
import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()

defineProps({
  showLogo: {
    type: Boolean,
    default: true
  },
  showTitle: {
    type: Boolean,
    default: true
  }
})

const title = ref(import.meta.env.VITE_APP_TITLE)

const to = computed(() => {
  let rtn = {}
  if (settingsStore.dashboard.enable) {
    rtn.name = 'dashboard'
  }
  return rtn
})
</script>

<template>
  <router-link :to="to" class="title" :class="{'is-link': settingsStore.dashboard.enable}" :title="title">
    <div class="flex-center title-text">ERP管理平台</div>
  </router-link>
</template>

<style lang="scss" scoped>
.title {
  position: fixed;
  z-index: 1000;
  top: 0;
  width: inherit;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--g-sidebar-logo-height);
  text-align: center;
  overflow: hidden;
  text-decoration: none;
  &.is-link {
    cursor: pointer;
  }
  .logo {
    & + div {
      margin-left: 30px;
    }
  }
  .title-text {
    display: flex;
    align-items: center;
    color: #101010;
    font-size: 18px;
    @include text-overflow;

    font-weight: 500;
  }
}
</style>
