// 加密
import CryptoJS from 'crypto-js'
import setting from '@/settings'
import { isJSON } from '@/util'
import storage from '@/util/storage'

export function cipherText(string) {
  const cipherText = CryptoJS.AES.encrypt(
    string,
    setting.ENCRYP_KEY
  ).toString()
  return cipherText
}
// 解密
export function decryptText(string) {
  const bytes = CryptoJS.AES.decrypt(string, setting.ENCRYP_KEY)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}

// 加密
export function cipher(str) {
  return cipherText(str)
}
// 解密
export function decrypt(str) {
  return decryptText(str)
}
// 加密存储
export function localCipher(key, str) {
  str = Object.prototype.toString.call(str) === '[object Object]' || Object.prototype.toString.call(str) === '[object Array]' ? JSON.stringify(str) : str
  return storage.local.set(key, cipher(str))
}
// 解密存储
export function localDecrypt(key) {
  const result = decryptText(storage.local.get(key))
  return isJSON(result) ? JSON.parse(result) : result
}
