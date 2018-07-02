import { fetch, API, lang, colorsList } from 'common/js/Utils'

export default {
  getColorListSync () {
    return colorsList
  },
  getRenderDataSync (params) {
    return JSON.parse(JSON.stringify(lang[params.page]))
  },
  logout (params = {}, url = '/api/user/logout') {
    // return Promise.resolve({re: 200})
    return fetch(url, params)
  },
  getPages () {
    return fetch(API.page_list, {})
  },
  // api
  getRenderData (page, text) {
    return Object.assign(JSON.parse(JSON.stringify(lang[page])), text[page])
  },
  getText () {
    return Promise.resolve(JSON.parse(localStorage.getItem('text')))
  },
  setText (data) {
    localStorage.setItem('text', JSON.stringify(data))
    return Promise.resolve({re: 200})
  },
  setConfig (params = {}, url = '/api/config/edit') {
    return fetch(url, params)
  },
  getConfig (params = {}, url = '/api/config/detail') {
    return fetch(url, params).then(res => {
      res.data = res.data || {
        layout: 'horizontal',
        theme: 'default',
        colors: colorsList[2],
        text: JSON.parse(JSON.stringify(lang))
      }
      return res
    })
  }
}
