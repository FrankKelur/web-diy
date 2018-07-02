<template lang="pug">
  .form-set
    el-row(:gutter="10" type="flex" justify='end').oper-container.clear-float.theme-border-D
      el-col(:span="3")
        b-button(@click='saveEnable' v-ellipsis-title="" type="primary") {{rdata.save}}
      el-col(:span="3" v-if="page")
        b-button(@click='deletePage' v-ellipsis-title="") {{rdata.delete}}
    .content.theme-bg-H
      .left.draggable-item-container
        .title.theme-color-A {{rdata.controlBase}}
        .item.theme-bg-H.theme-border-D.theme-border-A-hover.theme-color-C(v-for="(temp, $index) in templateList", :key="temp.icon", :idx="$index",  v-draggable="handler", origin='left')
          b-icon.template-icon(:iconName="temp.icon")
          span {{temp.label}}
      .middle.theme-bg-I
        el-form.middle-container(label-width="140px", :model="model", ref="tmpForm", label-position="left")
          .title {{auditInfo.name}}
          .item(v-for="(item, $index) in formItems", :key="item.key", :idx="$index",  v-dropable="handler", @click="currItem=item")
            .operate-menu
              .icon-conatainer(v-draggable="handler", :idx="$index", origin='middle')
                b-icon(iconName='move')
              .icon-conatainer
                b-icon(iconName='delete', @click.native="deleteFormItem($index)")
            el-form-item(:prop="item.key", :rules="getRules(item)", :key="$index")
              span.inline-label(slot="label", v-ellipsis-title="", :class="{'theme-color-A': currItem===item}") {{item.type=='clause'?'':item.label}}
              b-form-item(:model.sync='model[item.key]', :item='item', @change="itemChange", :rdata="rdata")
          .blank-item(v-dropable="handler", :idx="formItems.length")
            .line
              b-icon(iconName='move1', size="50px")
            .line {{rdata.addControlCreatorAudit}}
      .right
        el-tabs(v-model='activePane')
          el-tab-pane(name="1", :label="rdata.workflowInfo")
            el-form(ref="auditInfoForm", :rules="rules", :model="auditInfo", label-position="left").form-info
              el-form-item(prop="name", :label="rdata.workflowName")
                b-input(:model.sync="auditInfo.name", :placeholder="rdata.pleaseInput")
              el-form-item(prop="pid", :label="rdata.pageId")
                b-input(:model.sync="auditInfo.pid", :placeholder="rdata.pleaseInput")
              el-form-item(prop="listUrl", :label="rdata.listUrl")
                b-input(:model.sync="auditInfo.listUrl", :placeholder="rdata.pleaseInput")
              .form-item-title.theme-color-D {{rdata.operations}}
              el-form-item(prop="detailUrl", :label="rdata.detailUrl")
                b-input(:model.sync="auditInfo.detailUrl", :placeholder="rdata.pleaseInput")
              el-form-item(prop="deleteUrl", :label="rdata.deleteUrl")
                b-input(:model.sync="auditInfo.deleteUrl", :placeholder="rdata.pleaseInput")
                b-input(:model.sync="auditInfo.deleteValidator", :placeholder="rdata.validator" type="textarea" :rows="4")
              el-form-item(prop="editUrl", :label="rdata.editUrl")
                b-input(:model.sync="auditInfo.editUrl", :placeholder="rdata.pleaseInput")
                b-input(:model.sync="auditInfo.editValidator", :placeholder="rdata.validator" type="textarea" :rows="4")
              el-form-item(v-for='(item, key) in auditInfo.operations' :label="item.label" :key="key")
                b-input(:model.sync="item.url", :placeholder="rdata.pleaseInput")
                b-input(:model.sync="item.validator", :placeholder="rdata.validator" type="textarea" :rows="4")
              el-form-item
                template(slot="label")
                  b-input(:placeholder="rdata.newOperationLabel", :model.sync="newOperation.label")
                b-input(:placeholder="rdata.newOperationUrl", :model.sync="newOperation.url")
                  b-icon.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="addOperation" slot="append")
                //b-icon.theme-color-C.theme-color-G-hover(iconName='message_failure', @click.native="clearOperation")
          el-tab-pane(name="2", :label="rdata.controlSet")
            form-item-set(v-for="(item, $index) in formItems",:key='$index', v-show="currItem==item", :item="item", :rdata="rdata", :allFormItems="formItems", ref="formItemSet")

</template>

<script>
  import service from './service'
  import { validator, constants } from 'common/js/Utils'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BUpload from 'components/BUpload'
  import BFormItem from 'components/BFormItem'
  import FormItemSet from './modules/FormItemSet'

  export default {
    name: 'form-set',
    data () {
      var _this = this
      var pid = 'pid_' + new Date().getTime()
      return {
        page: this.$router.currentRoute.query.page,
        allFieldsMap: {},
        rdata: service.getRenderDataSync({page: 'editor'}),
        formSet: {},
        currItem: {},
        newOperation: {
          label: '',
          validator: '',
          url: ''
        },
        auditInfo: {
          pid: pid,
          editValidator: '',
          deleteValidator: '',
          name: '',
          operations: [],
          'listUrl': '/api/data/list?page=' + pid,
          'detailUrl': '/api/data/detail?page=' + pid,
          'deleteUrl': '/api/data/delete?page=' + pid,
          'editUrl': '/api/data/edit?page=' + pid
        },
        activePane: '1',
        formItems: [],
        handler: {
          drop (event) {
            var el = event.target
            if (!el.getAttribute('dropable')) {
              return
            }
            var origin = event.dataTransfer.getData('origin')
            var sourceIdx = parseInt(event.dataTransfer.getData('sourceIdx'))
            var targetIdx = parseInt(event.target.getAttribute('idx'))
            if (origin === 'middle') {
              var sourceData = _this.formItems[sourceIdx]
              _this.formItems.splice(targetIdx + 1, 0, sourceData)
              if (sourceIdx < targetIdx + 1) {
                _this.formItems.splice(sourceIdx, 1)
              } else {
                _this.formItems.splice(sourceIdx + 1, 1)
              }
            } else {
              // 添加到target下
              var template = _this.templateList[sourceIdx]
              var newItem = Object.assign({
                label: '',
                placeholder: '',
                key: '',
                rules: []
              }, template)
              if (targetIdx === _this.formItems.length) {
                _this.formItems.splice(0, 0, newItem)
              } else {
                _this.formItems.splice(targetIdx + 1, 0, newItem)
              }
            }
            el.className = el.className.replace(/dragenter/g, '').replace(/theme\\-border\\-D/g, '')
          },
          dragstart (event) {
            event.dataTransfer.setData('sourceIdx', event.target.getAttribute('idx'))
            event.dataTransfer.setData('origin', event.target.getAttribute('origin'))
          }
        },
        model: {}
      }
    },
    created () {
      var params = {page: 'editor'}
      service.getRenderData(params).then(res => {
        Object.assign(this.rdata, res)
      })
    },
    computed: {
      templateList () {
        return [
          {
            type: 'input',
            icon: 'inputbox',
            label: this.rdata.singleLineInputBox,
            list: true,
            detail: true,
            search: true,
            edit: true
          },
          {
            type: 'textarea',
            icon: 'multilineinputbox',
            label: this.rdata.multipleInputBox,
            list: true,
            detail: true,
            search: true,
            edit: true
          },
          {
            type: 'select',
            icon: 'radio',
            dataSource: [],
            label: this.rdata.radio,
            list: true,
            detail: true,
            search: true,
            edit: true
          },
          {
            type: 'select',
            icon: 'checkbox',
            multiple: true,
            dataSource: [],
            label: this.rdata.checkbox,
            list: true,
            detail: true,
            search: true,
            edit: true
          },
          {
            type: 'datetime',
            icon: 'date',
            label: this.rdata.dateTime,
            list: true,
            detail: true,
            search: true,
            edit: true
          },
          {
            type: 'text',
            icon: 'explanatorytext',
            label: this.rdata.caption,
            list: false,
            detail: true,
            search: false,
            edit: true
          }
          // {
          //   type: 'upload',
          //   icon: 'file',
          //   label: this.rdata.enclosure
          // },
          // {
          //   type: 'cascadeSelect',
          //   icon: 'Group',
          //   label: this.rdata.cascadeInquire,
          //   follow: [],
          //   dataSource: ''
          // }
        ]
      },
      regexObj () {
        return {
          longText: {
            name: 'longText',
            label: this.rdata.longTextRule,
            rule: {
              name: 'longText',
              regex: constants.longTextRule,
              validator: validator.validate,
              message: this.rdata.content1000More,
              trigger: 'blur'
            }
          },
          number: {
            name: 'number',
            label: this.rdata.numberRule,
            rule: {
              name: 'number',
              regex: constants.numberRule,
              validator: validator.validate,
              message: this.rdata.pleaseInput,
              trigger: 'blur'
            }
          },
          required: {
            name: 'required',
            label: this.rdata.required,
            rule: {
              name: 'required',
              required: true,
              message: this.rdata.pleaseInput,
              trigger: 'blur'
            }
          }
        }
      },
      rules () {
        return {
          name: [
            {
              required: true,
              message: this.rdata.pleaseInput,
              trigger: 'blur'
            },
            {
              validator: validator.validate,
              message: this.rdata.noAllowSpace,
              test (val) {
                return val.trim() === val
              },
              trigger: 'blur'
            }
          ],
          listUrl: [
            {
              required: true,
              message: this.rdata.pleaseInput,
              trigger: 'blur'
            }
          ],
          deleteUrl: [
            {
              required: true,
              message: this.rdata.pleaseInput,
              trigger: 'blur'
            }
          ],
          detailUrl: [
            {
              required: true,
              message: this.rdata.pleaseInput,
              trigger: 'blur'
            }
          ],
          pid: [
            {
              required: true,
              message: this.rdata.pleaseInput,
              trigger: 'blur'
            }
          ],
          editUrl: [
            {
              required: true,
              message: this.rdata.pleaseInput,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      addOperation () {
        this.auditInfo.operations.push(Object.assign({}, this.newOperation))
        this.clearOperation()
      },
      clearOperation () {
        this.newOperation = {url: '', label: '', validator: ''}
      },
      getRules (item) {
        var res = (item.rules || []).reduce((res, ruleItem) => {
          var rule = constants.ruleMap[ruleItem]
          if (ruleItem === 'required' && item.type === 'clause') {
            res.push({
              name: 'required',
              validator: validator.validate,
              test (val) {
                return !!val // 要求checkbox 必须为true
              },
              message: this.rdata[ruleItem],
              trigger: ['blur', 'change']
            })
          } else if (ruleItem === 'required' && item.type === 'upload') {
            res.push({
              name: 'required',
              validator: validator.validate,
              test (val) {
                return !!val.url // 要求upload 必须为有url
              },
              message: this.rdata['required'],
              trigger: ['blur', 'change']
            })
          } else if (ruleItem.includes('api')) {
            res.push({
              name: ruleItem,
              trigger: ['blur', 'change'],
              test (val) {
                var params = {key: val}
                Object.assign(params, item.params)
                return fetch(ruleItem, params)
              },
              validator: validator.validate
            })
          } else {
            rule.message = this.rdata[ruleItem]
            res.push(rule)
          }

          return res
        }, [])
        return res
      },
      itemChange (item, val) {
        var beDependentItems = item.beDependentItems || []
        beDependentItems.forEach(elm => {
          this.model[elm.key] = ''
          this.itemChange(elm, '')
          if (!elm.params) {
            this.$set(elm, 'params', {[item.key]: this.model[item.key]})
          } else {
            elm.params[item.key] = this.model[item.key]
          }
        })
      },
      validateForm () {
        this.$refs['tmpForm'].validate()
      },
      deletePage () {
        this.$alert(this.rdata.deleteMSG, this.rdata.delete, {
          confirmButtonText: this.rdata.confirm,
          callback: action => {
            if (action === 'confirm') {
              var params = {
                pid: this.page
              }
              service.deletePage(params).then(res => {
                if (res.re === '200') {
                  this.$message.success(this.rdata.operateSuccess)
                  window.location.href = '/#/admin/editor'
                  window.location.reload()
                }
              })
            }
          }
        })
      },
      saveEnable () {
        var valid = true
        this.$refs['auditInfoForm'].validate(re => {
          valid = re && valid
          if (!valid) {
            this.activePane = '1'
          }
        })
        this.$refs['formItemSet'].forEach((form, idx) => {
          form.validate(res => {
            if (!valid) return
            valid = valid && res
            if (!valid) {
              this.activePane = '2'
              this.currItem = this.formItems[idx]
            }
          })
        })
        if (valid) {
          var params = {
            ...this.auditInfo,
            formItems: this.formItems
          }
          service.saveEnable(params).then(res => {
            this.$message({type: 'success', message: this.rdata.operateSuccess})
            window.location.reload()
          })
        }
      },
      deleteFormItem (idx) {
        this.formItems.splice(idx, 1)
      },
      getAuditInfo (page) {
        return service.getAuditInfo(page).then(res => {
          Object.assign(this.auditInfo, res.data)
          this.formItems = res.data.formItems
          this.formItems.forEach(item => {
            this.$set(item, 'value', '')
          })
        })
      }
    },
    mounted () {
      if (this.page) {
        this.getAuditInfo(this.page)
      }
    },
    components: {
      BButton,
      BIcon,
      BFormItem,
      FormItemSet,
      BUpload,
      BInput
    },
    watch: {
      formItems (newVal, oldVal) {
        if (this.formItems.length === 1) {
          this.currItem = this.formItems[0]
        }
        this.formItems.forEach(item => {
          this.allFieldsMap[item.key] = item
          item.beDependentItems = []
          // 给每个字段赋值
          this.$set(this.model, item.key, item.value || '')
        })
        // 给每个被依赖的form-item 添加 beDependentItems 数组，存放哪些form-item依赖该 form-item
        this.formItems.forEach(item => {
          (item.follow || []).forEach(elm => {
            var target = this.allFieldsMap[elm.key]
            target.beDependentItems.push(item)
          })
        })
      }
    }
  }
</script>

<style lang="less">
  .oper-container {
    .el-col {
      .el-button {
        width: 100% !important;
      }
    }
    padding-bottom: 12px;
  }

  .form-set {
    height: 100%;
    min-width: 1153px;
    overflow: hidden;
    .oper-container {
      border: solid;
      border-bottom-width: 1px;
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
      padding-bottom: 12px;
    }
    .content {
      height: 100%;
      display: flex;
      align-items: stretch;

      .left {
        padding: 15px 10px;
        overflow-y: auto;
        display: inline-block;
        vertical-align: top;
        width: 13%;
        .title {
          font-size: 16px;
          letter-spacing: 0;
          line-height: 14px;
          margin-bottom: 20px;
        }
        .item {
          border-width: 1px;
          border-style: dotted;
          border-radius: 4px;
          line-height: 36px;
          height: 36px;
          padding: 0px 10px;
          margin-bottom: 20px;
        }
        .template-icon {
          margin-right: 5px;
        }
      }

      .middle {
        padding: 15px 10px;
        overflow-y: auto;
        display: inline-block;
        vertical-align: top;
        width: 50%;
        .el-form-item.is-required .el-form-item__label:before {
          position: relative;
          top: -14px;
        }
        .title {
          font-size: 16px;
          letter-spacing: 0;
          line-height: 14px;
          margin-bottom: 20px;
        }
        .middle-container {
          display: flex;
          flex-direction: column;
          .b-date-picker {
            width: 100%;
          }
          .item {
            position: relative;
            &:hover {
              .operate-menu {
                display: block !important;
              }
            }
            .operate-menu {
              position: absolute;
              right: 0;
              z-index: 1;
              display: none;
              .icon-conatainer {
                display: inline-block;
              }
              .b-icon {
                margin-left: 15px;
              }
            }
            .el-form-item {
              margin-top: 20px !important;
            }
          }
          .blank-item {
            padding: 55px 0;
            flex-grow: 1;
            min-height: 250px;
            .line {
              text-align: center;
            }
          }
        }
      }

      .right {
        padding: 15px 10px;
        overflow-y: auto;
        display: inline-block;
        vertical-align: top;
        flex-grow: 1;
        .form-item-title {
          margin-bottom: 20px;
          font-weight: bold;
        }
        .form-info {
          .el-form-item__label {
            width: 30%;
          }
          .el-form-item__content {
            width: 65%;
            display: inline-block;
          }
        }
        .icon-item {
          width: 36px;
          height: 36px;
          position: relative;
          display: inline-block;
          border-width: 1px;
          border-style: solid;
          margin-right: 20px;
          text-align: center;
          .b-icon {
            position: relative;
            top: 3px;
          }
        }
        .b-upload {
          margin-top: 20px;
        }
      }
    }
  }
</style>
