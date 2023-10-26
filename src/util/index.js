import path from 'path-browserify'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import { globalData } from '@/staticData/globalData'

// 判断是否是JSON格式
export function isJSON(str) {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  } catch (e) {
    return false
  }
  return false
}

// 深拷贝
export function deepClone(target) {
  // 定义一个变量
  let result
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (let i in target) {
        result[i] = deepClone(target[i])
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  // 返回最终结果
  return result
}

// 防抖
export const debounce = (fn, delay = 300, immediate = true) => {
  let timer = null // 借助闭包
  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay)
      if (callNow) {
        fn.apply(this, arguments)
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay)
    }
  }
}

// 节流
export function throttle(fn, delay = 300) {
  let valid = true
  return function() {
    if (!valid) {
      return false
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false
    setTimeout(() => {
      fn.apply(this, arguments)
      valid = true
    }, delay)
  }
}

function hasPermission(permission) {
  const settingsStore = useSettingsStore()
  const userStore = useUserStore()
  if (settingsStore.app.enablePermission) {
    return userStore.permissions.some(v => {
      return v === permission
    })
  } else {
    return true
  }
}

export function auth(value) {
  let auth
  if (typeof value === 'string') {
    auth = hasPermission(value)
  } else {
    auth = value.some(item => {
      return hasPermission(item)
    })
  }
  return auth
}

export function authAll(value) {
  const auth = value.every(item => {
    return hasPermission(item)
  })
  return auth
}

export function isExternalLink(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function resolveRoutePath(basePath, routePath) {
  if (isExternalLink(routePath)) {
    return routePath
  }
  if (isExternalLink(basePath)) {
    return basePath
  }
  return basePath ? path.resolve(basePath, routePath) : routePath
}

export const getIconSrc = name => {
  const path = `../assets/images/icon/${name}.png`
  const modules = import.meta.globEager('../assets/images/icon/*.png')
  return modules[path].default
}

// 获取2个日期之间的所有日期
export function getDateList(startTime, endTime) {
  // 初始化日期列表，数组
  const allDate = []
  let i = 0
  // 开始日期小于等于结束日期,并循环
  while (startTime <= endTime) {
    allDate[i] = startTime
    // 获取开始日期时间戳
    let startTime_ts = new Date(startTime).getTime()
    // 增加一天时间戳后的日期
    let next_date = startTime_ts + 24 * 60 * 60 * 1000
    // 拼接年月日，这里的月份会返回（0-11），所以要+1
    let next_dates_y = new Date(next_date).getFullYear() + '-'
    let next_dates_m =
      new Date(next_date).getMonth() + 1 < 10
        ? '0' + (new Date(next_date).getMonth() + 1) + '-'
        : new Date(next_date).getMonth() + 1 + '-'
    let next_dates_d =
      new Date(next_date).getDate() < 10
        ? '0' + new Date(next_date).getDate()
        : new Date(next_date).getDate()
    startTime = next_dates_y + next_dates_m + next_dates_d
    // 增加数组key
    i++
  }

  const map = {}

  allDate.forEach((item, index) => {
    map[item] = index
  })
  return {
    arr: allDate,
    map: map
  }
}

/**
 *
 * @param {Array} arrs 树形数据
 * @param {string} childs 树形数据子数据的属性名,常用'children'
 * @param {Array} attrArr 需要提取的公共属性数组(默认是除了childs的全部属性)
 * @returns
 */
export function extractTree(arrs, childs, attrArr) {
  let attrList = []
  if (!Array.isArray(arrs) && !arrs.length) return []
  if (typeof childs !== 'string') return []
  if (!Array.isArray(attrArr) || Array.isArray(attrArr) && !attrArr.length) {
    attrList = Object.keys(arrs[0])
    attrList.splice(attrList.indexOf(childs), 1)
  } else {
    attrList = attrArr
  }
  let list = []
  let level = 2
  const getObj = arr => {
    arr.forEach(function(row) {
      let obj = {}
      row.level = level
      attrList.forEach(item => {
        obj[item] = row[item]
      })
      list.push(obj)
      if (row[childs] && row[childs].length) {
        level++
        getObj(row[childs])
      }
    })
    return list
  }
  return getObj(arrs)
}

/**
 * 数字不够x位，前面补0
 * @param {*} num 数字
 * @param {*} len 补零长度
 * @param {*} step 补零方式，默认是前面补0，也可以为空
 * @returns  string
 */
export function formatZero(num, len, step = 0) {
  if (String(num).length > len) {
    return num
  }
  return (Array(len).join(step) + num).slice(-len)
}

// 通过流文件下载文件
export const downloadByUrl = (blob, filename) => {
  const link = document.createElement('a')
  const body = document.querySelector('body')

  link.href = window.URL.createObjectURL(new Blob([blob]))
  link.download = filename

  // fix Firefox
  link.style.display = 'none'
  body.appendChild(link)

  link.click()
  body.removeChild(link)

  window.URL.revokeObjectURL(link.href)
}

// 如果字符串大于1保留两位小数，否则保留小数点后两位不为0的数字
export const formatNumber = (num, len = 2) => {
  const arr = num.toString().split('.')
  if (num >= 1) {
    if (arr.length < 2) {
      return num + '.00'
    } else {
      let str = arr[1].slice(0, len)
      while (str.length < len) {
        str += '0'
      }
      return arr[0] + '.' + str
    }
  } else {
    if (arr.length < 2) {
      return num + '.00'
    } else {
      const strArr = arr[1].split('').map(v => parseInt(v))
      let str = ''
      for (let i = 0; i < strArr.length; i++) {
        str += strArr[i]
        if (strArr[i] !== 0) {
          if (strArr[i + 1]) {
            str += strArr[i + 1]
          } else {
            str += '0'
          }
          break
        }
      }
      return arr[0] + '.' + str
    }
  }
}

// 获取企业解释
export function getCompanyDesc(level, companyLevel, key) {
  const obj = globalData.ratingText[level]

  if (!obj) {
    return ''
  }
  for (const k in obj) {
    if (k.indexOf(companyLevel) > -1 && k.indexOf(key) > -1) {
      return obj[k]
    }
  }
}

// 获取最近三年的列表
export function getYearList() {
  let year = new Date().getFullYear() + 1
  const list = []
  for (let i = 0; i < 7; i++) {
    list.push({
      label: year,
      value: year
    })
    year--
  }
  return list
}
