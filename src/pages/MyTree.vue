<template>
  <div class="tree">
    <OrganizationTree
      :maxLevel="maxLevel"
      :loadFetch="loadFetch"
      :addRequest="addRequest"
      :editRequest="editRequest"
      :removeRequest="removeRequest"
    ></OrganizationTree>
  </div>
</template>

<script>
import OrganizationTree from "../components/OrganizationTree";
export default {
  data() {
    return {
      data: [],
      maxLevel: 4
    };
  },
  components: { OrganizationTree },
  methods: {
    loadFetch(id) {
      return new Promise(resolve => {
        setTimeout(() => {
          let backData;
          if (!id) {
            backData = [
              {
                id: 1,
                title: "网易",
                // hasChildren: true,
                level: 1
              }
            ];
            backData
              .filter(b => b.hasChildren)
              .forEach(b => {
                b.loading = false;
                b.selected = false;
                b.children = [];
              });
          } else {
            backData = [];
          }
          resolve(backData);
        }, 1000);
      });
    },
    addRequest(data) {
      console.log(data)
      return new Promise((resolve) => {
        // const {
        //   form: { id, name },
        //   level,
        //   parentId
        // } = data;
        setTimeout(() => {
          //下面写请求，请求完resolve

          
          resolve();
        }, 500);
      });
    },
    editRequest(data) {
      console.log(data)
      return new Promise((resolve) => {
        // const {
        //   form: { id, name },
        //   level,
        //   parentId
        // } = data;
        setTimeout(() => {
          //下面写请求，请求完resolve


          resolve();
        }, 500);
      });
    },
    removeRequest(data) {
      console.log(data)
      return new Promise((resolve) => {
        // const {
        //   form: { id, name },
        //   level,
        //   parentId
        // } = data;
        setTimeout(() => {
          //下面写请求，请求完resolve


          resolve();
        }, 500);
      });
    }
  }
};
</script>

<style scoped>
</style>
