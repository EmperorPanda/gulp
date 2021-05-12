import { request } from '@/plugins/store'

export const getList = (params) => {
  console.log(params, 90)
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

export const getTags = (params) => {
  return request({
    method: 'GET',
    url: '/api/tags',
    params
  })
}
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/params',
  })
}
export const getArticlesFeed = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
  })
}
export const favorite = (params) => {
  return request({
    method: 'POST',
    url: `/api/articles/${params}/favorite`,
  })
}
export const deleteFavorite = (params) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${params}/favorite`,
  })
}