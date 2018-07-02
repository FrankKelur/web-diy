/* eslint-disable */
const eventHandler = {
  redirect (data) {
    window.location.pathname = data.params.toUrl
  },
  operateComponents (data) {
    const target = data.target_components
    for (let key in target) {
      var comp = window.components[key]
      var {action, params} = target[key]
      comp && comp[action](params)
    }
  }
}

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
// const basicUrl = 'http://localhost:3000'
const basicUrl = process.env.backend_url
const func = (url, parameters, option) => {
  if (!url.includes('http')) {
    url = basicUrl + url
  }
  return new Promise((resolve, reject) => {
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
        return _returnContentByType(response)
      } else {
        return {networkError: true}
      }
    }).then(res => {
      var data = {
        'type': 'operateComponents',
        'target_components': {
          'bubble': {
            'action': 'show',
            'params': {
              'type': 'success',
              'title': 'Network Error!'
            }
          }
        }
      }
      if (!res.networkError) {
        data = res
      }
      try {
        eventHandler[data.type] && eventHandler[data.type](data)
      } catch (ex) {
        console.warn('ex', ex)
      }
      resolve(res)
      return res
    })
  })
}

export default func
