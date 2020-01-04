<template>
  <div class="tree-input">
    <Input placeholder="请输入编码" class="small-input" v-model="idValue" v-if="type === 'add'" />
    <Input placeholder="请输入名称" class="large-input" v-model="nameValue" />
    <Button type="primary" @click="inputSubmit">确定</Button>
    <Button @click="inputCancel">取消</Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      idValue: this.idInput,
      nameValue: this.nameInput
    };
  },
  props: {
    idInput: {
      default: ""
    },
    nameInput: {
      default: ""
    },
    type: {
      default: "add"
    }
  },
  methods: {
    inputSubmit() {
      this.$emit("onSubmit", {
        id: this.idValue,
        name: this.nameValue,
        type: this.type
      });
    },
    inputCancel() {
      this.$emit("onCancel", { type: this.type });
    }
  }
};
</script>
<style lang="less">
.tree-input {
  width: 300px;
  .small-input {
    width: 140px;
  }
  .large-input {
    width: 240px;
    margin-left: 10px;
  }
  button {
    margin-left: 10px;
  }
}
</style>