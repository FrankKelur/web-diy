import { lang, fetch } from 'common/js/Utils'

export default {
  getRenderDataSync (params) {
    return JSON.parse(JSON.stringify(lang[params.page]))
  },
  getRenderData (page, text) {
    return Object.assign(lang[page], text[page])
  },
  login (params, url = '/api/user/login') {
    return fetch(url, params)
    // return Promise.resolve({
    //   re: 200,
    //   token: 'zhai'
    // })
  },
  signUp (params, url = '/api/user/sign-up') {
    return fetch(url, params)
    // return Promise.resolve({re: 200})
  }
}
