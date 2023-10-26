import axios from './index'

const accountSetBaseUrl = '/api/accounting/account-sets'

// 分页查询
export const getAccountSetPage = params => {
  return axios.get(accountSetBaseUrl, { params })
}

// // 新增
// export const createDataDict = data => {
//   return axios.post(dataDictBaseUrl, data)
// }
// // 更新
// export const updateDataDict = data => {
//   return axios.put(dataDictBaseUrl, data)
// }

// // 更新状态
// export const updateDataDictStatus = (id, status) => {
//   return axios.put(`${dataDictBaseUrl}/${id}/status/${status}`)
// }