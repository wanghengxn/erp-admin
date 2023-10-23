import axios from './index'

// 获取非上市企业图表数据
export const getNonListedCompanyChart = params => {
  return axios.get('/api/upload-enterprises/industry-model-result', { params })
}
