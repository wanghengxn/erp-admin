import axios from './index'
import qs from 'qs'

// 分页查询上市企业列表
export function getCompanyList(params) {
  return axios.get('/api/admin/enterprises', { params, paramsSerializer: params => {
    return qs.stringify(params, { indices: false })
  } })
}

// 导出上市企业列表
export function exportCompanyList(data) {
  return axios.post('/api/admin/enterprises/crm/export', qs.stringify(data, { indices: false }), { responseType: 'blob' })
}
