export const globalData = {
  // 全局Class
  globalClass: {
    s: 'status-s',
    a: 'status-a',
    b: 'status-b',
    c: 'status-c',
    d: 'status-d',
    H: 'status-d',
    M: 'status-c',
    L: 'status-b',
    N: 'status-n'
  },
  status_class: {
    'PENDING': 'color-warning',
    'DONE': 'color-success',
    'REJECTED': 'color-error',
    '2': 'color-warning',
    '3': 'color-success',
    '1': 'color-error'
  },
  globalESG: {
    E: 'E（环境）',
    S: 'S（社会）',
    G: 'G（治理）'
  },
  globalESGShort: {
    E: '环境',
    S: '社会',
    G: '治理'
  },
  // 预警等级
  warningLevel: {
    H: '高度关注',
    M: '中度关注',
    L: '一般关注',
    N: '无明显异常'
  },
  // 碳排放等级
  carbonLevel: {
    H: '高碳排',
    M: '中碳排',
    L: '低碳排',
    N: '无明显碳排'
  },
  // 碳排Class
  carbonClass: {
    H: 'status-d',
    M: 'status-c',
    L: 'status-b',
    N: 'status-n'
  },
  warningLevelCN: {
    '高度关注': 'H',
    '中度关注': 'M',
    '一般关注': 'L',
    '无明显异常': 'M'
  },
  // 报告状态
  reportStatus: {
    'PENDING': '待审核',
    'DONE': '已完成',
    'REJECTED': '已驳回'
  },
  // 审核状态
  auditStatus: {
    'PENDING': '生成中',
    'REPORT': '审核中',
    'DONE': '已通过',
    'FAILED': '未通过',
    'DRAFT': '草稿箱',
    'TMP': '临时'
  },
  // 审核状态class
  auditStatusClass: {
    'REPORT': 'color-warning',
    'DONE': 'color-success',
    'FAILED': 'color-error'
  },
  // 修改状态
  modifyStatus: {
    1: '已修改',
    2: '未修改'
  },
  // 指标类型
  indexType: {
    '1': '核心',
    '2': '非核心'
  },
  // 表状态
  tableStatus: {
    'PENDING': '已修改',
    'READY': '已准备',
    'DONE': '已入模'
  },
  table_status_class: {
    'PENDING': 'color-error',
    'READY': 'color-warning',
    'DONE': 'color-success'
  },
  // 综合模型类型
  modelType: {
    ENTERPRISE_MODEL: '企业评估模型',
    INDUSTRY_MODEL: '行业评估模型'
  },
  // 指标修改状态
  indexModifyStatus: {
    true: '已修改',
    false: '未修改'
  },
  // 数据运维列表
  dataOperation: {
    esg_indicator_data_original: '企业ESG指标数据值原始表',
    esg_env_data: '区域环境数值表',
    esg_indicator_data: '行业指标数据表',
    esg_sub_company: '上市公司主营业务地理位置表',
    esg_enterprise_main_business: '上市公司主营业务指标表',
    esg_enterprise_industry: '上市公司所属行业表'
  },
  // 模型类型
  runModelType: {
    1: '上市企业综合模型数据列表',
    2: '企业评估模型',
    3: '行业评估模型'
  }
}

globalData.reportStatusList = filterMapToList(globalData.reportStatus)
globalData.auditStatusList = filterMapToList(globalData.auditStatus)
globalData.globalESGList = filterMapToList(globalData.globalESG)
globalData.modifyStatusList = filterMapToList(globalData.modifyStatus)
globalData.indexTypeList = filterMapToList(globalData.indexType)
globalData.dataOperationList = filterMapToList(globalData.dataOperation)
globalData.indexModifyStatusList = [{ label: '已修改', value: true }, { label: '未修改', value: false }]

function filterMapToList(obj) {
  const result = []
  for (const i in obj) {
    result.push({ label: obj[i], value: i })
  }
  return result
}
