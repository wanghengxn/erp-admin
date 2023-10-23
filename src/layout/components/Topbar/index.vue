<script setup name="Topbar">
import useSettingsStore from '@/store/modules/settings'
import Tabbar from './Tabbar/index.vue'
import Toolbar from './Toolbar/index.vue'

const settingsStore = useSettingsStore()

const tabbarAndToolbarOrder = computed(() => {
  let order = []
  if (settingsStore.tabbar.enable) {
    order.push('tabbar')
  }
  if (
    !(
      (settingsStore.menu.menuMode === 'head' && !settingsStore.toolbar.enableSidebarCollapse && (!settingsStore.breadcrumb.enable || settingsStore.app.routeBaseOn === 'filesystem')) ||
      (settingsStore.menu.menuMode === 'only-head' && (!settingsStore.breadcrumb.enable || settingsStore.app.routeBaseOn === 'filesystem'))
    )
  ) {
    order.push('toolbar')
  }
  if (settingsStore.topbar.switchTabbarAndToolbar) {
    order.reverse()
  }
  return order
})

function tabbarAndToolbarComponent(name) {
  const components = {
    'tabbar': Tabbar,
    'toolbar': Toolbar
  }
  return components[name]
}

const scrollTop = ref(0)
onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
function onScroll() {
  scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop
}
</script>

<template>
  <div
    class="topbar-container" :class="{
      'has-tabbar': tabbarAndToolbarOrder.includes('tabbar'),
      'has-toolbar': tabbarAndToolbarOrder.includes('toolbar'),
      'fixed': settingsStore.topbar.fixed,
      'shadow': !settingsStore.topbar.switchTabbarAndToolbar && scrollTop
    }" data-fixed-calc-width
  >
    <component :is="tabbarAndToolbarComponent(item)" v-for="item in tabbarAndToolbarOrder" :key="item" />
  </div>
</template>

<style lang="scss" scoped>
.topbar-container {
  position: absolute;
  z-index: 999;
  top: 0;
  transition: width 0.3s, top 0.3s, transform 0.3s, var(--el-transition-box-shadow);
  &.fixed {
    position: fixed;
    &.shadow {
      box-shadow: 0 10px 10px -10px var(--g-box-shadow-color);
    }
  }
}
</style>
