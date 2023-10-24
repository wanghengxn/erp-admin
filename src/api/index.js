import axios from 'axios'
import qs from 'qs'
import router from '@/router/index'
import useUserStore from '@/store/modules/user'
import { ElMessageBox, ElMessage } from 'element-plus'
import storage from '@/util/storage'
import { isString } from 'lodash-es'

let confirmErrorFlag = false
const toLogin = () => {
  useUserStore().logout().then(() => {
    router.push({
      name: 'login',
      query: {
        redirect: router.currentRoute.value.path !== '/login' ? router.currentRoute.value.fullPath : undefined
      }
    })
  })
}

const api = axios.create({
  baseURL: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 50000,
  responseType: 'json'
})

api.interceptors.request.use(
  request => {
    const userStore = useUserStore()
    /**
         * 全局拦截请求发送前提交的参数
         * 以下代码为示例，在请求头里带上 token 信息
         */
    if (userStore.isLogin) {
      request.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    if (request.method === 'get') {
      for (const i in request.params) {
        if (request.params[i] === '') {
          delete request.params[i]
        }
      }
    }
    // 是否将 POST 请求参数进行字符串化处理
    // if (request.method === 'post' && !isString(request.data)) {
    //   request.data = qs.stringify(request.data, {
    //     arrayFormat: 'brackets'
    //   })
    // }
    return request
  }
)

api.interceptors.response.use(
  response => {
    const res = response.data
    const status = response.status
    const statusArr = [200, 201, 202, 203, 204]
    // const EXPORT_ARR = ['/api/admin/users/export', '/api/admin/enterprise/model-input-indicators/export', '/api/admin/enterprise/model-input-indicators/draft/export', '/api/admin/upload/template', '/api/admin/data-dicts/async/get', '/api/admin/enterprise/sum-main-rulers/export', '/api/admin/enterprise/main-rulers/export', '/api/admin/indicators/export', '/api/admin/industry/model-input-indicators/draft/export', '/api/admin/industry/model-input-indicators/export']
    // const exportIndex = EXPORT_ARR.findIndex(item => response.config.url.match(item))
    if (response.config.responseType === 'blob') {
      const fileName = response.headers['content-disposition'] && response.headers['content-disposition'].split('=')[1].replace(/utf-8''/g, '')
      return Promise.resolve({ data: res, fileName: decodeURIComponent(fileName) })
    } else if (statusArr.indexOf(status) > -1) {
      // 把对象精简到data
      return Promise.resolve(res.data)
    } else {
      toLogin()
    }
  },
  error => {
    if (error.response.status !== 401) {
      const NOT_TIPS_ARR = ['/api/sso/authenticate']
      const notTipsIndex = NOT_TIPS_ARR.findIndex(item => error.response.config.url.includes(item))
      if (notTipsIndex === -1) {
        ElMessage.closeAll()
        ElMessage({
          message:
            error.response.data.errorMsg ||
            error.response.data.error ||
            '请求失败',
          type: 'error',
          duration: 5 * 1000
        })
      }
    }

    if (error.response.status === 401 && !confirmErrorFlag) {
      confirmErrorFlag = true
      ElMessage.closeAll()
      ElMessageBox.confirm('登录失效', '温馨提示')
        .then(() => {
          storage.local.remove('token')
          location.reload()
        })
        .catch(() => {
          storage.local.remove('token')
          location.reload()
        })
      setTimeout(() => {
        confirmErrorFlag = false
      }, 5100)
    }
    return Promise.reject(error)
  }
)

export default api
