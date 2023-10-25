import watermark from './watermark'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'

function useWatermark() {
  const settingsStore = useSettingsStore()
  const userStore = useUserStore()

  watch(() => settingsStore.app.enableWatermark, val => {
    if (val) {
      loadWatermark()
    } else {
      removeWatermark()
    }
  }, {
    immediate: true
  })

  watch(() => settingsStore.app.colorScheme, () => {
    if (settingsStore.app.enableWatermark) {
      removeWatermark()
      loadWatermark()
    }
  })

  function loadWatermark() {
    // 水印更多设置请查看 https://github.com/saucxs/watermark-dom
    watermark.init({
      watermark_txt: `Fantastic-admin 水印测试 ${userStore.account}`,
      watermark_width: 150,
      watermark_x: 0,
      watermark_y: 0,
      watermark_x_space: 50,
      watermark_y_space: 50,
      watermark_alpha: 0.1,
      watermark_color: settingsStore.app.colorScheme === 'light' ? 'black' : 'white'
    })
  }

  function removeWatermark() {
    try {
      watermark.remove()
    } catch (err) {
      // 忽略报错
    }
  }

  return {
    loadWatermark,
    removeWatermark
  }
}

export default useWatermark
