import axios from './index'

const baseUrl = '/api/accounting/account-subjects'

// 分页查询
export const getAccountSubjectPage = params => {
  return axios.get(baseUrl, { params })
}

// // 新增
// export const addAccountSet = data => {
//   return axios.post(accountSetBaseUrl, data)
// }
// // 更新
// export const updateAccountSet = data => {
//   return axios.put(accountSetBaseUrl, data)
// }

// export const getAccountSetById = id => {
//   return axios.get(`${accountSetBaseUrl}/${id}`)
// }

// // 删除
// export const delAccountSetById = id => {
//   return axios.delete(`${accountSetBaseUrl}/${id}`)
// }