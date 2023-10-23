const Layout = () => import('@/layout/index.vue')

export default {
  path: '/audit',
  component: Layout,
  redirect: '/audit/list',
  name: 'auditManagement',
  meta: {
    title: '审核管理',
    icon: 'ant-design:audit-outlined'
  },
  children: [
    {
      path: 'list',
      name: 'auditList',
      component: () => import('@/views/auditManagement/index.vue'),
      meta: {
        title: '审核列表'
      }
    }
  ]
}
