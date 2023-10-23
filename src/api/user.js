import axios from './index'

// 分页查询用户列表
export function getUserList(params) {
  return axios.get('/api/admin/users', { params })
}

// 创建用户
export function createUser(data) {
  return axios.post('/api/admin/users', data)
}

// 更新用户
export function updateUser(data) {
  return axios.put('/api/admin/users', data)
}

// 检查唯一值
export function checkUnique(params) {
  return axios.get('/api/admin/users/check', { params })
}

// 查询用户详情
export function getUserDetail(id) {
  return axios.get(`/api/admin/users/${id}`)
}

// 下载用户列表
export function downloadUserList(params) {
  return axios.get('/api/admin/users/export', { params, responseType: 'blob' })
}

// 某用户已关注企业列表
export function getFollowedCompanyList(mobile, params) {
  return axios.get(`/api/admin/users/${mobile}/my-follow-enterprises`, { params })
}

// 用户已上传的企业
export function getUploadedCompanyList(mobile, params) {
  return axios.get(`/api/admin/users/${mobile}/upload-enterprise`, { params })
}

// 用户申请的专家报告
export function getExpertReportList(mobile, params) {
  return axios.get(`/api/admin/users/${mobile}/my-applies`, { params })
}

// 下载上传的企业报告
export function downloadUploadedCompanyReport(id) {
  return axios.get(`/my-upload-enterprises/${id}/download`, { responseType: 'blob' })
}

// 创建后台用户
export function createAdminUser(data) {
  return axios.post('/api/admin/users/backend', data)
}

// 重置密码
export function resetPassword(id) {
  return axios.put(`/api/admin/users/${id}/pwd-reset`)
}

// 激活或者停用用户
export function activeOrStopUser(id, activated) {
  return axios.put(`/api/admin/users/${id}/activated/${activated}`)
}

// 编辑后台用户
export function editAdminUser(data) {
  return axios.put('/api/admin/users/backend', data)
}
