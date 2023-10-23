const Layout = () => import('@/layout/fullLayout.vue')

export default {
  path: '/report',
  component: Layout,
  redirect: '/report/unlistedEnterprise',
  name: 'report',
  meta: {
    title: '图表管理',
    icon: 'carbon:cloud-service-management',
    whiteList: true,
    sidebar: false
  },
  children: [
    {
      path: 'unlistedEnterprise',
      name: 'unlistedEnterprise',
      component: () => import('@/views/reportChartTemplate/unlistedEnterprise.vue'),
      meta: {
        whiteList: true,
        title: '非上市企业报告图表模版'
      }
    }
  ]
}
