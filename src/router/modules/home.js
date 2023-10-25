const Layout = () => import('@/layout/index.vue')

export default {
  path: '/home',
  component: Layout,
  redirect: '/home',
  name: 'home',
  meta: {
    title: '首页'
  },
  children: [

    {
      path: 'homePage',
      name: 'homePage',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '首页'
      }
    }
  ]
}
