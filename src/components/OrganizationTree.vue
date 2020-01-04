<template>
  <div class="tree">
    <MyTree
      :data="data"
      :load-data="loadData"
      :max-level="maxLevel"
      @append="appendThing"
      @remove="removeThing"
      @onNodeClick="onNodeClick"
      @onAddLine="onAddLine"
      @cancelAddLine="onCancelLine"
      @onEditLine="onEditLine"
      @cancelEditLine="onCancelEditLine"
      @edit="onEdit"
    ></MyTree>
  </div>
</template>

<script>
import MyTree from "./MyTree";
export default {
  data() {
    return {
      data: [],
    };
  },

  props: {
    loadFetch: {
      type: Function,
      default: () => new Promise((resolve) => resolve([]))
    },
    addRequest: {
      type: Function,
      default: () => new Promise((resolve) => resolve())
    },
    editRequest: {
      type: Function,
      default: () => new Promise((resolve) => resolve())
    },
    removeRequest: {
      type: Function,
      default: () => new Promise((resolve) => resolve())
    },
    maxLevel:{
      type: Number,
      default: 3
    }
  },

  components: { MyTree },

  async mounted() {
    this.data = await this.loadFetch();
  },

  methods: {
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
    //添加行点击确定后执行
    async onAddLine(data) {
      await this.addRequest(data);
      const {
        form: { id, name },
        level,
        parentId
      } = data;
      const newData = {
        parentId,
        id,
        title: name,
        hasChildren: false,
        level
      };
      const findThing = this.iteratorFindParent(
        this.data,
        newData.parentId,
        null
      );
      findThing.children.pop();
      findThing.children.push(newData);
    },

    //编辑行点击确定后执行
    async onEditLine(data) {
      await this.editRequest(data);
      const findThing = this.iteratorFindParent(this.data, data.parentId, null);
      const findData = findThing.children.find(c => c.id === data.id);
      const findDataIndex = findThing.children.findIndex(c => c.id === data.id);
      findData.title = data.form.name;
      findData.editNode = false;
      findThing.children.splice(findDataIndex, 1);
      findThing.children.splice(findDataIndex, 0, findData);
    },

    //添加行点击取消后执行
    onCancelLine(data) {
      const findThing = this.iteratorFindParent(this.data, data.parentId, null);
      findThing.children.pop();
    },

    //编辑行点击取消后执行
    onCancelEditLine(data) {
      const findThing = this.iteratorFindParent(this.data, data.parentId, null);
      const findData = findThing.children.find(c => c.id === data.id);
      const findDataIndex = findThing.children.findIndex(c => c.id === data.id);
      findData.editNode = false;
      findThing.children.splice(findDataIndex, 1);
      findThing.children.splice(findDataIndex, 0, findData);
    },

    async loadData(item, callback) {
      const newData = await this.loadFetch(item);
      callback(newData);
    },

    async onNodeClick(data) {
      //点击时，展开元素，选中元素
      this.$set(data, "selected", true);
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
      const children = data.children || [];
      if (children.length > 0 && children[children.length - 1].newNode) {
        //TODO,判断已经有节点正在增加，不能继续增加的提示
        return;
      }
      children.push({
        parentId: data.id,
        newNode: true,
        expand: true,
        level: data.level + 1,
        children: []
      });
      this.$set(data, "children", children);
      this.$set(data, "expand", true);
    },
    //点击删除按钮
    async removeThing(data) {
      await this.removeRequest(data);
      const findThing = this.iteratorFindParent(this.data, data.parentId, null);
      const dataIndex = findThing.children.findIndex(c => c.id === data.id);
      findThing.children.splice(dataIndex, 1);
    },
    //点击编辑按钮
    onEdit(data) {
      const findThing = this.iteratorFindParent(this.data, data.parentId, null);
      const findData = findThing.children.find(c => c.id === data.id);
      const findDataIndex = findThing.children.findIndex(c => c.id === data.id);
      findData.editNode = true;
      findThing.children.splice(findDataIndex, 1);
      findThing.children.splice(findDataIndex, 0, findData);
    }
  }
};
</script>

<style scoped>
</style>
