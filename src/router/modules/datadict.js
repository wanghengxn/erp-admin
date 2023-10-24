const Layout = () => import('@/layout/index.vue')

export default {
  path: '/dataDict',
  component: Layout,
  redirect: '/dataDict/list',
  name: ' dataDict',
  meta: {
    title: '数据字典'
  },
  children: [
    {
      path: 'list',
      name: 'list',
      component: () => import('@/views/dataDict/index.vue'),
      meta: {
        title: '数据字典'
      }
    }
  ]
}
