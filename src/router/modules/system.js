const Layout = () => import('@/layout/index.vue')

export default {
  path: '/system',
  component: Layout,
  redirect: '/system/accountList',
  name: 'systemManagement',
  meta: {
    title: '系统管理',
    icon: 'eos-icons:system-ok-outlined'
  },
  children: [
    {
      path: 'accountList',
      name: 'accountList',
      component: () => import('@/views/systemManagement/account/index.vue'),
      meta: {
        title: '账号管理'
      }
    }
    // {
    //   path: 'roleList',
    //   name: 'roleList',
    //   component: () => import('@/views/systemManagement/role/index.vue'),
    //   meta: {
    //     title: '角色管理'
    //   }
    // }
  ]
}
