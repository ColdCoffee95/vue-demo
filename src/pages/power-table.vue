<template>
  <div class="power">
    <!-- 成员列表 设置权限 -->
    <Tabs
      v-if="proList.length > 0"
      value="reception0"
      @on-change="changeTab"
    >
      <TabPane
        v-for="(items, index) in proList"
        :key="index"
        :label="items.application.name"
        :name="`reception` + index"
      >
        <!-- <Table
          :columns="columns"
          :data="items.permissionList"
          class="role__table"
        >
          <template
            slot="module"
            slot-scope="{row}"
          >
            <CheckboxGroup
              v-model="idList"
              @on-change="handleSelect"
            >
              <Checkbox :label="row.id">
                {{ row.name }}
              </Checkbox>
            </CheckboxGroup>
          </template>
        </Table> -->
      </TabPane>
    </Tabs>
    <div>
      <Table
        :columns="columns"
        :data="datas"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    proList: {
      type: Array,
      default: () => []
    },
    ids: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      idList: [],
      column: [
        {
          title: '模块',
          key: 'name',
          slot: 'module',
          width: 240
        },
        {
          title: '操作权限',
          key: 'operate',
          slot: 'operate'
        }
      ],
      columns: [
        {
          title: '模块',
          key: 'name'
        },
        {
          title: '操作权限',
          key: 'id'
        }
      ],
      data: [],
      datas: [
        {
          id: 13,
          createBy: null,
          ctime: '2020-01-07 10:57:26',
          updateBy: null,
          utime: '2020-01-07 11:03:44',
          iisDeelete: 0,
          applicationId: 1,
          name: '工作台',
          rights: null,
          path: null,
          redirect: null,
          pid: 0,
          allPid: null,
          seq: 0,
          scopeId: 0,
          readEnable: 1,
          writeeEnable: 1,
          level: 0,
          status: 1,
          type: 1,
          code: 'page_workbenech',
          buttonType: null,
          componeent: null,
          icon: null,
          url: null,
          description: '工作台菜单',
          configurable: '0',
          defaultValue: '1',
          children: null,
          expand: true,
          selected: true
        }
      ]
    }
  },
  watch: {
    'ids.length' (newVal) {
      this.idList = this.ids
    },
    'proList.length' (newVal) {
      let data = JSON.parse(JSON.stringify(this.proList[0].permissionList))
      console.log('data', data)
      // this.datas = data
    }
  },
  methods: {
    changeTab (val) {
      console.log('val', val)
    },
    handleSelect (val) {
      this.$emit('updateNodes', val)
    }
  }
}
</script>
<style lang="less">
.power {
  .ivu-checkbox-group {
  display: inline-block;
}
}
</style>
