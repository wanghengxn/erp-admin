import router from '@/router'
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'

function useTabbar() {
  const settingsStore = useSettingsStore()
  const tabbarStore = useTabbarStore()

  function getId() {
    return settingsStore.tabbar.mergeTabs ? (router.currentRoute.value.meta.activeMenu || router.currentRoute.value.fullPath) : router.currentRoute.value.fullPath
  }

  function closeById(tabId) {
    let activedTabId = getId()
    // 如果关闭的标签正好是当前路由，并且标签栏数目大于 1
    if (tabId == activedTabId && tabbarStore.list.length > 1) {
      let index = ~~Object.keys(tabbarStore.list).find(i => {
        return tabbarStore.list[i].tabId == tabId
      })
      if (index < tabbarStore.list.length - 1) {
        router.push(tabbarStore.list[index + 1].fullPath)
      } else {
        router.push(tabbarStore.list[index - 1].fullPath)
      }
    }
    if (tabbarStore.list.length > 1) {
      tabbarStore.remove(tabId)
    } else {
      ElMessage.error('当前只有一个标签页，已阻止关闭')
    }
  }
  function close(to) {
    let tabId = getId()
    tabbarStore.remove(tabId)
    router.push(to)
  }

  return {
    getId,
    closeById,
    close
  }
}

export default useTabbar
