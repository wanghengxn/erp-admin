import axios from './index'
import qs from 'qs'

// 近7天企业舆情
export function getCompanySentiment() {
  return axios.get('/api/admin/dashboard/enterprise-news')
}

// 近7天行业政策
export function getIndustryPolicy() {
  return axios.get('/api/admin/dashboard/industry-policies')
}

// 数据修改记录
export function getModifyRecord(params) {
  return axios.get('/api/admin/dashboard/model-logs', { params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 企业和行业完整度
export function getCompanyAndIndustryIntegrity(params) {
  return axios.get('/api/admin/dashboard/indicator-data/all-rate', { params })
}

// 企业各指标完整度
export function getCompanyIndicatorIntegrity(params) {
  return axios.get('/api/admin/dashboard/indicator-data/rate', { params })
}

// 分页查询数据字典列表
export function getDictionaryList(params) {
  return axios.get('/api/admin/data-dicts', { params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 查看字段
export function getDictionaryDetail(id) {
  return axios.get(`/api/admin/data-dicts/${id}/columns`)
}

// 分页查询数据字典数据详情
export function getDictionaryDataList(id, data) {
  return axios.post(`/api/admin/data-dicts/${id}/data`, data)
}

// 修改数据字典数据数据
export function updateDictionaryData(id, data) {
  return axios.put(`/api/admin/data-dicts/${id}/data`, data)
}

// 导出数据字典数据
export function exportDictionaryData(baseApi, data) {
  return axios.post(`${baseApi}/export`, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
}

// 操作日志
export function getOperationLogList(id) {
  return axios.get(`/api/admin/data-dicts/${id}/data/log`)
}

// 导入字典详情数据
export function importDictionaryData(baseApi, formData) {
  return axios.post(`${baseApi}/import`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// 查询导入导出状态
export function queryFileAsyncStatus(params) {
  return axios.get('/api/admin/data-dicts/async/status', { params })
}

// 下载异步下载的文件
export function downloadAsyncFile(params) {
  return axios.get('/api/admin/data-dicts/async/get', { params, responseType: 'blob' })
}

/* =============数据运维相关================ */
// 查询最新数据上传记录
export function getDataOperationList() {
  return axios.get('/api/admin/logs/last-upload')
}

// 导入企业原始指标数据
export function importCompanyData(formData) {
  return axios.post('/api/admin/indicator-original-data/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// 导入行业指标数据
export function importIndustryData(formData) {
  return axios.post('/api/admin/industry-indicator-data/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// 导入上市公司主营业务地理位置表
export function importCompanyLocationData(formData) {
  return axios.post('/api/admin/sub-companies/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// 导入上市公司主营业务指标表
export function importCompanyBusinessData(formData) {
  return axios.post('/api/admin/enterprise-main-business/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// 导入上市公司所属行业表
export function importCompanyIndustryData(formData) {
  return axios.post('/api/admin/enterprise-industries/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// 导入水质综合指数
export function importWaterQualityData(formData) {
  return axios.post('/api/admin/env-data/import-h2o', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// 导入空气质量
export function importAirQualityData(formData) {
  return axios.post('/api/admin/env-data/import-air', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// 导入气象灾害数据
export function importMeteorologicalDisasterData(formData) {
  return axios.post('/api/admin/env-data/import-weather', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// 修复企业原始指标数据图片
export function repairCompanyDataImage(year) {
  return axios.get(`/api/admin/indicator-original-data/fix-image?year=${year}`)
}

// 获取上传模版
export function getUploadTemplate(tbName, envType) {
  return axios.get('/api/admin/upload/template', { params: { tbName, envType }, responseType: 'blob' })
}

// 检查是否导入完成
export function checkImportStatus(logId) {
  return axios.get(`/api/admin/logs/${logId}`)
}

// 分页查询数据上传记录
export function getDataUploadList(params) {
  return axios.get('/api/admin/logs/upload', { params })
}

// 查看模型最新运行时间
export function getModelLastRunTime() {
  return axios.get('/api/admin/model-runs/last-run')
}
