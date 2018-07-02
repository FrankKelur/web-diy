/* eslint-disable */
var struct = {
  editor: {
    'validateUrl': '操作验证接口',
    'editValidate': '编辑操作验证接口',
    'deleteValidate': '删除操作验证接口',
    'operations': '操作列表',
    'validator': '请输入可操作验证回掉, eg:' +
    '\nfunction (row) {' +
    '\nreturn !!row.name' +
    '\n}',
    'newOperationUrl': '请输入新操作接口',
    'newOperationLabel': '请输入新操作名称',
    'customOperation': '自定义操作',
    'detailUrl': '详情接口',
    'listUrl': '列表接口',
    'deleteUrl': '删除接口',
    'editUrl': '编辑接口',
    'operateSuccess': '操作成功！',
    'deleteMSG': '确定删除该页面？',
    'showAuth': '显示控制',
    'list': '列表',
    'inputField': '请输入字段名',
    'fieldName': '字段名',
    'pageId': '页面ID',
    'detail': '详情',
    'edit': '编辑',
    'search': '搜索',
    'number': '请输入数字',
    'longText': '请输入小于10000个字符',
    'save': '保存',
    'validateForm': '验证表单',
    'pleaseInput': '请输入',
    'longTextRule': '长度限制',
    'numberRule': '数字',
    'pleaseSelect': '请选择',
    'auditSet': '审核设置',
    'operation': '操作',
    'more': '更多',
    'fileTypeNotRight': '文件类型不正确！',
    'auditSetAuditFormSet': '表单设置',
    'createTime': '创建时间',
    'confirm': '确认',
    'cancel': '取消',
    'back': '返回',
    'prompt': '提示',
    'saveEnable': '保存并启用',
    'workflowInfo': '页面信息',
    'workflowName': '页面名称',
    'description': '描述',
    'inputDescription': '请填写描述',
    'clickUpload': '点击上传',
    'formatRestrictionsNarrow': '只能上传jpg／png……80*80px',
    'addControlCreatorAudit': '从左边拖放控件到表单',
    'controlBase': '控件库',
    'singleLineInputBox': '单行输入框',
    'multilineInputBox': '多行输入框',
    'digitalInputBox': '数字输入框',
    'radio': '单选框',
    'checkbox': '多选框',
    'dateRange': '时间选择器',
    'dateTime': '日期区间',
    'enclosure': '附件',
    'caption': '说明文字',
    'controlSet': '控件设置',
    'title': '标题',
    'pleaseEnter': '请输入',
    'promptText': '提示文字',
    'inputTitle': '请填写标题',
    'inputPromptText': '请填写提示文字',
    'content1000More': '内容最多可填写1000个字符',
    'singleLineInputBoxRule': '长度在0-1000个字符（单行输入框规则）',
    'content10000More': '内容最多可填写10000个字符',
    'verification': '验证',
    'requited': '必填',
    'requitedRule': '该项为必填项！',
    'selectTerm': '选项',
    'selectTermRule': '长度在0-40个字符（ 选项的规则）',
    '200MoreTerm40Character': '最多200项，每项最多40个字符',
    'inputSelectTerm': '请填写选项',
    'dateType': '日期类型',
    'yMDTM': '年-月-日 时:分',
    'yMD': '年-月-日',
    'lengthCalculation': '计算时长',
    'enable': '启用',
    'show': '显示',
    'check': '查看',
    'add': '添加',
    'multipleInputBox': '多行输入框',
    'text0To10Limit': '0-10个字符',
    'text0To40Limit': '0-40个字符',
    'textLength128': '最多输入128个字符',
    'required': '必填',
    'limit200MoreTerm40Character': '最多200项，每项最多40个字符',
    'cascadeInquire': '级联查询',
    'addRadio': '添加单选框',
    'followField': '跟随字段',
    'optionSource': '选项来源',
    'showField': '显示字段',
    'no': '暂无数据',
    'dataSource': '数据源',
    'delete': '删除',
    'canNotDeleteCascadeRadio': '无法删除，级联选择框至少有一个单选框！'
  },
  list: {
    '__detail__': '详情',
    '__delete__': '删除',
    '__edit__': '编辑',
    'numberMessage': '请输入数字',
    'longTextMessage': '请输入小于10000个字符',
    'requiredMessage': '请输入',
    'save': '保存',
    'cancel': '取消',
    'add': '新增',
    'editConfig': '编辑配置',
    'detail': '详情',
    'delete': '删除',
    'edit': '编辑',
    'operateSuccess': '操作成功',
    'networkError': '网络错误！',
    'operation': '操作',
    'more': '更多',
    'headerCols': [],
    'operateOpts': [
      {
        'label': '__edit__',
        'auth': 'edit'
      },
      {
        'label': '__detail__',
        'auth': 'detail'
      },
      {
        'label': '__delete__',
        'auth': 'delete'
      }
    ],
    'search': '搜索',
    'reset': '重置',
    'searchFields': []
  },
  admin: {
    logout: '登出',
    module: '模块',
    workflow: '工作流',
    editor: '编辑器',
    audit: '审批',
    save: '保存',
    optionColor: '可选配色',
    cancel: '取消',
    color: '选择配色',
    configText: '配置文案',
    theme: '主题切换'
  },
  workflow: {
    searchWorkflow: '请输入过滤条件',
    toUpload: '拖拽或点击上传',
    workflow: '工作流',
    required: '不能为空',
    newWorkflow: '新建工作流名称',
    create: '新建'
  },
  audit: {
    'cTime': '创建时间',
    'process': '审核处理',
    'workflow': '工作流',
    'reset': '重置',
    'applicant': '申请人',
    'requiredMessage': '请输入',
    'applyLabel': '我的申请',
    'historyLabel': '审核历史',
    'auditLabel': '我的审核',
    'applyNow': '申请 +',
    'operateSuccess': '操作成功',
    'save': '保存',
    'cancel': '取消',
    'add': '新增',
    'detail': '详情',
    '__cancel__': '取消',
    '__process__': '处理',
    '__nextAuditor__': '下一审核人',
    '__detail__': '详情',
    '__applicant__': '申请人',
    '__auditor__': '审核人',
    '__status__': '状态',
    '__cTime__': '创建时间',
    '__endTime__': '结束时间',
    '__workflow__': '工作流',
    apply: {
      'numberMessage': '请输入数字',
      'longTextMessage': '请输入小于10000个字符',
      'requiredMessage': '请输入',
      'save': '保存',
      'cancel': '取消',
      'add': '新增',
      'editConfig': '编辑配置',
      'detail': '详情',
      'delete': '删除',
      'edit': '编辑',
      'operateSuccess': '操作成功',
      'operation': '操作',
      'more': '更多',
      'search': '搜索',
      'reset': '重置',
      'searchFields': [],
      'headerCols': [
        {
          list: true,
          field: 'workflow',
          label: '__workflow__',
          width: 3
        },
        {
          list: true,
          field: 'cTime',
          label: '__cTime__',
          width: 3
        },
        {
          list: true,
          field: 'auditor',
          label: '__auditor__',
          width: 3
        },
        {
          list: true,
          field: 'status',
          label: '__status__',
          width: 3
        }
      ],
      'operateOpts': [
        {
          'label': '__cancel__',
          'auth': 'cancel'
        }
      ]
    },
    audit: {
      'numberMessage': '请输入数字',
      'longTextMessage': '请输入小于10000个字符',
      'requiredMessage': '请输入',
      'save': '保存',
      'cancel': '取消',
      'add': '新增',
      'editConfig': '编辑配置',
      'detail': '详情',
      'delete': '删除',
      'edit': '编辑',
      'operateSuccess': '操作成功',
      'operation': '操作',
      'more': '更多',
      'search': '搜索',
      'reset': '重置',
      'searchFields': [],
      'headerCols': [
        {
          list: true,
          field: 'workflow',
          label: '__workflow__',
          width: 3
        },
        {
          list: true,
          field: 'applicant',
          label: '__applicant__',
          width: 3
        },
        {
          list: true,
          field: 'nextAuditor',
          label: '__nextAuditor__',
          width: 3
        },
        {
          list: true,
          field: 'cTime',
          label: '__cTime__',
          width: 3
        }
      ],
      'operateOpts': [
        {
          'label': '__process__',
          'auth': 'process'
        }
      ]
    },
    history: {
      'numberMessage': '请输入数字',
      'longTextMessage': '请输入小于10000个字符',
      'requiredMessage': '请输入',
      'save': '保存',
      'cancel': '取消',
      'add': '新增',
      'editConfig': '编辑配置',
      'detail': '详情',
      'delete': '删除',
      'edit': '编辑',
      'operateSuccess': '操作成功',
      'operation': '操作',
      'more': '更多',
      'search': '搜索',
      'reset': '重置',
      'searchFields': [],
      'headerCols': [
        {
          list: true,
          field: 'workflow',
          label: '__workflow__',
          width: 3
        },
        {
          list: true,
          field: 'applicant',
          label: '__applicant__',
          width: 3
        },
        {
          list: true,
          field: 'auditor',
          label: '__auditor__',
          width: 3
        },
        {
          list: true,
          field: 'status',
          label: '__status__',
          width: 3
        },
        {
          list: true,
          field: 'cTime',
          label: '__cTime__',
          width: 3
        },
        {
          list: true,
          field: 'endTime',
          label: '__endTime__',
          width: 3
        }
      ],
      'operateOpts': [
        {
          'label': '__detail__',
          'auth': 'checkHistory'
        }
      ]
    }
  },
  sign: {
    'accountNameNotMatch': '帐号密码不一致',
    'pleaseLogin': '请先登陆',
    'tooltip': '提示',
    'confirm': '确定',
    'confirmPwd': '确认密码',
    'pwdNoMatch': '密码与确认密码不一致',
    'login': '登陆',
    'pwdAndConfirm': '密码/确认密码',
    'name': '名称',
    'signUp': '注册',
    'userName': '名称',
    'networkError': '网络错误',
    'password': '密码',
    'notEmpty': '不能为空'
  }
}
export default struct
