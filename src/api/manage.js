import { axios } from '@/utils/request'

// post
export function postAction(url, parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter,
  })
}

// post method= {post | put}
export function httpAction(url, parameter, method, timeout) {
  return axios({
    url: url,
    method: method,
    data: parameter,
    timeout,
  })
}

export function http2Action(url, parameter, method, timeout) {
  return axios({
    url,
    method,
    params: parameter,
    timeout,
  })
}

// put
export function putAction(url, parameter) {
  return axios({
    url: url,
    method: 'put',
    data: parameter,
  })
}

// get
export function getAction(url, parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter,
  })
}

// deleteAction
export function deleteAction(url, parameter) {
  return axios({
    url: url,
    method: 'delete',
    params: parameter,
  })
}

export function patchAction(url, parameter) {
  return axios({
    url,
    method: 'patch',
    data: parameter,
  })
}

export function exportAction(url, parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter,
    responseType: 'blob',
  })
}
