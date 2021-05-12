import { request } from '@/plugins/store'

export const login = (data) => {

  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}
export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}