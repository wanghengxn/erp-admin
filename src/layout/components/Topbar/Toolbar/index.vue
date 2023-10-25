<script setup name="Toolbar">
import { compile } from 'path-to-regexp'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'
import Tools from '../../Tools/index.vue'

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const generateI18nTitle = inject('generateI18nTitle')

const enableSidebarCollapse = computed(() => {
  return settingsStore.mode === 'mobile' || (
    ['side', 'head', 'single'].includes(settingsStore.menu.menuMode) &&
    settingsStore.toolbar.enableSidebarCollapse &&
    !(
      settingsStore.menu.subMenuOnlyOneHide &&
      menuStore.sidebarMenus.length === 1 &&
      (
        !menuStore.sidebarMenus[0].children ||
        menuStore.sidebarMenus[0]?.children.every(item => item.meta.sidebar === false)
      )
    )
  )
})

const breadcrumbList = computed(() => {
  let breadcrumbList = []
  if (settingsStore.dashboard.enable) {
    breadcrumbList.push({
      path: '/dashboard',
      title: settingsStore.dashboard.title,
      i18n: 'route.dashboard'
    })
  }
  if (route.meta.breadcrumbNeste) {
    breadcrumbList.push(...route.meta.breadcrumbNeste.filter(item => item.hide === false))
  }
  return breadcrumbList
})

function pathCompile(path) {
  let toPath = compile(path)
  return toPath(route.params)
}
</script>

<template>
  <div class="toolbar-container">
    <div class="left-box">
      <div v-if="enableSidebarCollapse" class="sidebar-collapse" :class="{'is-collapse': settingsStore.menu.subMenuCollapse}" @click="settingsStore.toggleSidebarCollapse()">
        <el-icon>
          <svg-icon name="toolbar-collapse" />
        </el-icon>
      </div>
      <el-breadcrumb
        v-if="settingsStore.breadcrumb.enable && settingsStore.mode === 'pc' && settingsStore.app.routeBaseOn !== 'filesystem'" class="breadcrumb" :class="{
          [`breadcrumb-${settingsStore.breadcrumb.style}`]: settingsStore.breadcrumb.style !== ''
        }"
      >
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path" :to="index < breadcrumbList.length - 1 ? pathCompile(item.path) : ''">
            {{
              index < breadcrumbList.length - 1 ?
                generateI18nTitle(item.i18n, item.title) :
                settingsStore.titleFirst ? settingsStore.title : generateI18nTitle(item.i18n, item.title)
            }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <Tools />
  </div>
</template>

<style lang="scss" scoped>
.toolbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--g-toolbar-height);
  background-color: var(--g-toolbar-bg);
  box-shadow: 0 0 1px 0 var(--el-border-color);
  transition: background-color 0.3s, var(--el-transition-box-shadow);
  .left-box {
    display: flex;
    align-items: center;
    padding-right: 50px;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);
    mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);
    .sidebar-collapse {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 50px;
      cursor: pointer;
      .el-icon {
        color: var(--el-text-color-primary);
        transition: var(--el-transition-color), var(--el-transition-md-fade);
      }
      &:hover .el-icon {
        color: var(--el-color-primary);
      }
      &.is-collapse .el-icon {
        transform: rotateZ(-180deg);
      }
      & + .el-breadcrumb {
        margin-left: 0;
      }
    }
    .breadcrumb {
      margin-left: 20px;
      white-space: nowrap;
      :deep(.el-breadcrumb__item) {
        display: inline-block;
        float: none;
        span {
          font-weight: normal;
        }
        &:last-child .el-breadcrumb__inner {
          color: var(--el-text-color-secondary);
          transition: var(--el-transition-color);
        }
      }
      &.breadcrumb-modern {
        :deep(.el-breadcrumb__item) {
          .el-breadcrumb__inner {
            display: inline-block;
            background-color: var(--el-fill-color);
            transition: background-color 0.3s, var(--el-transition-color);
            padding: 8px 16px;
            clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%);
            &:hover {
              background-color: var(--el-fill-color-darker);
            }
          }
          &:first-child:not(:last-child) .el-breadcrumb__inner {
            padding-left: 12px;
            border-radius: 6px 0 0 6px;
            clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
          }
          &:last-child:not(:first-child) .el-breadcrumb__inner {
            background-color: var(--el-fill-color-darker);
            padding-right: 12px;
            border-radius: 0 6px 6px 0;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%);
          }
          &:first-child:is(:last-child) .el-breadcrumb__inner {
            background-color: var(--el-fill-color-darker);
            padding-left: 12px;
            border-radius: 6px 0 0 6px;
            clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
          }
          .el-breadcrumb__separator {
            display: none;
          }
        }
      }
    }
  }
}
// 面包屑动画
.breadcrumb-enter-active {
  transition: transform 0.3s, opacity 0.3s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(30px) skewX(-50deg);
}
</style>
