import axios from './index'

// 创建角色
export const createRole = data => {
  return axios.post('/api/admin/roles', data)
}

// 获取角色列表
export const getRoleList = () => {
  return axios.get('/api/admin/roles')
}

// 获取角色详情
export const getRoleDetail = id => {
  return axios.get(`/api/admin/roles/${id}`)
}

// 更新角色
export const updateRole = data => {
  return axios.put('/api/admin/roles', data)
}

// 删除角色
export const deleteRole = id => {
  return axios.delete(`/api/admin/roles/${id}`)
}

// 设置角色权限
export const setRolePermission = data => {
  return axios.put('/api/admin/roles/permissions', data)
}

// 查询权限列表
export const getPermissionList = () => {
  return axios.get('/api/admin/permissions')
}

// 查询该角色关联的用户数量
export const getRoleUserCount = id => {
  return axios.get(`/api/admin/roles/${id}/users/count`)
}

// 复制角色
export const copyRole = data => {
  return axios.post('/api/admin/roles/copy', data)
}
