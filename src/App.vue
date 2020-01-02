<template>
  <div id="app">
    <Layout>
      <router-view name="header"></router-view>
      <router-view name="sider"></router-view>
      <router-view name="content"></router-view>
    </Layout>
    
  </div>
</template>

<script>
import Layout from './layout';
export default {
  name: 'app',
  components:{Layout}
}
</script>
<style>
#app,.layout{
  width: 100%;
  height: 100%;
}

</style>