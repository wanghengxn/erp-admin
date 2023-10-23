<script setup name="Tabbar">
import Sortable from 'sortablejs'
import { useI18n } from 'vue-i18n'
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'
import storage from '@/util/storage'
import { useMainPage, useTabbar } from '@/util/composables'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()

const settingsStore = useSettingsStore()
const tabbarStore = useTabbarStore()

const { t } = useI18n()

const generateI18nTitle = inject('generateI18nTitle')

// 当前标签页指向路由
const activedTabId = computed(() => settingsStore.tabbar.mergeTabs ? (route.meta.activeMenu || route.fullPath) : route.fullPath)
// 当前标签页两侧是否有可关闭的标签页
const hasTabbarOtherSideCanClose = computed(() => checkOtherSideHasTabCanClose())
// 当前标签页左侧是否有可关闭的标签页
const hasTabbarLeftSideCanClose = computed(() => checkLeftSideHasTabCanClose())
// 当前标签页右侧是否有可关闭的标签页
const hasTabbarRightSideCanClose = computed(() => checkRightSideHasTabCanClose())

const isShowMoreAction = computed(() => tabbarStore.list.length > 1 && (hasTabbarOtherSideCanClose.value || hasTabbarLeftSideCanClose.value || hasTabbarRightSideCanClose.value))

const tabbarList = computed({
  get() {
    return tabbarStore.list
  },
  set(value) {
    tabbarStore.sort(value)
  }
})

const tabsRef = ref()
const tabContainerRef = ref()
const tabRef = ref([])
const setTabRef = el => tabRef.value.push(el)
onBeforeUpdate(() => {
  tabRef.value = []
})

const isDragging = ref(false)
let tabSortable
onMounted(() => {
  tabSortable = new Sortable(tabContainerRef.value.$el, {
    animation: 200,
    ghostClass: 'tab-ghost',
    draggable: '.tab',
    handle: '.drag-handle',
    filter: '.no-drag',
    onStart: () => {
      isDragging.value = true
    },
    onEnd: () => {
      isDragging.value = false
    },
    onUpdate: e => {
      tabbarList.value.splice(e.newIndex, 0, tabbarList.value.splice(e.oldIndex, 1)[0])
    }
  })
})
watch(() => settingsStore.mode, val => {
  tabSortable?.option('disabled', val === 'mobile')
}, {
  immediate: true
})

watch(() => route, val => {
  if (settingsStore.tabbar.enable) {
    tabbarStore.add(val).then(() => {
      const index = tabbarList.value.findIndex(item => item.tabId === activedTabId.value)
      index !== -1 && scrollTo(tabRef.value[index].offsetLeft)
      tabbarScrollTip()
    })
  }
}, {
  immediate: true,
  deep: true
})

function tabbarScrollTip() {
  if (tabContainerRef.value.$el.clientWidth > tabsRef.value.clientWidth && !storage.local.has('tabbarScrollTip')) {
    ElMessageBox.confirm('顶部标签栏数量超过展示区域范围，你可以将鼠标移到标签栏上，然后通过鼠标滚轮滑动浏览', '温馨提示', {
      confirmButtonText: '知道了',
      showCancelButton: false,
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      type: 'info',
      center: true
    }).then(() => {
      storage.local.set('tabbarScrollTip', '')
    })
  }
}
function tabbarMaximizeTip() {
  if (!storage.local.has('tabbarMaximizeTip')) {
    ElMessageBox.confirm('你也可以通过双击标签栏进行最大化操作', '温馨提示', {
      confirmButtonText: '知道了',
      showCancelButton: false,
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      type: 'info',
      center: true
    }).then(() => {
      storage.local.set('tabbarMaximizeTip', '')
    })
  }
}
function handlerMouserScroll(event) {
  tabsRef.value.scrollBy({
    left: (event.deltaY || event.detail) > 0 ? 50 : -50
  })
}
function scrollTo(offsetLeft) {
  tabsRef.value.scrollTo({
    left: offsetLeft - 50,
    behavior: 'smooth'
  })
}
// 校验指定标签两侧是否有可关闭的标签
function checkOtherSideHasTabCanClose(tabId = activedTabId.value) {
  return tabbarStore.list.some(item => {
    return !item.isPermanent && !item.isPin && item.tabId != tabId
  })
}
// 校验指定标签左侧是否有可关闭的标签
function checkLeftSideHasTabCanClose(tabId = activedTabId.value) {
  let flag = true
  if (tabId == tabbarStore.list[0].tabId) {
    flag = false
  } else {
    let index = ~~Object.keys(tabbarStore.list).find(i => {
      return tabbarStore.list[i].tabId == tabId
    })
    flag = tabbarStore.list.some((item, i) => {
      return i < index && !item.isPermanent && !item.isPin && item.tabId != tabId
    })
  }
  return flag
}
// 校验指定标签右侧是否有可关闭的标签
function checkRightSideHasTabCanClose(tabId = activedTabId.value) {
  let flag = true
  if (tabId == tabbarStore.list.at(-1).tabId) {
    flag = false
  } else {
    let index = ~~Object.keys(tabbarStore.list).find(i => {
      return tabbarStore.list[i].tabId == tabId
    })
    flag = tabbarStore.list.some((item, i) => {
      return i >= index && !item.isPermanent && !item.isPin && item.tabId != tabId
    })
  }
  return flag
}
function onTabClose(tabId) {
  useTabbar().closeById(tabId)
}
function onOtherSideTabClose(tabId, fullPath) {
  // 如果操作的是非当前路由标签页，则先跳转到指定路由标签页
  tabId != activedTabId.value && router.push(fullPath)
  tabbarStore.removeOtherSide(tabId)
}
function onLeftSideTabClose(tabId, fullPath) {
  // 如果操作的是非当前路由标签页，需要判断当前标签页是否在指定标签页左侧，如果是则先跳转到指定路由标签页
  if (tabId != activedTabId.value) {
    let pathIndex = ~~Object.keys(tabbarStore.list).find(i => {
      return tabbarStore.list[i].tabId == tabId
    })
    let activedPathIndex = ~~Object.keys(tabbarStore.list).find(i => {
      return tabbarStore.list[i].tabId == activedTabId.value
    })
    if (activedPathIndex < pathIndex) {
      router.push(fullPath)
    }
  }
  tabbarStore.removeLeftSide(tabId)
}
function onRightSideTabClose(tabId, fullPath) {
  // 如果操作的是非当前路由标签页，需要判断当前标签页是否在指定标签页右侧，如果是则先跳转到指定路由标签页
  if (tabId != activedTabId.value) {
    let pathIndex = ~~Object.keys(tabbarStore.list).find(i => {
      return tabbarStore.list[i].tabId == tabId
    })
    let activedPathIndex = ~~Object.keys(tabbarStore.list).find(i => {
      return tabbarStore.list[i].tabId == activedTabId.value
    })
    if (activedPathIndex > pathIndex) {
      router.push(fullPath)
    }
  }
  tabbarStore.removeRightSide(tabId)
}
function actionCommand(command) {
  switch (command) {
    case 'other-side':
      onOtherSideTabClose(activedTabId.value, route.fullPath)
      break
    case 'left-side':
      onLeftSideTabClose(activedTabId.value, route.fullPath)
      break
    case 'right-side':
      onRightSideTabClose(activedTabId.value, route.fullPath)
      break
  }
}
function onTabbarContextmenu(event, routeItem) {
  event.preventDefault()
  proxy.$contextmenu({
    x: event.x,
    y: event.y,
    zIndex: 1000,
    iconFontClass: '',
    customClass: 'contextmenu-custom',
    items: [
      {
        label: t('app.tabbar.reload'),
        icon: 'i-ri:refresh-line',
        disabled: routeItem.tabId != activedTabId.value,
        onClick: () => useMainPage().reload()
      },
      {
        label: t('app.tabbar.close'),
        icon: 'i-ri:close-line',
        disabled: tabbarStore.list.length <= 1 || routeItem.isPin || routeItem.isPermanent,
        divided: true,
        onClick: () => {
          onTabClose(routeItem.tabId)
        }
      },
      {
        label: routeItem.isPin ? t('app.tabbar.unpin') : t('app.tabbar.pin'),
        icon: routeItem.isPin ? 'i-ri:pushpin-line' : 'i-ri:pushpin-2-line',
        // 控制台页面不允许被固定，因为如果固定控制台且控制台被关闭后，会导致登录时进入路由死循环状态
        disabled: routeItem.fullPath == '/dashboard' || routeItem.isPermanent,
        onClick: () => {
          if (routeItem.isPin) {
            tabbarStore.unPin(routeItem.tabId)
          } else {
            tabbarStore.pin(routeItem.tabId)
          }
        }
      },
      {
        label: t('app.tabbar.maximize'),
        icon: 'i-ri:picture-in-picture-exit-line',
        divided: true,
        onClick: () => {
          if (routeItem.tabId != activedTabId.value) {
            router.push(routeItem.fullPath)
          }
          tabbarMaximizeTip()
          settingsStore.setMainPageMaximize()
        }
      },
      {
        label: t('app.tabbar.closeOtherSide'),
        disabled: !checkOtherSideHasTabCanClose(routeItem.tabId),
        onClick: () => {
          onOtherSideTabClose(routeItem.tabId, routeItem.fullPath)
        }
      },
      {
        label: t('app.tabbar.closeLeftSide'),
        disabled: !checkLeftSideHasTabCanClose(routeItem.tabId),
        onClick: () => {
          onLeftSideTabClose(routeItem.tabId, routeItem.fullPath)
        }
      },
      {
        label: t('app.tabbar.closeRightSide'),
        disabled: !checkRightSideHasTabCanClose(routeItem.tabId),
        onClick: () => {
          onRightSideTabClose(routeItem.tabId, routeItem.fullPath)
        }
      }
    ]
  })
}
</script>

<template>
  <div class="tabbar-container">
    <div
      ref="tabsRef" class="tabs" :class="{
        'tabs-ontop': settingsStore.topbar.switchTabbarAndToolbar,
        [`tabs-${settingsStore.tabbar.style}`]: settingsStore.tabbar.style !== ''
      }" @wheel.prevent="handlerMouserScroll"
    >
      <transition-group ref="tabContainerRef" :name="!isDragging ? 'tabbar' : null" tag="div" class="tab-container" :class="{'dragging': isDragging}">
        <div
          v-for="element in tabbarList" :key="element.tabId"
          :ref="setTabRef" class="tab" :class="{
            'tab-ontop': settingsStore.topbar.switchTabbarAndToolbar,
            'actived': element.tabId == activedTabId,
            'no-drag': element.isPermanent || element.isPin
          }" :title="settingsStore.titleFirst && element.tabId == activedTabId ? element.title : generateI18nTitle(element.i18n, element.title)" @click="$router.push(element.fullPath)" @dblclick="settingsStore.setMainPageMaximize()" @contextmenu="onTabbarContextmenu($event, element)"
        >
          <div class="tab-dividers" />
          <div class="tab-background">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><symbol id="tab-geometry-left" viewBox="0 0 214 36"><path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z" /></symbol><symbol id="tab-geometry-right" viewBox="0 0 214 36"><use xlink:href="#tab-geometry-left" /></symbol><clipPath id="crop"><rect class="mask" width="100%" height="100%" x="0" /></clipPath></defs><svg width="52%" height="100%"><use xlink:href="#tab-geometry-left" width="214" height="36" class="tab-geometry" /></svg><g transform="scale(-1, 1)"><svg width="52%" height="100%" x="-100%" y="0"><use xlink:href="#tab-geometry-right" width="214" height="36" class="tab-geometry" /></svg></g></svg>
          </div>
          <div class="tab-content">
            <div :key="element.tabId" class="title">{{ settingsStore.titleFirst && element.tabId == activedTabId ? element.title : generateI18nTitle(element.i18n, element.title) }}</div>
            <div class="drag-handle" />
            <el-icon v-if="!element.isPermanent && element.isPin" class="action-icon" @click.stop="tabbarStore.unPin(element.tabId)">
              <svg-icon name="i-ri:pushpin-2-fill" />
            </el-icon>
            <el-icon v-else-if="!element.isPermanent && tabbarStore.list.length > 1" class="action-icon" @click.stop="onTabClose(element.tabId)">
              <svg-icon name="i-ri:close-fill" />
            </el-icon>
          </div>
        </div>
      </transition-group>
    </div>
    <div v-if="isShowMoreAction" class="more-action">
      <el-dropdown placement="bottom-end" @command="actionCommand">
        <el-icon>
          <svg-icon name="i-ri:arrow-down-s-fill" />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="other-side" :disabled="!hasTabbarOtherSideCanClose">
              <svg-icon name="i-ep:close" />
              {{ t('app.tabbar.closeOtherSide') }}
            </el-dropdown-item>
            <el-dropdown-item command="left-side" :disabled="!hasTabbarLeftSideCanClose">
              <svg-icon name="i-ep:arrow-left" />
              {{ t('app.tabbar.closeLeftSide') }}
            </el-dropdown-item>
            <el-dropdown-item command="right-side" :disabled="!hasTabbarRightSideCanClose">
              <svg-icon name="i-ep:arrow-right" />
              {{ t('app.tabbar.closeRightSide') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss">
.mx-menu-ghost-host {
  z-index: 1000;
  .mx-context-menu {
    position: fixed;
    background-color: var(--g-app-bg);
    box-shadow: var(--el-box-shadow);
    .mx-context-menu-items .mx-context-menu-item {
      transition: background-color 0.3s;
      &:not(.disabled):hover {
        cursor: pointer;
        background-color: var(--el-fill-color);
      }
      span {
        color: var(--el-text-color-primary);
      }
      .icon {
        width: 1em;
        margin-right: 10px;
        color: var(--el-text-color-primary);
      }
      &.disabled span,
      &.disabled .icon {
        color: var(--el-text-color-disabled);
      }
    }
    .mx-context-menu-item-sperator {
      background-color: var(--g-app-bg);
      &::after {
        background-color: var(--el-border-color);
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.tabbar-container {
  position: relative;
  height: var(--g-tabbar-height);
  background-color: var(--g-tabbar-bg);
  transition: background-color 0.3s;
  .tabs {
    position: absolute;
    left: 0;
    right: 0;
    padding-right: 50px;
    overflow-y: hidden;
    white-space: nowrap;
    // firefox隐藏滚动条
    scrollbar-width: none;
    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }
    &.tabs-ontop {
      top: 0;
      bottom: inherit;
    }
    .tab-container {
      display: inline-block;
      &:not(.dragging) {
        .tab {
          &:not(.actived):hover {
            z-index: 3;
            &::before,
            &::after {
              content: none;
            }
            .tab-content {
              .title,
              .action-icon {
                color: var(--g-tabbar-tab-hover-color);
              }
            }
          }
        }
      }
      .tab {
        position: relative;
        display: inline-block;
        width: 150px;
        height: 40px;
        line-height: 38px;
        vertical-align: bottom;
        font-size: 14px;
        cursor: pointer;
        pointer-events: none;
        * {
          user-select: none;
        }
        &:last-child {
          margin-right: 30px;
        }
        &.actived {
          z-index: 5;
          &::before,
          &::after {
            content: none;
          }
          .tab-content {
            .title,
            .action-icon {
              color: var(--g-tabbar-tab-active-color);
            }
          }
        }
        &.tab-ghost {
          opacity: 0 !important;
        }
        .tab-dividers {
          position: absolute;
          z-index: 0;
          height: 14px;
          top: 50%;
          left: 0;
          right: 0;
          margin-top: -7px;
          &::before {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 1px;
            bottom: 0;
            width: 1px;
            opacity: 1;
            background-color: var(--g-tabbar-dividers-bg);
            transition: opacity 0.2s ease, background-color 0.3s;
          }
        }
        &:first-child .tab-dividers::before {
          opacity: 0;
        }
        .tab-background {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          svg {
            display: none;
          }
        }
        .tab-content {
          position: absolute;
          z-index: 5;
          left: 0;
          right: 0;
          height: 100%;
          display: flex;
          pointer-events: all;
          .title {
            position: absolute;
            height: 100%;
            left: 12px;
            right: 28px;
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 24px), transparent);
            mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 24px), transparent);
            color: var(--g-tabbar-tab-color);
            transition: var(--el-transition-color);
          }
          .drag-handle {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }
          .action-icon {
            position: absolute;
            top: 50%;
            right: 6px;
            margin-top: -9px;
            width: 1.5em;
            height: 1.5em;
            border-radius: 50%;
            font-size: 12px;
            color: var(--g-tabbar-tab-color);
            transition: var(--el-transition-color);
            &:hover {
              background-color: var(--el-fill-color);
            }
          }
        }
      }
    }
    &.tabs-fashion {
      bottom: -1px;
      .tab-container {
        &:not(.dragging) {
          .tab:not(.actived):hover {
            & + .tab .tab-dividers::before {
              opacity: 0;
            }
            .tab-background {
              opacity: 1;
            }
            .tab-background > svg .tab-geometry {
              fill: var(--g-tabbar-tab-hover-bg);
            }
          }
        }
        .tab {
          height: 34px;
          line-height: 32px;
          margin-right: -20px;
          .tab-dividers {
            left: 8px;
            right: 8px;
          }
          &.tab-ontop .tab-background {
            transform: rotate(180deg);
          }
          &:not(.actived) .tab-background {
            opacity: 0;
            > svg .tab-geometry {
              transition: fill 0.3s;
            }
          }
          .tab-background {
            top: -1px;
            transition: opacity 0.3s;
            svg {
              display: block;
              width: 100%;
              height: 100%;
              .tab-geometry {
                fill: var(--g-tabbar-tab-hover-bg);
                transition: fill 0.3s;
              }
            }
          }
          &.actived {
            & + .tab .tab-dividers::before {
              opacity: 0;
            }
            .tab-background {
              opacity: 1;
            }
            .tab-background > svg .tab-geometry {
              fill: var(--g-tabbar-tab-active-bg);
            }
          }
          .tab-content {
            .title {
              left: 20px;
              right: 36px;
            }
            .drag-handle {
              left: 8px;
              right: 8px;
            }
            .action-icon {
              right: 18px;
            }
          }
        }
      }
    }
    &.tabs-card {
      .tab-container {
        &:not(.dragging) {
          .tab:not(.actived):hover {
            .tab-background {
              background-color: var(--g-tabbar-tab-hover-bg);
            }
          }
        }
        .tab {
          height: 30px;
          line-height: 28px;
          margin-top: 5px;
          margin-left: 5px;
          .tab-dividers {
            display: none;
          }
          .tab-background {
            border-radius: 5px;
            transition: background-color 0.3s;
          }
          &.actived {
            .tab-background {
              background-color: var(--g-tabbar-tab-active-bg);
            }
          }
        }
      }
    }
    &.tabs-square {
      .tab-container {
        &:not(.dragging) {
          .tab:not(.actived):hover {
            & + .tab .tab-dividers::before {
              opacity: 0;
            }
            .tab-background {
              &::before {
                height: 100%;
                background-color: var(--g-tabbar-tab-hover-bg);
              }
            }
          }
        }
        .tab {
          .tab-dividers {
            left: -1px;
            right: -1px;
          }
          &.tab-ontop .tab-background {
            transform: rotateX(180deg);
          }
          .tab-background {
            &::before {
              content: "";
              transition: background-color 0.3s;
              position: absolute;
              width: 100%;
              height: 0;
              bottom: 0;
            }
            &::after {
              content: "";
              transition: transform 0.3s;
              position: absolute;
              width: 100%;
              height: 2px;
              left: 0;
              bottom: 0;
              background-color: var(--g-theme-color);
              transform: scaleX(0);
              transform-origin: bottom right;
            }
          }
          &.actived {
            & + .tab .tab-dividers::before {
              opacity: 0;
            }
            .tab-background {
              &::before {
                height: calc(100% - 2px);
                bottom: 2px;
                background-color: var(--g-tabbar-tab-active-bg);
              }
              &::after {
                transform: scaleX(1);
                transform-origin: bottom left;
              }
            }
          }
        }
      }
    }
  }
  .more-action {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    height: 100%;
    width: 50px;
    padding-left: 15px;
    background-image: linear-gradient(to right, transparent, var(--g-tabbar-bg));
    .el-icon {
      width: 1.5em;
      height: 1.5em;
      border-radius: 5px;
      font-size: 16px;
      color: var(--el-text-color-primary);
      background-color: var(--g-app-bg);
      box-shadow: var(--el-box-shadow-light);
      transition: background-color 0.3s, var(--el-transition-color), var(--el-transition-box-shadow);
      cursor: pointer;
    }
  }
}
// 标签栏动画
.tabs {
  .tabbar-enter-from,
  .tabbar-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  &.tabs-ontop {
    .tabbar-enter-from,
    .tabbar-leave-to {
      opacity: 0;
      transform: translateY(-30px);
    }
  }
  .tabbar-enter-active {
    transition: all 0.3s;
  }
  .tabbar-leave-active {
    position: absolute !important;
    transition: all 0.3s;
  }
  .tabbar-move {
    transition: transform 0.3s;
  }
}
</style>
