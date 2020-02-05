<template>
  <div class="tree-input">
    <Modal
      @on-ok="inputSubmit"
      @on-cancel="inputCancel"
      @on-visible-change="onVisibleChange"
      :value="visible"
      :width="300"
      title="标题"
    >
      <div class="input-div">
        <Input placeholder="请输入编码" class="small-input" v-model="idValue" v-if="type === 'add'" />
        <Input placeholder="请输入名称" class="large-input" v-model="nameValue" />
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      idValue: this.idInput,
      nameValue: this.nameInput,
    };
  },
  watch:{
    idInput:function(newVal){
      this.idValue = newVal;
    },
    nameInput:function(newVal){
      this.nameValue = newVal;
    }
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
    },
    visible:{
      default: false
    },
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
    },
    clearModal(){
      this.idValue = ''
      this.nameValue = ''
    },
    onVisibleChange(visible){
      !visible && this.clearModal();
    }
  }
};
</script>
<style lang="less">
.input-div{
  width:300px;
  .small-input {
    width: 240px;
    display: block;
  }
  .large-input {
    width: 240px;
    margin-top:20px;
    display: block;
  }
}
</style>