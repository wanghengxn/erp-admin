<script setup>
import { useI18n } from 'vue-i18n'
import { getElementLocales } from '@/locales'
import api from '@/api'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'
import useTabbarStore from '@/store/modules/tabbar'
// import ReloadPrompt from '@/pwa/reloadPrompt.vue'

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()
const tabbarStore = useTabbarStore()

const { t, te } = useI18n()

provide('generateI18nTitle', generateI18nTitle)

const locales = computed(() => getElementLocales())

const buttonConfig = ref({
  autoInsertSpace: true
})

// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
  let actualWidth = getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width')
  actualWidth = parseInt(actualWidth)
  if (settingsStore.menu.menuMode === 'single' || (['head', 'only-head'].includes(settingsStore.menu.menuMode) && settingsStore.mode !== 'mobile')) {
    actualWidth = 0
  }
  return `${actualWidth}px`
})

// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
  let actualWidth = getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width')
  actualWidth = parseInt(actualWidth)
  if (settingsStore.menu.subMenuCollapse && settingsStore.mode !== 'mobile') {
    actualWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-collapse-width'))
  }
  if (['only-side', 'only-head'].includes(settingsStore.menu.menuMode) && settingsStore.mode !== 'mobile') {
    actualWidth = 0
  }
  if (
    settingsStore.menu.subMenuOnlyOneHide &&
    menuStore.sidebarMenus.length === 1 &&
    (
      !menuStore.sidebarMenus[0].children ||
      menuStore.sidebarMenus[0]?.children.every(item => item.meta.sidebar === false)
    )
  ) {
    actualWidth = 0
  }
  return `${actualWidth}px`
})

watch(() => settingsStore.app.colorScheme, val => {
  if (val === '') {
    settingsStore.$patch(state => {
      state.app.colorScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })
  } else {
    if (settingsStore.app.colorScheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}, {
  immediate: true
})

watch(() => settingsStore.mode, () => {
  if (settingsStore.mode === 'pc') {
    settingsStore.$patch(state => {
      state.menu.subMenuCollapse = settingsStore.subMenuCollapseLastStatus
    })
  } else if (settingsStore.mode === 'mobile') {
    settingsStore.$patch(state => {
      state.menu.subMenuCollapse = true
    })
  }
  document.body.setAttribute('data-mode', settingsStore.mode)
}, {
  immediate: true
})

watch(() => settingsStore.app.theme, () => {
  document.body.setAttribute('data-theme', settingsStore.app.theme)
}, {
  immediate: true
})

watch(() => settingsStore.menu.menuMode, () => {
  document.body.setAttribute('data-menu-mode', settingsStore.menu.menuMode)
}, {
  immediate: true
})

watch(() => settingsStore.layout.widthMode, () => {
  document.body.setAttribute('data-app-width-mode', settingsStore.layout.widthMode)
}, {
  immediate: true
})

watch([
  () => settingsStore.app.enableDynamicTitle,
  () => settingsStore.title
], () => {
  if (settingsStore.app.enableDynamicTitle && settingsStore.title) {
    let title = settingsStore.titleFirst ? settingsStore.title : generateI18nTitle(route.meta.i18n, settingsStore.title)
    document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
  } else {
    document.title = import.meta.env.VITE_APP_TITLE
  }
  if (settingsStore.title && settingsStore.tabbar.enable) {
    tabbarStore.editTitle({
      tabId: tabbarStore.mergeTabs ? (route.meta.activeMenu || route.fullPath) : route.fullPath,
      title: settingsStore.title
    })
  }
}, {
  immediate: true
})

watch(() => settingsStore.app.defaultLang, () => {
  api.defaults.headers.common['Accept-Language'] = settingsStore.app.defaultLang
}, {
  immediate: true
})

onMounted(() => {
  window.onresize = () => {
    settingsStore.setMode(document.documentElement.clientWidth)
  }
  window.onresize()
})

function generateI18nTitle(key, defaultTitle) {
  return settingsStore.toolbar.enableI18n && !!key && te(key) ? t(key) : (typeof defaultTitle === 'function' ? defaultTitle() : defaultTitle)
}
</script>

<template>
  <el-config-provider :locale="locales[settingsStore.app.defaultLang]" :size="settingsStore.app.elementSize" :button="buttonConfig">
    <RouterView
      :style="{
        '--g-main-sidebar-actual-width': mainSidebarActualWidth,
        '--g-sub-sidebar-actual-width': subSidebarActualWidth
      }"
    />
    <!-- <ReloadPrompt /> -->
  </el-config-provider>
</template>
