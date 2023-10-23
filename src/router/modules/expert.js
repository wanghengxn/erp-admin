const Layout = () => import('@/layout/index.vue')

export default {
  path: '/expert',
  component: Layout,
  redirect: '/expert/expertList',
  name: 'expertManagement',
  meta: {
    title: '专家报告管理',
    icon: 'grommet-icons:user-expert'
  },
  children: [
    {
      path: 'expertList',
      name: 'expertList',
      component: () => import('@/views/expertManagement/index.vue'),
      meta: {
        title: '专家管理'
      }
    },
    {
      path: 'reportApplyList',
      name: 'reportApplyList',
      component: () => import('@/views/expertManagement/reportApplyList/index.vue'),
      meta: {
        title: '报告申请列表'
      }
    }
  ]
}
