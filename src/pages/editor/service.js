import { fetch, lang } from 'common/js/Utils'
import configService from '../../layout/admin/service'

export default {
  getRenderDataSync (params) {
    return JSON.parse(JSON.stringify(lang[params.page]))
  },
  getRenderData (params) {
    return configService.getConfig().then(({data: {text}}) => {
      return Object.assign(lang[params.page], text[params.page])
    })
  },
  saveEnable (params, url = '/api/page/edit') {
    return fetch(url, params)
  },
  deletePage (params, url = '/api/page/delete') {
    return fetch(url, params)
    // return Promise.resolve({re: 200})
  },
  getAuditInfo (page, url = '/api/page/detail') {
    return fetch(url, {pid: page})
  }
}
