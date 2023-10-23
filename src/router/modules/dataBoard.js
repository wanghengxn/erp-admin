const Layout = () => import('@/layout/index.vue')

export default {
  path: '/dataBoard',
  component: Layout,
  redirect: '/dataBoard/dashboard',
  name: 'dataBoard',
  meta: {
    title: '数据中台',
    icon: 'carbon:data-center'
  },
  children: [
    {
      path: 'dashboard',
      name: 'dataDashboard',
      component: () => import('@/views/dataBoard/dashboard/index.vue'),
      meta: {
        title: '数据面板'
      },
      children: [
        {
          path: 'editDataBox',
          name: 'editDataBox',
          component: () => import('@/views/dataBoard/dashboard/editDataBox/index.vue'),
          meta: {
            title: '数据修改箱',
            sidebar: false
          }
        },
        {
          path: 'indexDegree',
          name: 'indexDegree',
          component: () => import('@/views/dataBoard/dashboard/indexDegree/index.vue'),
          meta: {
            title: '指标完整度',
            sidebar: false
          }
        }
      ]
    },
    {
      path: 'dataList',
      name: 'dataList',
      component: () => import('@/views/dataBoard/dataList/index.vue'),
      meta: {
        title: '数据字典',
        cache: ['editData']
      },
      children: [
        {
          path: 'historyData',
          name: 'historyData',
          component: () => import('@/views/dataBoard/dataList/history/index.vue'),
          meta: {
            title: '历史数据',
            sidebar: false
          }
        },
        {
          path: 'editData',
          name: 'editData',
          component: () => import('@/views/dataBoard/dataList/editData/index.vue'),
          meta: {
            title: '数据修改',
            sidebar: false
          }
        }
      ]
    },
    {
      path: 'dataMaintain',
      name: 'dataMaintain',
      component: () => import('@/views/dataBoard/dataMaintain/index.vue'),
      meta: {
        title: '数据运维'
      },
      children: [
        {
          path: 'uploadRecord',
          name: 'uploadRecord',
          component: () => import('@/views/dataBoard/dataMaintain/uploadRecord/index.vue'),
          meta: {
            title: '查看上传记录',
            sidebar: false
          }
        }
      ]
    }
  ]
}
