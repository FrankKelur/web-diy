<template lang="pug">
  el-pagination.b-pagination(@size-change="handleSizeChange", @current-change='handleCurrentChange', :current-page='pagination.currPage', :page-sizes='pagination.pageSizes', :page-size='pagination.pageSize', :layout="layout", :total='pagination.total')
</template>

<script>
  import BFormItem from 'components/BFormItem'
  import styleMixinLess from './styleMixin.txt'
  import styleMixin from 'common/js/styleMixin'

  export default {
    name: 'b-pagination',
    mixins: [styleMixin],
    data () {
      return {
        styleMixinLess: styleMixinLess
      }
    },
    components: {
      BFormItem
    },
    methods: {
      clickHandle (item) {
        if (item.handler === 'search') {
          this.$emit('search')
        } else if (item.handler === 'reset') {
          this.$emit('reset')
        }
      },
      handleSizeChange (pageSize) {
        this.pagination.pageSize = pageSize
        this.$emit('size-change')
      },
      handleCurrentChange (currPage) {
        this.pagination.currPage = currPage
        this.$emit('current-change')
      }
    },
    computed: {
    },
    props: {
      pagination: {
        type: Object,
        required: true
      },
      layout: {
        type: String,
        default: 'prev,pager,next,jumper,->,total'
      }
    },
    mounted () {}
  }
</script>

<style lang="less" >
  .b-pagination {
    display: inline-block;
    .el-pagination__total {
      margin-right: 20px;
    }
    .el-pagination__total, .el-pagination__jump {
      color: inherit;
    }
    .el-pagination__jump .el-pagination__editor {
      margin: 0 6px;
    }
    .btn-prev {
      margin-left: 20px !important;
    }
    input.el-input__inner {
      padding-bottom: 4px !important;
    }
  }
</style>

<style lang="less" >
  .theme-simple {
    .b-pagination {
    display: inline-block;
    .el-pagination__total {
      margin-right: 20px;
    }
    .el-pagination__total, .el-pagination__jump {
      color: inherit;
    }
    .el-pagination__jump .el-pagination__editor {
      margin: 0 6px;
    }
    .btn-prev {
      margin-left: 20px !important;
    }
    input.el-input__inner {
      padding-bottom: 4px !important;
    }
  }
  }
</style>
