/* eslint-disable */
import { MessageBox } from 'element-ui'
import { FeedTmp, eventHandler } from '@/common/js/Utils'

const _returnContentByType = (response) => {
  let type = response.headers.get('Content-Type').split('')[0]
  switch (type) {
    case 'text/html':
      console.log('response.text()', response.text())
      return response.text()
    case 'application/json':
      console.log('response.json()', response.json())
      return response.json()
    default:
      return response.json()
  }
}

const headers = {
  'Content-Type': 'application/json'
}

// const queen = new Set()
const basicUrl = process.env.backend_url
const func = (url, parameters, option) => {
  if (!url.includes('http')) {
    url = basicUrl + url
  }
  return new Promise((resolve) => {
    // let key = url + JSON.stringify(parameters)
    // 防止重复请求
    // if (queen.has(key)) {
    //   return Promise.reject(new Error('duplicate request error...'))
    // }
    // queen.add(key)
    const params = Object.assign({}, {
      credentials: 'include',
      method: 'POST',
      headers: headers,
      cache: 'default',
      body: JSON.stringify(parameters)
    }, option)
    fetch(url, params).then(response => {
      // queen.delete(key)
      if (response.ok) {
        resolve(_returnContentByType(response))
      } else {
        var data = FeedTmp.NETWORK_ERROR
        eventHandler[data.type] && eventHandler[data.type](data)
        reject({})
      }
    }).catch(() => {
      MessageBox.alert('该帐号正在其他地方登陆！', '提示', {
        confirmButtonText: '去登陆',
        callback: action => {
          if (action === 'confirm') {
            window.location.href = '/admin/sign'
          }
        }
      })
    })
  })
}

export default func
