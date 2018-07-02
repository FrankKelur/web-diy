/* eslint-disable */
import { fetch, API, lang } from 'common/js/Utils'
import configService from '../../layout/admin/service'

export default {
  getWorkflowList () {
    return Promise.resolve([
      {
        key: '1851656',
        label: '零用钱申请'
      },
      {
        key: '11111',
        label: '工资预支'
      }
    ])
  },
  getApplyData () {
    return Promise.resolve({
      workflow: '申请零花钱',
      applicant: '儿子',
      cTime: '2010-1-2',
      deadline: '2010-1-2', // apply表单填写的信息
      amount: '1000',
      reason: '买三年高考五年模拟'
    })
  },
  getAuditHistory () {
    return Promise.resolve([
      {
        form: [
          {
            'label': '审核结果',
            'placeholder': '请选择',
            'key': 'result',
            'rules': [
              'required'
            ],
            'type': 'select',
            'icon': 'radio',
            'dataSource': [
              {
                'label': '通过',
                'key': '通过'
              },
              {
                'label': '不通过',
                'key': '不通过'
              }
            ],
            'list': true,
            'detail': true,
            'search': true,
            'edit': true,
            'beDependentItems': []
          },
          {
            'label': '备注',
            'placeholder': '请输入备注',
            'key': 'remark',
            'rules': [],
            'type': 'textarea',
            'icon': 'multilineinputbox',
            'list': true,
            'detail': true,
            'search': true,
            'edit': true,
            'beDependentItems': []
          }
        ],
        data: {
          auditTime: new Date(),
          result: '通过',
          remark: '爸爸请给通过！！'
        }
      },
      {
        form: [
          {
            'label': '审核结果',
            'placeholder': '请选择',
            'key': 'result',
            'rules': [
              'required'
            ],
            'type': 'select',
            'icon': 'radio',
            'dataSource': [
              {
                'label': '通过',
                'key': '通过'
              },
              {
                'label': '不通过',
                'key': '不通过'
              }
            ],
            'list': true,
            'detail': true,
            'search': true,
            'edit': true,
            'beDependentItems': []
          },
          {
            'label': '备注',
            'placeholder': '请输入备注',
            'key': 'remark',
            'rules': [],
            'type': 'textarea',
            'icon': 'multilineinputbox',
            'list': true,
            'detail': true,
            'search': true,
            'edit': true,
            'beDependentItems': []
          }
        ],
        data: {
          auditTime: new Date(),
          result: '通过',
          remark: ''
        }
      }
    ])
  },
  getAuditForm (params) {
    return Promise.resolve([
      {
        'label': '审核结果',
        'placeholder': '请选择',
        'key': 'result',
        'rules': [
          'required'
        ],
        'type': 'select',
        'icon': 'radio',
        'dataSource': [
          {
            'label': '通过',
            'key': '通过'
          },
          {
            'label': '不通过',
            'key': '不通过'
          }
        ],
        'list': true,
        'detail': true,
        'search': true,
        'edit': true,
        'beDependentItems': []
      },
      {
        'label': '备注',
        'placeholder': '请输入备注',
        'key': 'remark',
        'rules': [],
        'type': 'textarea',
        'icon': 'multilineinputbox',
        'list': true,
        'detail': true,
        'search': true,
        'edit': true,
        'beDependentItems': []
      }
    ])
  },
  getApplyForm (params) {
    return Promise.resolve([
      {
        'label': '金额',
        'placeholder': '请输入金额',
        'key': 'amount',
        'rules': [
          'required',
          'number'
        ],
        'type': 'input',
        'icon': 'inputbox',
        'list': true,
        'detail': true,
        'search': true,
        'edit': true,
        'beDependentItems': []
      },
      {
        'label': '放款时间',
        'placeholder': '请选择放款时间',
        'key': 'deadline',
        'rules': [
          'required'
        ],
        'type': 'datetime',
        'icon': 'date',
        'list': true,
        'detail': true,
        'search': true,
        'edit': true,
        'beDependentItems': []
      },
      {
        'label': '理由',
        'placeholder': '请输入',
        'key': 'reason',
        'rules': [
          'required',
          'longText'
        ],
        'type': 'textarea',
        'icon': 'multilineinputbox',
        'list': true,
        'detail': true,
        'search': true,
        'edit': true,
        'beDependentItems': []
      }
    ])
  },
  apply (params) {
    return Promise.resolve({
      re: 200
    })
  },
  audit (params) {
    return Promise.resolve({
      re: 200
    })
  },
  cancel (params) {
    return Promise.resolve({
      re: 200
    })
  },
  getRenderDataSync (params) {
    return JSON.parse(JSON.stringify(lang[params.page]))
  },
  getRenderData (params) {
    // var text = JSON.parse(localStorage.getItem('text') || '{}')
    return configService.getConfig().then(({data: {text}}) => {
      var pageLang = Object.assign(lang[params.page], text[params.page])
      var str = JSON.stringify(pageLang)
      var keys = ['__auditor__', '__status__', '__cTime__', '__endTime__', '__applicant__',
        '__detail__', '__cancel__', '__workflow__', '__nextAuditor__', '__process__']
      keys.forEach(key => {
        str = str.replace(new RegExp(key, 'g'), pageLang[key])
      })
      return JSON.parse(str)
    })

  }
}
