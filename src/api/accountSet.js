import axios from './index'

const accountSetBaseUrl = '/api/accounting/account-sets'

// 分页查询
export const getAccountSetPage = params => {
  return axios.get(accountSetBaseUrl, { params })
}

// 新增
export const addAccountSet = data => {
  return axios.post(accountSetBaseUrl, data)
}
// 更新
export const updateAccountSet = data => {
  return axios.put(accountSetBaseUrl, data)
}

export const getAccountSetById = id => {
  return axios.get(`${accountSetBaseUrl}/${id}`)
}

// // 更新状态
// export const updateDataDictStatus = (id, status) => {
//   return axios.put(`${dataDictBaseUrl}/${id}/status/${status}`)
// }