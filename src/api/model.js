import axios from './index'
import qs from 'qs'

// 指标体系树状结构
export function getTreeData(params) {
  return axios.get('/api/admin/indicators/tree', { params })
}

// 新增底层指标
export function addIndicator(data) {
  return axios.post('/api/admin/indicators', data)
}

// 新建字典
export function addDictionary(data) {
  return axios.post('/api/admin/indicators/copy', qs.stringify(data))
}

// 删除指标
export function deleteIndicator(id, data) {
  const config = {
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return axios.delete(`/api/admin/indicators/${id}`, config)
}

// 编辑指标
export function editIndicator(data) {
  return axios.put('/api/admin/indicators', data)
}

// 导出指标
export function exportIndicator(data) {
  return axios.post('/api/admin/indicators/export', qs.stringify(data), { responseType: 'blob' })
}

// 模型管理 ====》 评估模型管理 ====》 上市企业评级模型 ====》 入模指标管理
// 企业入模指标列表
export function getEnterpriseList(params) {
  return axios.get('/api/admin/enterprise/model-input-indicators', { params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 分页查询草稿企业入模指标
export function getDraftEnterpriseList(params) {
  return axios.get('/api/admin/enterprise/model-input-indicators/draft', { params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 当前入模指标查询详情
export function getEnterpriseDetail(id, params) {
  return axios.get(`/api/admin/enterprise/model-input-indicators/${id}`, { params })
}

// 复制当前入模指标到草稿箱
export function copyEnterpriseList(data) {
  return axios.post('/api/admin/enterprise/model-input-indicators/copy-to-draft', data, { params: data, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 草稿箱添加指标
export function addDraftIndicator(data) {
  return axios.post('/api/admin/enterprise/model-input-indicators/draft', data)
}

// 草稿箱查询指标详情
export function getDraftIndicatorDetail(id) {
  return axios.get(`/api/admin/enterprise/model-input-indicators/draft/${id}`)
}

// 草稿箱修改指标
export function editDraftIndicator(data) {
  return axios.put('/api/admin/enterprise/model-input-indicators/draft', data)
}

// 草稿箱批量删除指标
export function deleteDraftIndicator(data) {
  return axios.delete('/api/admin/enterprise/model-input-indicators/draft/ids', { params: { ids: data.ids }, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 清空草稿箱
export function clearDraftIndicator(data) {
  return axios.delete('/api/admin/enterprise/model-input-indicators/draft', { params: { cics1Code: data.cics1Code }, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 更新指标
export function updateIndicator(data) {
  return axios.put('/api/admin/enterprise/model-input-indicators/draft/status', null, { params: { cics1Code: data.cics1Code }, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 草稿箱-更新min/max
export function updateMinMax(data) {
  return axios.post('/api/admin/enterprise/model-input-indicators/draft/update-min-max', data)
}

// 当前入模指标-导出
export function currentEnterpriseIndexExport(data) {
  return axios.post('/api/admin/enterprise/model-input-indicators/export', qs.stringify(data, { indices: false }), { responseType: 'blob' })
}

// 入模指标草稿箱导出
export function draftEnterpriseIndexExport(data) {
  return axios.post('/api/admin/enterprise/model-input-indicators/draft/export', qs.stringify(data, { indices: false }), { responseType: 'blob' })
}

// 草稿箱导入入模指标
export function importDraftEnterpriseIndex(data) {
  return axios.post('/api/admin/enterprise/model-input-indicators/draft/import', data, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// ===========行业入模指标管理================
// 分页查询当前入模指标
export function getIndustryList(params) {
  return axios.get('/api/admin/industry/model-input-indicators', { params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 当前入模指标-导出
export function exportIndustryList(data) {
  return axios.post('/api/admin/industry/model-input-indicators/export', qs.stringify(data), { responseType: 'blob' })
}

// 复制当前入模指标到草稿箱
export function copyIndustryList(data) {
  return axios.post('/api/admin/industry/model-input-indicators/copy-to-draft', qs.stringify(data))
}

// 分页查询草稿箱入模指标
export function getDraftIndustryList(params) {
  return axios.get('/api/admin/industry/model-input-indicators/draft', { params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 草稿箱添加指标
export function addDraftIndustryIndicator(data) {
  return axios.post('/api/admin/industry/model-input-indicators/draft', data)
}

// 草稿箱批量删除
export function deleteDraftIndustryIndicator(data) {
  return axios.delete('/api/admin/industry/model-input-indicators/draft/ids', { params: { ids: data.ids }, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 草稿箱更新指标
export function updateDraftIndustryIndicator() {
  return axios.put('/api/admin/industry/model-input-indicators/draft/status')
}

// 草稿箱-编辑
export function editDraftIndustryIndicator(data) {
  return axios.put('/api/admin/industry/model-input-indicators/draft', data)
}

// 草稿箱查询详情
export function getDraftIndustryIndicatorDetail(id) {
  return axios.get(`/api/admin/industry/model-input-indicators/draft/${id}`)
}

// 清空草稿箱
export function clearDraftIndustryIndicator() {
  return axios.delete('/api/admin/industry/model-input-indicators/draft')
}

// 草稿箱导出
export function exportDraftIndustryIndicator(data) {
  return axios.post('/api/admin/industry/model-input-indicators/draft/export', qs.stringify(data), { responseType: 'blob' })
}

// 草稿箱-更新min/max
export function updateDraftIndustryIndicatorMinMax(data) {
  return axios.put('/api/admin/industry/model-input-indicators/draft/update-min-max', data)
}

// =============权重模型部分================
// --------企业模型部分--------

// 分页查询当前模型权重
export function getWeightList(params) {
  return axios.get('/api/admin/enterprise/input-indicator-weights', { params: params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 导入到草稿箱
export function importToDraft(data) {
  return axios.post('/api/admin/enterprise/input-indicator-weights/copy-to-draft', data, { params: data, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 分页查询草稿箱权重
export function getDraftWeightList(params) {
  return axios.get('/api/admin/enterprise/input-indicator-weights/draft', { params: params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 清空草稿箱
export function clearDraftWeight(params) {
  return axios.delete('/api/admin/enterprise/input-indicator-weights/draft', { params: params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 新建权重
export function addWeight(data) {
  return axios.post('/api/admin/enterprise/input-indicator-weights/copy-new-to-draft', qs.stringify(data))
}

// 草稿箱查询详情
export function getDraftWeightDetail(id) {
  return axios.get(`/api/admin/enterprise/input-indicator-weights/draft/${id}`)
}

// 草稿箱更新权重
export function updateDraftWeight(data) {
  return axios.put('/api/admin/enterprise/input-indicator-weights/draft/status', data, { params: data, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 草稿箱-编辑
export function editDraftWeight(data) {
  return axios.put('/api/admin/enterprise/input-indicator-weights/draft', data)
}

// 草稿箱查询同一个父级下的所有权重
export function getDraftWeightListByParentId(id) {
  return axios.get(`/api/admin/enterprise/input-indicator-weights/draft/${id}/same-parent-weight`)
}

// 导出企业模型权重
export function exportWeight(data) {
  return axios.post('/api/admin/enterprise/input-indicator-weights/export', qs.stringify(data), { responseType: 'blob' })
}

// 导入企业模型权重
export function importWeight(data) {
  return axios.post('/api/admin/enterprise/input-indicator-weights/import', data)
}

// -----------综合模型部分------------
// 查询当前模型综合评估权重管理列表
export function getSynthesizeWeightList(params) {
  return axios.get('/api/admin/enterprise/sum-weights', { params })
}

// 查询草稿箱综合权重列表
export function getSynthesizeDraftWeightList(params) {
  return axios.get('/api/admin/enterprise/sum-weights/draft', { params })
}

// 导入到草稿箱
export function importSynthesizeToDraft(data) {
  return axios.post('/api/admin/enterprise/sum-weights/copy-to-draft', data, { params: data, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 草稿箱更新权重
export function updateSynthesizeDraftWeight() {
  return axios.put('/api/admin/enterprise/sum-weights/draft/status')
}

// 草稿箱-编辑
export function editSynthesizeDraftWeight(data) {
  return axios.put('/api/admin/enterprise/sum-weights/draft', data)
}

// 导出
export function exportSynthesizeWeight(data) {
  return axios.post('/api/admin/enterprise/sum-weights/export', qs.stringify(data), { responseType: 'blob' })
}

// --------------主标尺管理部分----------------
// 企业主标尺部分
// 查询企业主标尺列表
export function getEnterpriseMainScaleList(params) {
  return axios.get('/api/admin/enterprise/main-rulers', { params })
}

// 企业主标尺草稿箱列表
export function getEnterpriseMainScaleDraftList(params) {
  return axios.get('/api/admin/enterprise/main-rulers/draft', { params })
}

// 导入到草稿箱
export function importEnterpriseMainScaleToDraft(data) {
  return axios.post('/api/admin/enterprise/main-rulers/copy-to-draft', data, { params: data, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 草稿箱更新权重
export function updateEnterpriseMainScaleDraftWeight(params) {
  return axios.put('/api/admin/enterprise/main-rulers/draft/status', {}, { params: params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 清空草稿箱
export function clearEnterpriseMainScaleDraftWeight(params) {
  return axios.delete('/api/admin/enterprise/main-rulers/draft', { params: params })
}

// 草稿箱-编辑
export function editEnterpriseMainScaleDraftWeight(data) {
  return axios.put('/api/admin/enterprise/main-rulers/draft', data)
}

// 主标尺导出
export function exportEnterpriseMainScale(data) {
  return axios.post('/api/admin/enterprise/main-rulers/export', qs.stringify(data), { responseType: 'blob' })
}

// 综合主标尺部分
// 查询综合主标尺列表
export function getSynthesizeMainScaleList(params) {
  return axios.get('/api/admin/enterprise/sum-main-rulers', { params })
}

// 查询草稿箱综合主标尺管理列表
export function getSynthesizeMainScaleDraftList(params) {
  return axios.get('/api/admin/enterprise/sum-main-rulers/draft', { params })
}

// 导入到草稿箱
export function importSynthesizeMainScaleToDraft(data) {
  return axios.post('/api/admin/enterprise/sum-main-rulers/copy-to-draft', data, { params: data, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 草稿箱更新权重
export function updateSynthesizeMainScaleDraftWeight(data) {
  return axios.put('/api/admin/enterprise/sum-main-rulers/draft/status', qs.stringify(data))
}

// 草稿箱-编辑
export function editSynthesizeMainScaleDraftWeight(data) {
  return axios.put('/api/admin/enterprise/sum-main-rulers/draft', data)
}

// 清空草稿箱
export function clearSynthesizeMainScaleDraftWeight(params) {
  return axios.delete('/api/admin/enterprise/sum-main-rulers/draft', { params })
}

// 导出综合主标尺
export function exportSynthesizeMainScale(data) {
  return axios.post('/api/admin/enterprise/sum-main-rulers/export', qs.stringify(data), { responseType: 'blob' })
}

/* ===================跑模型================= */
// 数据列表
export function getRunModelList(params) {
  return axios.get('/api/admin/model-runs/data-list', { params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  }  })
}

// 模型结果
export function getModelResult(params) {
  return axios.get('/api/admin/model-runs/result-list', { params })
}

// 下载模型结果文件
export function downloadModelResultFile(url) {
  return axios.get(url, { responseType: 'blob' })
}

// 跑模型前检查
export function checkBeforeRunModel(params) {
  return axios.get('/api/admin/model-runs/check-list', { params })
}

// 模型运行
export function runModel(data) {
  return axios.post('/api/admin/model-runs', qs.stringify(data))
}

// 查看运行结果
export function getRunModelResult(batchId) {
  return axios.get(`/api/admin/model-runs/${batchId}/details`)
}

// 查看跑完模型后的临时数据
export function getRunModelTempData(params) {
  return axios.get('/api/admin/enterprise-evaluation-results/tmp', { params })
}

// 确认审核结果
export function confirmRunModelResult(batchId) {
  return axios.post(`/api/admin/model-runs/${batchId}/confirm-tmp`)
}
