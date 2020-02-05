<template>
  <div class="tree">
    <MyTree
      :data="data"
      :load-data="loadData"
      :max-level="maxLevel"
      @append="appendThing"
      @remove="removeThing"
      @onNodeClick="onNodeClick"
      @edit="onEdit"
    ></MyTree>
    <TreeInput 
      :visible="visible"
      @onSubmit="onModalSubmit"
      @onCancel="onModalCancel"
      :type="modalType"
      :idInput="modalType === 'edit' ? operator.id:''"
      :nameInput="modalType === 'edit' ? operator.title:''"
    />
  </div>
</template>

<script>
import MyTree from "./MyTree";
import TreeInput from "./TreeInput";
export default {
  data() {
    return {
      data: [],
      visible:false,
      operator:null,//正在操作的节点
      modalType:'add'
    };
  },

  props: {
    loadFetch: {
      type: Function,
      default: () => new Promise(resolve => resolve([]))
    },
    addRequest: {
      type: Function,
      default: () => new Promise(resolve => resolve())
    },
    editRequest: {
      type: Function,
      default: () => new Promise(resolve => resolve())
    },
    removeRequest: {
      type: Function,
      default: () => new Promise(resolve => resolve())
    },
    maxLevel: {
      type: Number,
      default: 3
    }
  },

  components: { MyTree, TreeInput },

  async mounted() {
    this.data = await this.loadFetch();
  },

  methods: {
    async onModalSubmit(data){
      if(this.modalType === 'add'){
        await this.addRequest(data);
        const {level,id} = this.operator;
        const newData = {
          parentId:id,
          id:data.id,
          title: data.name,
          hasChildren: false,
          children: [],
          expand: true,
          level:level + 1
        };
        const children = this.operator.children || []
        children.push(newData);
        this.$set(this.operator, "children", children);
      }else{
        await this.editRequest(data);
        const newData = {...this.operator,title:data.name};
        this.editLineOperator(newData, false, true);
      }
      this.visible = false;
    },
    onModalCancel(){
      this.visible = false;
    },
    //根据元素的parentId递归查找其父元素
    iteratorFindParent(data, parentId, findThing) {
      for (let i = 0; i < data.length; i++) {
        let d = data[i];
        if (String(d.id) === String(parentId)) {
          findThing = d;
          break;
        } else {
          if (d.children && d.children.length > 0) {
            let isFind = this.iteratorFindParent(
              d.children,
              parentId,
              findThing
            );
            if (isFind) {
              findThing = isFind;
              break;
            }
          }
        }
      }
      return findThing;
    },

    //编辑节点处理器,data:点击编辑按钮的元素，editNode：传入true，则节点被修改为编辑状态，传入false，
    //则节点被修改为节点状态，isEditSuccess：是否编辑成功，传入true，会改变元素的name
    editLineOperator(data, editNode, isEditSuccess) {
      const findThing = this.iteratorFindParent(this.data, data.parentId, null);
      const findData = findThing.children.find(c => c.id === data.id);
      const findDataIndex = findThing.children.findIndex(c => c.id === data.id);
      if (isEditSuccess) findData.title = data.title;
      findThing.children.splice(findDataIndex, 1);
      findThing.children.splice(findDataIndex, 0, findData);
    },

    async loadData(item, callback) {
      const newData = await this.loadFetch(item);
      callback(newData);
    },

    async onNodeClick(data) {
      //点击时，展开元素，选中元素
      this.$set(data, "expand", true);
      //点击时，如果haschildren为true，说明此节点有子节点，并且data.children为undefined也就是
      //!data.children为true或者data.children已经定义且为空数组时才去请求
      if (data.hasChildren && (!data.children || data.children.length === 0)) {
        data.loading = true;
        const newData = await this.loadFetch(data);
        data.loading = false;
        this.$set(data, "children", newData);
      }
    },
    //点击加号按钮
    appendThing(data) {
      this.visible = true;
      this.modalType = 'add';
      this.operator = data;
    },
    //点击删除按钮
    async removeThing(data) {
      this.$Modal.confirm({
        title: "是否确定删除节点？",
        onOk: async () => {
          await this.removeRequest(data);
          //判断上面的请求是否成功后再决定下面的代码是否应该进行
          
          const findThing = this.iteratorFindParent(
            this.data,
            data.parentId,
            null
          );
          const dataIndex = findThing.children.findIndex(c => c.id === data.id);
          findThing.children.splice(dataIndex, 1);
        }
      });
    },
    //点击编辑按钮
    onEdit(data) {
      this.visible = true;
      this.modalType = 'edit';
      this.operator = data;
    }
  }
};
</script>