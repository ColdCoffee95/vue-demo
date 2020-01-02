<template>
  <Layout>
    <Header>
      <myHeader></myHeader>
    </Header>
    <Layout>
      <Sider hide-trigger :width="240">
        <mySider></mySider>
      </Sider>
      <Content class="main-content">
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <router-view></router-view>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import myHeader from "./header";
import mySider from "./sider";
export default {
  components: { mySider, myHeader }
};
</script>
<style>
.ivu-layout, .ivu-layout-content{
  height: 100%;
}
.main-content{
    margin: 16px;
}
</style>