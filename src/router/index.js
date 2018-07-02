/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import { getLoginStatus, lang } from 'common/js/Utils'
import { MessageBox } from 'element-ui'
const editor = () => import('@/pages/editor')
const list = () => import('@/pages/list')
const audit = () => import('@/pages/audit')
const sign = () => import('@/pages/sign')
const workflow = () => import('@/pages/workflow')
const adminLayout = () => import('@/layout/admin')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: adminLayout,
      beforeEnter (to, from, next) {
        var rdata = lang['sign']
        if (getLoginStatus()) {
          next()
        } else {
          MessageBox.alert(rdata.pleaseLogin, rdata.tooltip, {
            confirmButtonText: rdata.config,
            callback: action => {
              if (action === 'confirm') {
                next('/sign')
              }
            }
          })
        }
      },
      children: [
        {
          path: 'editor',
          name: 'editor',
          component: editor
        },
        {
          path: 'list',
          component: list,
          name: 'list'
        },
        {
          path: 'audit',
          component: audit,
          name: 'audit'
        },
        {
          path: 'workflow',
          component: workflow,
          name: 'workflow'
        }
      ]
    },
    {
      path: '/',
      name: 'default',
      component: sign
    },
    {
      path: '/sign',
      name: 'sign',
      component: sign
    }
  ]
})
