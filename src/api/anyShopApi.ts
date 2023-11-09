import axios from 'axios'

export const anyShopApi = axios.create({
  baseURL: '/api',
})
