<template lang="pug">
  .b-table(v-cloak='')
    el-table(:data="tableData" style="width:100%", @row-click='handleRowClick', v-loading="loading", @sort-change="sortChange", :row-class-name="getRowClass", ref="bTable", @selection-change="selectionChange")
      el-table-column(type="expand" v-if="tableType.expand && computedHeaderCols.length!==0")
        template(slot-scope="scope")
          slot(name="expand", :computedHeaderCols="computedHeaderCols", :otherCols="otherCols", :computedOpts="computedOpts", :row="scope.row", :operateOpts="rdata.operateOpts")
      el-table-column(type="selection", width="55" v-if="rdata.multipleSelect")
      el-table-column(:label='col.label', :render-header="headerRenderFun", v-for="col in computedHeaderCols", :key='col.field', :sortable="col.sortable", :prop="col.field", :formatter="formatter(col)")

      el-table-column.el-table-scroll(:label="rdata.more" v-if="otherCols.length")
        template(slot-scope="scope")
          el-popover.theme-color-H(trigger="click" placement="bottom" ref="popoverMore")
            .el-popover-item-intable(v-for="(col, idx) in otherCols", :key="idx")
              template(v-if="!col.isGroup")
                .left(v-text='col.label' v-ellipsis-title="")
                .right(v-text='getLabel(scope.row[col.field])' v-ellipsis-title="")
              template(v-else)
                .title.theme-color-D {{col.label}}
                .line-item(v-for="(item, key) in scope.row[col.field]", :key="key")
                  .left(v-text='col.fieldTextMap[key]||key' v-ellipsis-title="")
                  .right(v-text='getLabel(item, key)' v-ellipsis-title="")
            b-icon.pointer.theme-color-lightenC32.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="more", slot="reference")

      el-table-column(:label="rdata.operation" align='center' v-if="rdata.operateOpts && rdata.operateOpts.length")
        template(slot-scope="scope")
          a.link.theme-color-A.pointer(v-if="computedOpts.length==1", @click="handleCommand(computedOpts[0].auth, scope.row, computedOpts[0])") {{computedOpts[0].label}}
          el-dropdown.theme-color-lightenC32.theme-color-lightenA10-hover.theme-color-darkenA10-active(@command="handleCommand" trigger='click', v-if="computedOpts.length > 1")
            span.el-dropdown-link
              b-icon.pointer(iconName="operation")
            el-dropdown-menu.ipt-class.theme-bg-H(slot="dropdown")
              el-dropdown-item.theme-bg-lightenD12-hover.theme-color-C.theme-color-C-hover(:command='op.auth' v-for="op in computedOpts" v-text="op.label", :key='op.auth', v-if="opValidate(op, scope.row)")

    .batch-operate(v-if="rdata.multipleSelect")
      slot(name="batchOperate", :total="pagination.total")
    .pagination
      b-pagination(v-if="!!pagination.total", @size-change="handleSizeChange", @current-change='handleCurrentChange', :layout="layout", :pagination="pagination")
</template>

<script>
  import { constants } from 'common/js/Utils'
  import service from './service'
  import BIcon from 'components/BIcon'
  import BTooltip from 'components/BTooltip'
  import BPagination from 'components/BPagination'
  import styleMixinLess from './styleMixin.txt'
  import styleMixin from 'common/js/styleMixin'

  export default {
    name: 'b-table',
    mixins: [styleMixin],
    data () {
      return {
        styleMixinLess: styleMixinLess,
        loading: false,
        currRow: {},
        tableData: []
      }
    },
    props: {
      uid: {
        type: String
      },
      getRowClass: {
        type: Function,
        default: function () {
          return function ({row, rowIndex}) {
            return ''
          }
        }
      },
      optsFilter: {
        type: Function
      },
      params: {
        type: Object,
        default: function () {
          return {}
        }
      },
      url: {
        type: String,
        required: true
      },
      parentModel: {
        type: Object,
        default: function () {
          return {}
        }
      },
      pagination: {
        type: Object,
        default: function () {
          var vm = this
          return {
            currPage: 1,
            pageSizes: constants.pages,
            pageSize: constants.pages[0],
            total: 0,
            target_uid: vm.uid
          }
        }
      },
      optHandler: {
        type: Object
      },
      rdata: {
        type: Object,
        required: true
      },
      searchData: {
        type: Object,
        default: function () {
          return {}
        }
      },
      valueKey: {
        type: String
      },
      selectedRows: {
        type: Array
      },
      tableType: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    methods: {
      opValidate (op, row) {
        if (op.validator) {
          console.log('op.validator', op.validator)
          /* eslint-disable */
          return eval(op.validator)
        }
        return true
      },
      headerRenderFun (h, {column, $index}) {
        var col = this.computedHeaderCols[$index]
        var element = [h('span', {
          class: ['header-span'],
          directives: [{
            name: 'ellipsis-title',
            value: column.label
          }]
        }, column.label)]
        if (col && col.tooltip) {
          element.push(h(BTooltip, {
              class: ['item'],
              props: {content: col.tooltip, effect: 'dark', placement: 'top'}
            }, [
              h(BIcon, {
                class: ['header-icon', 'theme-color-darkenC15', 'theme-color-lightenA10-hover', 'theme-color-darkenA10-active', 'tabPopover1'],
                props: {iconName: 'info', size: '14px'}
              })]
          ))
        }
        return element
      },
      formatter (col) {
        var colWithFun = this.rdata.headerCols.find(elm => elm.field === col.field) // colWithFun 有 formatter
        var formatter = colWithFun.formatter
        var _this = this
        var h = _this.$createElement
        return function (row, column) {
          if (typeof formatter === 'function') {
            return formatter(row, column, _this.getLabel)
          }
          if (Array.isArray(row[column.property])) {
            return h('span', {
              class: ['table-cell'],
              directives: [{
                name: 'ellipsis-title',
                value: _this.showLabel(row[column.property])
              }]
            }, _this.showLabel(row[column.property]))
          }
          return h('span', {
            class: ['table-cell'],
            directives: [{
              name: 'ellipsis-title',
              value: _this.getLabel(row[column.property], col, column)
            }]
          }, _this.getLabel(row[column.property], col, column))
        }
      },
      sortChange (col) {
        if (col.column.sortable === true) {
          return
        }
        var {prop, order} = col
        this.searchData.sort_by = {
          key: prop,
          val: order
        }
        this.refresh()
      },
      handleRowClick (row, event) {
        if (event.target.nodeName !== 'INPUT') {
          this.currRow = row
        }
      },
      getLabel (field, col, column) {
        if (typeof field === 'object') {
          return field.label
        } else if (col.type === 'datetime') {
          return new Date(field).toDateString()
        } else {
          return field
        }
      },
      handleCommand (command, row, op) {
        var rdata = Object.assign(this.rdata, this.rdata.operateOpts.find(opt => opt.auth === command)[command])
        this.optHandler[command](Object.keys(this.currRow).length ? this.currRow : row, rdata, op)
      },
      handleSizeChange () {
//        this.searchData = this.searchDataBak
        Object.assign(this.searchData, this.searchDataBak)
        this.refresh()
      },
      handleCurrentChange (page) {
        Object.assign(this.searchData, this.searchDataBak)
        this.refresh()
      },
      async refresh () {
        await this.getData()
        if (this.rdata.multipleSelect) {
          this.toggleSelectedRow(this.tableData)
        }
      },
      getData () {
        //  根据pagination.currPage, pagination.pageSize searchData 获取，数据
        this.loading = true
        var params = Object.assign({
          pageSize: this.pagination.pageSize,
          startNum: (this.pagination.currPage - 1) * this.pagination.pageSize,
          searchData: Object.assign({}, this.params, this.searchData)
        })
        return service.getData(this.url, params).then(res => {
          this.tableData = res.detail
          this.pagination.total = res.total_num || 0
          this.loading = false
        })
      },
      getTableData () {
        return this.tableData
      },
      selectionChange (selectedRows) {
        var unSelectedRows = this.tableData.filter(row => !selectedRows.find(item => item[this.valueKey] === row[this.valueKey]))
        this.$emit('selection-change', selectedRows, unSelectedRows)
      },
      toggleSelectedRow (tableData) {
        tableData.forEach(row => {
          this.$refs['bTable'].toggleRowSelection(row, !!this.selectedRows.find(item => item.user_name === row.user_name))
        })
      },
      search () {
        this.pagination.currPage = 1
        this.searchDataBak = Object.assign({}, this.searchData)
        this.refresh()
      },
      showFile (item) {
//        window.open('http://www.baidu.com')
      },
      showLabel (data) {
        if (data.length < 2) {
          return data
        }
        var label = ''
        data.forEach(function (val, index) {
          label = label + val + ','
        })
        return label.slice(0, label.length - 1)
      }
    },
    computed: {
      computedOpts () {
        if (typeof this.optsFilter === 'function') {
          return this.optsFilter(this.rdata.operateOpts, this.currRow)
        }
        return this.rdata.operateOpts || []
      },
      computedHeaderCols () {
        var headerCols = JSON.parse(JSON.stringify(this.rdata.headerCols)).filter(item => item.list)
        if (this.computedOpts.length && headerCols.length > 8) {
          headerCols.splice(7)
        }
        if (!this.computedOpts.length && headerCols.length > 9) {
          headerCols.splice(8)
        }
        return headerCols
      },
      otherCols () {
        var headerCols = JSON.parse(JSON.stringify(this.rdata.headerCols)).filter(item => item.list)
        if (this.computedOpts.length && headerCols.length > 8) {
          return headerCols.splice(7)
        }
        if (!this.computedOpts.length && headerCols.length > 9) {
          return headerCols.splice(8)
        }
        return []
      },
      layout () {
        if (this.pagination.pageSizes) {
          return 'total, sizes, prev, pager, next, jumper'
        } else {
          return 'prev, pager, next'
        }
      }
    },
    watch: {
      selectedRows: {
        handler () {
          this.toggleSelectedRow(this.tableData || [])
        },
        deep: true
      }
    },
    async mounted () {
      this.tableData = this.parentModel.tableData || []
      await this.refresh()
    },
    components: {
      BIcon,
      BTooltip,
      BPagination
    }
  }
</script>

<style lang="less">
  .theme-simple {
    .header-icon {
      margin-left: 0;
    }

    .el-table-scroll {
      overflow: auto;
    }

    .el-popover-item-intable {
      .title {
        margin-top: 10px;
      }
      line-height: 26px;
      .left {
        width: 45%;
        display: inline-block;
      }
      .right {
        width: 50%;
        padding-left: 10px;
        display: inline-block;
      }
      span:nth-child(2) {
        margin-left: 10px;
      }
    }

    .b-table {
      .el-table .table-cell {
        width: 100%;
        display: inline-block;
      }
      .table {
        margin-top: 16px;
      }
      .batch-operate {
        line-height: 36px;
      }
      .pagination {
        float: right;
        .el-pager li {
          min-width: 21px;
        }
      }
    }

    .header-span {
      max-width: 80%;
      vertical-align: top;
      display: inline-block;
    }

    .ipt-class {
      text-align: center !important;
    }

    .tabPopover1 {
      width: 40% !important;
      position: relative;
      top: 5px;
      left: 5px;
    }

    .b-table {
      .table-el-tooltip {
        position: relative;
        top: 5px;
        left: 5px;
      }
      .hide-expand {
        .el-table__expand-icon {
          display: none;
        }
      }
      .el-table .sort-caret.ascending {
        top: 0 !important;
      }
      .el-table .sort-caret.descending {
        bottom: 0 !important;
      }
      .img-icon-size {
        font-size: 22px;
      }
      .el-table__expanded-cell {
        padding: 0 !important;
      }
      .caret-wrapper {
        height: 23px !important;
      }
      .el-table td, .el-table th {
        padding: 8.5px 0 !important;
      }
    }
  }
</style>

<style lang="less">
  .theme-default {
    .header-icon {
      margin-left: 0;
    }

    .el-table-scroll {
      overflow: auto;
    }

    .el-popover-item-intable {
      .title {
        margin-top: 10px;
      }
      line-height: 26px;
      .left {
        width: 45%;
        display: inline-block;
      }
      .right {
        width: 50%;
        padding-left: 10px;
        display: inline-block;
      }
      span:nth-child(2) {
        margin-left: 10px;
      }
    }

    .b-table {
      .el-table .table-cell {
        width: 100%;
        display: inline-block;
      }
      .table {
        margin-top: 16px;
      }
      .batch-operate {
        line-height: 36px;
      }
      .pagination {
        float: right;
        .el-pager li {
          min-width: 21px;
        }
      }
    }

    .header-span {
      max-width: 80%;
      vertical-align: top;
      display: inline-block;
    }

    .ipt-class {
      text-align: center !important;
    }

    .tabPopover1 {
      width: 40% !important;
      position: relative;
      top: 5px;
      left: 5px;
    }

    .b-table {
      .table-el-tooltip {
        position: relative;
        top: 5px;
        left: 5px;
      }
      .hide-expand {
        .el-table__expand-icon {
          display: none;
        }
      }
      .el-table .sort-caret.ascending {
        top: 0 !important;
      }
      .el-table .sort-caret.descending {
        bottom: 0 !important;
      }
      .img-icon-size {
        font-size: 22px;
      }
      .el-table__expanded-cell {
        padding: 0 !important;
      }
      .caret-wrapper {
        height: 23px !important;
      }
      .el-table td, .el-table th {
        padding: 8.5px 0 !important;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
      }
      .el-table {
        border: 1px solid #ebeef5;
        border-right: none;
        border-bottom: none;
        .el-table__body tr:nth-child(odd) td {
          background-color: #fafafa;
        }
      }
    }
  }
</style>
