import router from '@/router'
import useSettingsStore from '@/store/modules/settings'

function useMainPage() {
  const settingsStore = useSettingsStore()

  function reload() {
    router.push({
      name: 'reload'
    })
  }

  function maximize(status) {
    settingsStore.setMainPageMaximize(status)
  }

  return {
    reload,
    maximize
  }
}

export default useMainPage
