import axios from './index'

// 登录
export const login = data => {
  return axios.post('/api/sso/authenticate', data)
}

// 获取个人信息
export const getUserInfo = () => {
  return axios.get('/api/sso/account/current')
}

// 发送验证码
export const sendEmsCode = params => {
  return axios.get('/api/send-mobile', { params })
}

// 验证码登录
export const loginByEmsCode = data => {
  return axios.post('/api/authenticate/mobile', data)
}

// 更新密码
export const updatePwd = data => {
  return axios.put('/api/sso/account/current/pwd', data)
}
