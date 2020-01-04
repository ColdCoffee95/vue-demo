<template>
  <div class="tree">
    <Tree :data="data" :load-data="loadData" :render="renderContent"></Tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      buttonProps: {
        type: "default",
        size: "small"
      }
    };
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
      if (data.newNode) {
        return this.renderNewInput(h, { root, node, data });
      }
      if (data.editNode) {
        return this.renderEditInput(h, { root, node, data });
      }
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
            h(
              "span",
              {
                class: data.selected
                  ? "ivu-tree-title ivu-tree-title-selected"
                  : "ivu-tree-title",
                on: {
                  click: () => {
                    this.onNodeClick(data);
                  }
                }
              },
              data.title
            )
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
            this.renderButton(h, { root, node, data })
          )
        ]
      );
    },
    renderNewInput(h, { data }) {
      return [
        h("TreeInput", {
          on: {
            onSubmit: form => {
              this.$emit("onAddLine", { form, ...data });
            },
            onCancel: () => {
              this.$emit("cancelAddLine", data);
            }
          }
        })
      ];
    },
    renderEditInput(h, { data }) {
      return [
        h("TreeInput", {
          props: {
            nameInput:data.title,
            idInput:data.id,
            type:'edit'
          },
          on: {
            onSubmit: form => {
              this.$emit("onEditLine", { form, ...data });
            },
            onCancel: () => {
              this.$emit("cancelEditLine", data);
            }
          }
        })
      ];
    },
    renderButton(h, { data }) {
      const buttonList = [];
      if (!data.selected) {
        return buttonList;
      }
      //添加按钮是否应该渲染的逻辑
      if (data.level < this.maxLevel) {
        buttonList.push(
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
          })
        );
      }
      //删除和编辑按钮是否应该渲染的逻辑
      if (data.level !== 1) {
        buttonList.push(
          h("Button", {
            props: Object.assign({}, this.buttonProps, {
              icon: "ios-remove"
            }),
            style: {
              marginRight: "8px"
            },
            on: {
              click: () => {
                this.remove(data);
              }
            }
          })
        );
        buttonList.push(
          h("Button", {
            props: Object.assign({}, this.buttonProps, {
              icon: "ios-brush-outline"
            }),
            on: {
              click: () => {
                this.edit(data);
              }
            }
          })
        );
      }
      return buttonList;
    },
    onNodeClick(data) {
      this.$emit("onNodeClick", data);
    },
    append(data) {
      this.$emit("append", data);
    },
    remove(data) {
      this.$emit("remove", data);
    },
    edit(data){
      this.$emit("edit", data);
    }
  }
};
</script>

<style scoped>
.ivu-tree {
  width: 500px;
}
</style>
