import axios from './index'

// 用户的帐套
const userAccountSetBaseUrl = '/api/accounting/user-account-sets'

// 查询当前登录用户的所有帐套
export const getUserAccountSets = params => {
  return axios.get(userAccountSetBaseUrl, { params })
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