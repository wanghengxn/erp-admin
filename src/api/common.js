import axios from './index'

// 上传接口
export function uploadFile(data) {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  return axios.post('/api/file/v1', data, config)
}

// 根据企业名或者证券代码模糊搜索企业
export function searchCompany(search) {
  return axios.get('/api/enterprises/list', { params: { search } })
}

// 模糊搜索所有企业
export function searchAllCompany(params) {
  return axios.get('/api/admin/users/companies', { params })
}

// 查询cics所有一级行业
export function getIndustry() {
  return axios.get('/api/admin/cics-industries/level/1')
}

// 查询某年份的所有入模时间
export function getYearTime(year, cics1Code) {
  return axios.get('/api/admin/model-runs/all-date', { params: { year, cics1Code } })
}

// 查询所有计算代码
export function getComputeCode(year) {
  return axios.get('/api/admin/calc-codes', { params: { year } })
}

// 查询所有底层指标，以及对应的上级
export function getIndicator(year) {
  return axios.get('/api/admin/indicators/all-level', { params: { year } })
}
