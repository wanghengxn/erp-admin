const Layout = () => import('@/layout/index.vue')

export default {
  path: '/model',
  component: Layout,
  redirect: '/model/evaluationModel/dataDictionary',
  name: 'modelManagement',
  meta: {
    title: '模型管理',
    icon: 'fluent-mdl2:modeling-view'
  },
  children: [
    {
      path: 'evaluationModel',
      name: 'evaluationModel',
      redirect: 'dataDictionary',
      meta: {
        title: '评估模型管理'
      },
      children: [
        {
          path: 'dataDictionary',
          name: 'dataDictionary',
          component: () => import('@/views/modelManagement/dataDictionary/index.vue'),
          meta: {
            title: 'ESG底层指标库管理'
          }
        },
        {
          path: 'listedModel',
          name: 'listedModel',
          redirect: 'moldingIndex',
          meta: {
            title: '上市企业评级模型'
          },
          children: [
            {
              path: 'moldingIndex',
              name: 'moldingIndex',
              component: () => import('@/views/modelManagement/moldingIndex/index.vue'),
              meta: {
                title: '入模指标管理'
              }
              // children: [
              //   {
              //     path: 'enterprise',
              //     name: 'enterpriseModel',
              //     component: () => import('@/views/modelManagement/moldingIndex/enterprise/index.vue'),
              //     meta: {
              //       title: '企业'
              //     }
              //   },
              //   {
              //     path: 'industry',
              //     name: 'industryModel',
              //     component: () => import('@/views/modelManagement/moldingIndex/industry/index.vue'),
              //     meta: {
              //       title: '行业'
              //     }
              //   }
              // ]
            },
            {
              path: 'modelWeight',
              name: 'modelWeight',
              component: () => import('@/views/modelManagement/modelWeight/index.vue'),
              meta: {
                title: '模型权重'
              }
              // children: [
              //   {
              //     path: 'enterpriseModelWeight',
              //     name: 'enterpriseModelWeight',
              //     component: () => import('@/views/modelManagement/modelWeight/enterpriseModelWeight/index.vue'),
              //     meta: {
              //       title: '企业'
              //     }
              //   },
              //   {
              //     path: 'industryModelWeight',
              //     name: 'industryModelWeight',
              //     component: () => import('@/views/modelManagement/modelWeight/industryModelWeight/index.vue'),
              //     meta: {
              //       title: '行业'
              //     }
              //   },
              //   {
              //     path: 'comprehensiveModelWeight',
              //     name: 'comprehensiveModelWeight',
              //     component: () => import('@/views/modelManagement/modelWeight/comprehensiveModelWeight/index.vue'),
              //     meta: {
              //       title: '综合'
              //     }
              //   }
              // ]
            },
            {
              path: 'mainScale',
              name: 'mainScale',
              component: () => import('@/views/modelManagement/mainScale/index.vue'),
              meta: {
                title: '主标尺管理'
              }
              // children: [
              // {
              //   path: 'enterpriseMainScale',
              //   name: 'enterpriseMainScale',
              //   component: () => import('@/views/modelManagement/mainScale/enterprise/index.vue'),
              //   meta: {
              //     title: '企业'
              //   }
              // },
              // {
              //   path: 'industryMainScale',
              //   name: 'industryMainScale',
              //   component: () => import('@/views/modelManagement/mainScale/industry/index.vue'),
              //   meta: {
              //     title: '行业评估模型主标尺管理'
              //   }
              // },
              // {
              //   path: 'comprehensiveMainScale',
              //   name: 'comprehensiveMainScale',
              //   component: () => import('@/views/modelManagement/mainScale/comprehensive/index.vue'),
              //   meta: {
              //     title: '综合'
              //   }
              // }
              // ]
            }
          ]
        }
        // 第一期暂时不做
        // {
        //   path: 'calculationMethod',
        //   name: 'calculationMethod',
        //   component: () => import('@/views/modelManagement/calculationMethod/index.vue'),
        //   meta: {
        //     title: '指标计算方法管理'
        //   }
        // },
        // {
        //   path: 'warningModel',
        //   name: 'warningModel',
        //   redirect: 'score',
        //   meta: {
        //     title: '预警模型'
        //   },
        //   children: [
        //     {
        //       path: 'score',
        //       name: 'score',
        //       component: () => import('@/views/modelManagement/warningModel/score/index.vue'),
        //       meta: {
        //         title: '赋分管理'
        //       }
        //     },
        //     {
        //       path: 'mainScale',
        //       name: 'warningMainScale',
        //       component: () => import('@/views/modelManagement/warningModel/mainScale/index.vue'),
        //       meta: {
        //         title: '主标尺管理'
        //       }
        //     }
        //   ]
        // },
        // {
        //   path: 'unlistedCompany',
        //   name: 'unlistedCompany',
        //   redirect: 'indexWeight',
        //   meta: {
        //     title: '非上市企业模型'
        //   },
        //   children: [
        //     {
        //       path: 'indexWeight',
        //       name: 'unlistedCompanyIndexWeight',
        //       component: () => import('@/views/modelManagement/unlistedCompany/indexWeight/index.vue'),
        //       meta: {
        //         title: '权重管理'
        //       }
        //     },
        //     {
        //       path: 'mainScale',
        //       name: 'unlistedCompanyMainScale',
        //       component: () => import('@/views/modelManagement/unlistedCompany/mainScale/index.vue'),
        //       meta: {
        //         title: '主标尺管理'
        //       }
        //     }
        //   ]
        // }
      ]
    },
    {
      path: 'launchPanel',
      name: 'launchPanel',
      component: () => import('@/views/modelManagement/launchPanel/index.vue'),
      meta: {
        title: 'Launch Panel'
      },
      children: [
        {
          path: 'modelData',
          name: 'launchPanelModelData',
          component: () => import('@/views/modelManagement/launchPanel/modelData/index.vue'),
          meta: {
            title: '上市企业综合评估模型数据列表',
            sidebar: false
          }
        },
        {
          path: 'modelResult',
          name: 'launchPanelModelResult',
          component: () => import('@/views/modelManagement/launchPanel/modelResult/index.vue'),
          meta: {
            title: '上市企业综合评估模型结果',
            sidebar: false
          }
        },
        {
          path: 'modelRun',
          name: 'launchPanelModelRun',
          component: () => import('@/views/modelManagement/launchPanel/run/index.vue'),
          meta: {
            title: '重跑模型',
            sidebar: false
          }
        }
      ]
    }
  ]
}
