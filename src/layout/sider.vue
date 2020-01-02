<template>
  <Menu :open-names="['1']">
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-paper" />组件管理
      </template>
      <MenuItem name="1-1" :to="{name:'uploadPage'}">上传组件</MenuItem>
      <MenuItem name="1-2" :to="{name:'tree'}">树组件</MenuItem>
    </Submenu>
  </Menu>
</template>
<script>
export default {
  methods:{

  }
}
</script>