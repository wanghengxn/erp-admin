import axios from './index'

const dataDictBaseUrl = '/api/mid/data-dicts'

// meta
export const getDataDictMeta = () => {
  return axios.get(`${dataDictBaseUrl}/meta`)
}

// 分页查询
export const getDataDictPage = params => {
  return axios.get(dataDictBaseUrl, { params })
}

// 新增
export const createDataDict = data => {
  return axios.post(dataDictBaseUrl, data)
}
// 更新
export const updateDataDict = data => {
  return axios.put(dataDictBaseUrl, data)
}

// 更新状态
export const updateDataDictStatus = (id, status) => {
  return axios.put(`${dataDictBaseUrl}/${id}/status/${status}`)
}

// 根据groupKey查询
export const getDataDictByGroupKeys = params => {
  return axios.get(`${dataDictBaseUrl}/group-keys`, { params })
}