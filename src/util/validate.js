// 判断是否是手机号
export function isMobile(str) {
  const reg = /^1[3|4|5|7|8][0-9]{9}$/
  return reg.test(str)
}

// 效验是否是邮箱
export function isEmail(str) {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(str)
}
