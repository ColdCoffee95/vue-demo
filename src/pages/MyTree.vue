<template>
  <div class="tree">
    <MyTree 
    :data="data" 
    :load-data="loadData" 
    :max-level="2" 
    @append="appendThing"
    @remove="removeThing"
    >
    </MyTree>
  </div>
</template>

<script>
import MyTree from "../components/Tree";
export default {
  data() {
    return {
      data: []
    };
  },
  components: { MyTree },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      setTimeout(() => {
        let backData = [{
          id:1,
          title:'一级1',
          hasChildren:false
        },{
          id:2,
          title:'一级2',
          hasChildren:true
        }];
        backData.filter(b => b.hasChildren).forEach(b => {
          b.loading = false;
          b.selected = false;
          b.children = [];
        })
        this.data = backData;
      }, 1000);
    },
    loadData(item, callback) {
      console.log('data',this.data)
      setTimeout(() => {
        const newData = item.nodeKey < 2?[
          {
            id: 1,
            title: "一级1",
            loading: false,
            children: []
          },
          {
            id: 2,
            title: "一级2",
            loading: false,
            children: []
          }
        ]:[{
            id: 1,
            title: "一级1",
          },
          {
            id: 2,
            title: "一级2",
          }];
        callback(newData)
      }, 500);
    },
    appendThing(data){
      console.log('appendThing')
      const children = data.children || [];
      children.push({
        title: "appended node",
        expand: true
      });
      this.$set(data, "children", children);
    },
    removeThing(){
      console.log('removeThing')
    }
  }
};
</script>

<style scoped>
</style>
