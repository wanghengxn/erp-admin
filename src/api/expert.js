import axios from './index'
import qs from 'qs'

// 分页查询专家
export function getExpertList(params) {
  return axios.get('/api/admin/experts', { params })
}

// 创建专家
export function createExpert(data) {
  return axios.post('/api/admin/experts', data)
}

// 更新专家
export function updateExpert(data) {
  return axios.put('/api/admin/experts', data)
}

// 查询专家详情
export function getExpertDetail(id) {
  return axios.get(`/api/admin/experts/${id}`)
}

// 更新专家简历
export function updateResume(data) {
  return axios.put('/api/admin/experts/updateCandidate', data)
}

// 更新专家状态
export function updateExpertStatus(data) {
  return axios.put('/api/admin/experts/updateActived', data)
}

// 报告申请列表
export function getReportList(params) {
  return axios.get('/api/admin/my-applies', { params })
}

// 上传报告
export function uploadReport(data) {
  return axios.put('/api/admin/applies/updateReportUrl', data)
}

// 更新报告状态
export function updateReportStatus(data) {
  return axios.put('/api/admin/applies/updateStatus', data)
}

// 上传的企业列表
export function getCompanyList(params) {
  return axios.get('/api/admin/upload-enterprise/getPage', { params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 批量通过审核
export function batchPass(data) {
  return axios.put('/api/admin/users/uploadEnterprise/check', data)
}

// 批量下載报告zip
export function downloadReportZip(params) {
  return axios.get('/api/my-upload-enterprises/downloads', { params, responseType: 'blob' })
}
