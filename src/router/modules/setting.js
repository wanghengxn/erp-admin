const Layout = () => import('@/layout/index.vue')

export default {
  path: '/Settings',
  component: Layout,
  redirect: '/Settings/AccountSets',
  name: 'Settings',
  meta: {
    title: '设置'
  },
  children: [
    {
      path: 'AccountSets',
      name: 'AccountSets',
      component: () => import('@/views/settings/accountSets/index.vue'),
      meta: {
        title: '帐套'
      }
    },
    {
      path: 'AccountSubject',
      name: 'AccountSubject',
      component: () => import('@/views/settings/accountSubject/index.vue'),
      meta: {
        title: '科目'
      }
    },
    {
      path: 'InitialBalance1',
      name: 'InitialBalance1',
      component: () => import('@/views/settings/initialBalance1/index.vue'),
      meta: {
        title: '期初'
      }
    },
    {
      path: 'Currency',
      name: 'Currency',
      component: () => import('@/views/settings/currency/index.vue'),
      meta: {
        title: '币别'
      }
    }
  ]
}
