<template>
  <div class="tree">
    <Tree :data="data" :load-data="loadData" @on-select-change="onSelectChange" multiple	></Tree>
  </div>
</template>
//  :render="renderContent"
<script>
export default {
  data() {
    return {};
  },
  props: {
    loadData: {
      type: Function
    },
    data: {
      type: Array
    },
    maxLevel: {
      type: Number,
      default: 3
    }
  },
  methods: {
    renderContent(h, { root, node, data }) {
      console.log(root);
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: "ios-paper-outline"
              },
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-add"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.append(data);
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-remove"
                }),
                on: {
                  click: () => {
                    this.remove(root, node, data);
                  }
                }
              })
            ]
          )
        ]
      );
    },
    onSelectChange(e){
      console.log('onSelectChange',e)
    },
    append(data) {
      this.$emit('append',data);
      
    },
    remove(root, node, data) {
      this.$emit('remove',{root,node,data});
      // const parentKey = root.find(el => el === node).parent;
      // const parent = root.find(el => el.nodeKey === parentKey).node;
      // const index = parent.children.indexOf(data);
      // parent.children.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.ivu-tree{
  width: 300px;
}
</style>
