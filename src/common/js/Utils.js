import Cookie from 'js-cookie/src/js.cookie'

export { default as fetch } from './fetch'
export { default as constants } from './constants'
export { default as validator } from './validator'
export { default as API } from './API'
export { default as lang } from './lang'
export { default as colorsList } from './colors'
export { default as FeedTmp } from './FeedTmp'

function parserUrl (url) {
  var query = url.split('?')[1] || ''
  return query.split('&').reduce((res, item) => {
    var [key, val] = item.split('=')
    res[key] = val
    return res
  }, {})
}

function debounce (handle, delay = 100) {
  let t = null
  clearTimeout(t)
  t = setTimeout(() => {
    handle && handle()
  }, delay)
}

function getLoginStatus () {
  return !!Cookie.get('token')
}

function getOptionList () {
  return Promise.resolve([])
}

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

export { getLoginStatus, debounce, parserUrl, getOptionList, eventHandler }
