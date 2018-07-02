<template lang="pug">
  .layout(:class="[config.layout, 'theme-'+config.theme]")
    .container.clear-float
      .nav-container.theme-bg-B
        admin-nav(:rdata="rdata", :config="config")
      .content.theme-bg-H
        admin-header(:rdata="rdata" @refresh="refresh" :config="config")
        router-view
</template>

<script>
  import adminNav from './modules/admin-nav'
  import adminHeader from './modules/admin-header'
  import service from './service'

  export default {
    name: 'admin-layout',
    data () {
      return {
        config: {
          layout: 'vertical',
          theme: 'default',
          colors: [],
          text: {}
        },
        rdata: service.getRenderDataSync({page: 'admin'})
      }
    },
    methods: {
      async refresh (type) {
        console.log('refresh type', type)
        if (type === 'colors') {
          window.changeColor.forEach(fn => fn(this.config.colors))
        }
        await service.setConfig(this.config)
        if (type === 'text') {
          window.location.reload()
        }
      },
      getConfig () {
        return service.getConfig().then(({data}) => {
          this.config = data
          Object.assign(this.rdata, service.getRenderData('admin', data.text))
          window.changeColor.forEach(fn => fn(data.colors))
        })
      }
    },
    mounted () {
      this.getConfig()
    },
    components: {
      adminNav,
      adminHeader
    }
  }
</script>

<style lang="less">
  .layout.vertical {
    height: 100%;
    > .container {
      height: 100%;
      display: flex;
      flex-direction: column;
      .nav-container {
        padding: 0 20px;
        .admin-nav {
          margin: auto;
          width: 1200px;
        }
      }
      > .content {
        padding: 20px;
        margin: auto;
        width: 1200px;
        position: relative;
        flex-grow: 1;
        overflow-y: auto;
        background-size: 0 0;
      }
    }
  }

  .layout.horizontal {
    height: 100%;
    display: flex;
    flex-direction: column;
    > .container {
      flex-grow: 1;
      display: flex;
      height: 100%;
      > .nav-container {
        width: 200px;
        padding: 50px 0;
      }
      > .content {
        padding: 20px;
        position: relative;
        flex-grow: 1;
        overflow-y: auto;
        background-size: 0 0;
      }
    }
  }

</style>
