<script setup name="MainSidebar">
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'
import Logo from '../Logo/index.vue'
import SidebarItem from '../SidebarItem/index.vue'
import { useMenu } from '@/util/composables'

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const generateI18nTitle = inject('generateI18nTitle')
</script>

<template>
  <transition name="main-sidebar">
    <div v-if="['side', 'only-side'].includes(settingsStore.menu.menuMode) || (settingsStore.mode === 'mobile' && settingsStore.menu.menuMode !== 'single')" class="main-sidebar-container">
      <Logo :show-title="false" class="sidebar-logo" />
      <!-- 侧边栏模式（含主导航） -->
      <div
        v-if="settingsStore.menu.menuMode === 'side' || (settingsStore.mode === 'mobile' && settingsStore.menu.menuMode !== 'single')" class="nav" :class="{
          [`nav-fill-${settingsStore.menu.menuFillStyle}`]: settingsStore.menu.menuFillStyle !== '',
          [`nav-active-${settingsStore.menu.menuActiveStyle}`]: settingsStore.menu.menuActiveStyle !== ''
        }"
      >
        <template v-for="(item, index) in menuStore.allMenus" :key="index">
          <div v-if="item.children && item.children.length !== 0" class="item-container" :class="{'active': index == menuStore.actived}">
            <div class="item" :title="generateI18nTitle(item.meta.i18n, item.meta.title)" @click="useMenu().switchTo(index)">
              <el-icon v-if="item.meta.icon">
                <svg-icon :name="item.meta.icon" />
              </el-icon>
              <span>{{ generateI18nTitle(item.meta.i18n, item.meta.title) }}</span>
            </div>
          </div>
        </template>
      </div>
      <!-- 侧边栏精简模式 -->
      <el-menu
        v-else-if="settingsStore.menu.menuMode === 'only-side'" collapse :default-active="$route.meta.activeMenu || $route.path" class="el-menu-nav" :class="{
          [`nav-fill-${settingsStore.menu.menuFillStyle}`]: settingsStore.menu.menuFillStyle !== '',
          [`nav-active-${settingsStore.menu.menuActiveStyle}`]: settingsStore.menu.menuActiveStyle !== ''
        }"
      >
        <template v-for="(route, index) in menuStore.allMenus">
          <SidebarItem v-if="route.meta.sidebar !== false" :key="index" :item="route" />
        </template>
      </el-menu>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.main-sidebar-container {
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  // firefox隐藏滚动条
  scrollbar-width: none;
  // chrome隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }

  position: relative;
  z-index: 1;
  width: var(--g-main-sidebar-width);
  color: var(--g-main-sidebar-menu-color);
  background-color: var(--g-main-sidebar-bg);
  transition: background-color 0.3s, var(--el-transition-color);
  .sidebar-logo {
    background-color: var(--g-main-sidebar-bg);
    transition: background-color 0.3s;
  }
  .nav-fill {
    &-radius {
      .item-container {
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
        .item {
          border-radius: 5px;
          margin: 0 10px;
        }
      }
      .sidebar-item {
        margin-bottom: 5px;
        &:last-child {
          margin-right: 0;
        }
        :deep(.el-sub-menu__title .item) {
          border-radius: 5px;
          margin: 0 10px;
        }
      }
    }
  }
  .nav-active {
    &-arrow {
      .item-container::before,
      .sidebar-item :deep(.el-sub-menu__title::before) {
        content: "";
        opacity: 0;
        right: -5px;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-right: 5px solid var(--g-sub-sidebar-bg);
        transition: all 0.3s;
        @include position-center(y);
      }
      .item-container.active::before,
      .sidebar-item :deep(.is-active .el-sub-menu__title::before) {
        opacity: 1;
        right: 0;
      }
    }
    &-line {
      .item-container::before,
      .sidebar-item :deep(.el-sub-menu__title::before) {
        content: "";
        opacity: 0;
        left: 8px;
        width: 4px;
        height: 0;
        border-radius: 2px;
        background-color: var(--g-main-sidebar-menu-active-bg);
        box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
        transition: all 0.3s;
        @include position-center(y);
      }
      .item-container.active::before,
      .sidebar-item :deep(.is-active .el-sub-menu__title::before) {
        opacity: 1;
        height: 20px;
      }
    }
    &-dot {
      .item-container::before,
      .sidebar-item :deep(.el-sub-menu__title::before) {
        content: "";
        opacity: 0;
        left: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--g-main-sidebar-menu-active-bg);
        box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
        transition: all 0.3s;
        @include position-center(y);
      }
      .item-container.active::before,
      .sidebar-item :deep(.is-active .el-sub-menu__title::before) {
        opacity: 1;
        left: 5px;
      }
    }
  }
  .nav {
    width: inherit;
    padding-top: var(--g-sidebar-logo-height);
    .item-container {
      position: relative;
      display: flex;
      transition: var(--el-transition-all);
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 60px;
        padding: 0 5px;
        cursor: pointer;
        color: var(--g-main-sidebar-menu-color);
        background-color: var(--g-main-sidebar-bg);
        transition: var(--el-transition-all), background-color 0.3s, var(--el-transition-color);
        &:hover {
          color: var(--g-main-sidebar-menu-hover-color);
          background-color: var(--g-main-sidebar-menu-hover-bg);
        }
        .el-icon {
          font-size: 24px;
        }
        span {
          font-size: 14px;
          text-align: center;
          word-break: break-all;
          @include text-overflow(1, false);
        }
      }
      &.active .item {
        color: var(--g-main-sidebar-menu-active-color);
        background-color: var(--g-main-sidebar-menu-active-bg);
      }
    }
  }
  .el-menu-nav {
    padding-top: var(--g-sidebar-logo-height);
    border-right: none;
    width: initial;
    background-color: var(--g-main-sidebar-bg);
    transition: background-color 0.3s;
    .sidebar-item {
      transition: all 0.3s;
    }
    :deep(.el-sub-menu.is-active) {
      .el-sub-menu__title {
        background-color: initial !important;
        .item {
          color: var(--g-main-sidebar-menu-active-color) !important;
          background-color: var(--g-main-sidebar-menu-active-bg) !important;
        }
      }
    }
    :deep(.el-sub-menu__title) {
      padding: 0;
      height: initial;
      &:hover {
        background-color: initial !important;
      }
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        width: 100%;
        height: 60px;
        line-height: initial;
        padding: 0 5px !important;
        color: var(--g-main-sidebar-menu-color) !important;
        transition: all 0.3s;
        &:hover {
          color: var(--g-main-sidebar-menu-hover-color) !important;
          background-color: var(--g-main-sidebar-menu-hover-bg) !important;
          .el-icon {
            transform: scale(1);
          }
        }
        .el-icon {
          margin: 0 auto;
          font-size: 24px;
          vertical-align: middle;
          color: inherit;
        }
        .title {
          flex: initial;
          margin: initial;
          height: initial;
          line-height: initial;
          text-align: center;
          font-size: 14px;
          word-break: break-all;
          white-space: initial;
          @include text-overflow(1, false);
        }
      }
      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }
}
// 主侧边栏动画
.main-sidebar-enter-active,
.main-sidebar-leave-active {
  transition: 0.3s;
}
.main-sidebar-enter-from,
.main-sidebar-leave-to {
  transform: translateX(calc(var(--g-main-sidebar-width) * -1));
}
</style>
