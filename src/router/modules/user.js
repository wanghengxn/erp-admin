const Layout = () => import('@/layout/index.vue')

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/list',
  name: 'userManagement',
  meta: {
    title: '用户管理',
    icon: 'ph:folder-simple-user'
  },
  children: [
    {
      path: 'list',
      name: 'userList',
      component: () => import('@/views/userManagement/index.vue'),
      meta: {
        title: '用户列表'
      }
    }
  ]
}
