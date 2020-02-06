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
        <Table
          v-if="proList.length > 0"
          :columns="columns"
          :data="items.permissionList"
          class="role__table"
        >
          <template
            slot="module"
            slot-scope="{row}"
          >
            <span>{{row.module}}</span>
            <CheckboxGroup
              v-model="idList"
              @on-change="handleSelect"
            >
              <Checkbox :label="row.id">
                {{ row.name }}
              </Checkbox>
            </CheckboxGroup>
          </template>
        </Table>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import obj from './test.js';
export default {
    data () {
        return {
            idList:[],
            columns: [
                {
                    title: '模块',
                    key: 'name',
                    slot: 'module'
                },
                {
                    title: '操作权限',
                    key: 'id'
                }
            ],
            proList:[]
        }
    },
    created(){
        setTimeout(() => {
            let {data} = obj;
            data.forEach(d => {
                d.permissionList = d.permissionList.map(p => {
                    return {
                        name:p.name,
                        id:p.id,
                        //这里列出所有你要用到的字段
                    }
                })
            })
            this.proList = data;
        },2000)

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