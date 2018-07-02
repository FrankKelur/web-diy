import Cookie from 'js-cookie/src/js.cookie'

export { default as fetch } from './fetch'
export { default as constants } from './constants'
export { default as validator } from './validator'
export { default as API } from './API'
export { default as lang } from './lang'
export { default as colorsList } from './colors'

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

export { getLoginStatus, debounce, parserUrl, getOptionList }
