/* eslint-disable */
import { fetch, API, parserUrl, lang } from 'common/js/Utils'
import configService from '../../layout/admin/service'

export default {
  getRenderDataSync (params) {
    return JSON.parse(JSON.stringify(lang[params.page]))
  },
  getRenderData (params) {
    return configService.getConfig().then(({data: {text}}) => {
      var pageLang = Object.assign(lang[params.page], text[params.page])
      var str = JSON.stringify(pageLang)
      var keys = ['__edit__', '__delete__', '__detail__']
      keys.forEach(key => {
        str = str.replace(new RegExp(key, 'g'), pageLang[key])
      })
      return JSON.parse(str)
    })
  },
  delete (row, url) {
    return fetch(url, row)
  },
  customOperate (row, url = '') {
    return fetch(url, row)
  },
  getDetail (row, url) {
    return fetch(url, row)
  },
  edit (params, url) {
    return fetch(url, params)
  },
  getTableConfig (page = '') {
    return fetch('/api/page/detail', {pid: page}).then(({data}) => {
      var {formItems} = data
      return {
        info: data,
        formItems: formItems,
        headerCols: formItems.map(item => ({field: item.key, label: item.label, list: item.list, type: item.type})),
        searchFields: formItems.map(item => ({
          search: item.search,
          field: item.key,
          dataSource: item.dataSource,
          type: item.type,
          label: item.label,
          width: item.type === 'datetime' ? 6 : 3,
          placeholder: item.placeholder
        }))
      }
    })
  }
}
