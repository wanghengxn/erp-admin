import storage from '@/util/storage'
import { login, getUserInfo, updatePwd } from '@/api/auth'

import useTabbarStore from './tabbar'
import useRouteStore from './route'
import useMenuStore from './menu'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  {
    state: () => ({
      selectedAccountSet: storage.local.getJson('selectedAccountSet'),
      account: storage.local.get('account') || '',
      token: storage.local.get('token') || '',
      permissions: [],
      userAccountSets: storage.local.getJson('userAccountSets') || []
    }),
    getters: {
      isLogin: state => {
        return !!state.token
      },
      // 是否选择了帐套
      isSelectedAccountSet: state => {
        return !!state.selectedAccountSet
      },
      getMyAccountSets: state => {
        console.log(state.userAccountSets)
        return () => {
          return state.userAccountSets.map(item => { return { value: item.accountSetCode, label: item.accountSetName } })
        }
      }
    },
    actions: {
      login(data) {
        return new Promise((resolve, reject) => {
          login(data).then(res => {
            storage.local.set('token', res.id_token)
            this.token = res.id_token
            this.getUserInfo().then(() => {
              resolve()
            })
          }).catch(error => {
            reject(error)
          })
        })
      },
      // loginByCode(data) {
      //   return new Promise((resolve, reject) => {
      //     loginByEmsCode(data).then(res => {
      //       storage.local.set('token', res.id_token)
      //       this.token = res.id_token
      //       this.getUserInfo().then(() => {
      //         resolve()
      //       })
      //     }).catch(error => {
      //       reject(error)
      //     })
      //   })
      // },
      getUserInfo() {
        return new Promise((resolve, reject) => {
          getUserInfo().then(res => {
            storage.local.set('userInfo', res)
            storage.local.set('account', res.name)
            storage.local.setJson('selectedAccountSet', res.selectedAccountSet)
            storage.local.setJson('userAccountSets', res.accountSets)
            this.account = res.name
            this.selectedAccountSet = res.selectedAccountSet
            this.userAccountSets = res.accountSets
            // console.log('this.userAccountSets:', this.userAccountSets)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      logout() {
        return new Promise(resolve => {
          const tabbarStore = useTabbarStore()
          const routeStore = useRouteStore()
          const menuStore = useMenuStore()
          storage.local.remove('account')
          storage.local.remove('token')
          storage.local.remove('selectedAccountSet')
          storage.local.remove('failure_time')
          this.account = ''
          this.token = ''
          this.failure_time = ''
          this.permissions = []
          tabbarStore.clean()
          routeStore.removeRoutes()
          menuStore.setActived(0)
          resolve()
        })
      },
      // 获取我的权限
      getPermissions() {
        return new Promise(resolve => {
          resolve()
        })
      },
      editPassword(data) {
        return new Promise(resolve => {
          updatePwd(data).then(_ => {
            resolve()
          })
          
        })
      }
    }
  }
)

export default useUserStore
