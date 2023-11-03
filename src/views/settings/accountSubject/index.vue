<template>
  <div class="full-container">
    <page-main>
      <el-tabs
        v-model="searchForm.category"
        type="border-card"
        @tab-click="onTabClick"
      >
        <el-tab-pane
          v-for="item in tabs"
          :key="item.itemKey"
          :label="item.itemValue"
          :name="item.itemKey"
        >
          <div class="flex-row align-start">
            <div><span class="star">*</span> 提示：按 Ctrl + F 键并输入科目编码或者科目名称可以查找科目。</div>
             
            <div class="flex-center">
              <div class="mr12">
                <el-checkbox v-model="searchForm.showValid" @change="onCheckboxClick">显示停用科目</el-checkbox>
              </div>
              
              <el-button @click="dummyFunc('编码设置暂不实现')">编码设置</el-button>
              <el-button @click="dummyFunc('导出')">导出</el-button>
              <el-button @click="dummyFunc('导入')">导入</el-button>
              <el-button @click="dummyFunc('明细转辅助')">明细转辅助</el-button>
              <el-dropdown style="margin-left: 12px;" @command="handleCommand">
                <el-button>
                  批量操作 <svg-icon name="ep:arrow-down" />
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="enableAll">启用</el-dropdown-item>
                    <el-dropdown-item command="disableAll">停用</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div class="tableContent">
            <SchemaTable
              :ref="el => {schemaTableRefs[item.itemKey] = el}"
              row-key="id"
              :data="loadData"
              :columns="columns"
              :index="true"
              :fixed="['selection', 'index']"
              :row-selection="onSelectRow"
            >
              <template #direction="scope">
                <span>{{ scope.row.direction === 1 ? '借' : '贷' }}</span>
              </template>
              <template #status="scope">
                <span>{{ scope.row.status === 0 ? '停用' : '启用' }}</span>
              </template>

              <template #action="scope">
                <el-button size="small" :auto-insert-space="false" text @click="dummyFunc('新增')">新增</el-button>
                <el-button size="small" :auto-insert-space="false" text :disabled="scope.row.level === 1" @click="dummyFunc('编辑')">编辑</el-button>
               
                <el-popconfirm title="确定要删除此科目吗?" @confirm="onDel(scope.row)">
                  <template #reference>
                    <el-button size="small" :auto-insert-space="false" text>删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </SchemaTable>
          </div>
        </el-tab-pane>
      </el-tabs>
    </page-main>
  </div>
</template>
<script setup name="accountSubjectList">
import { getAccountSubjectPage, batchOperate } from '@/api/accountSubject'
import { getDataDictByGroupKeys } from '@/api/dataDict'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const tabs = ref([])
const selectedRow = ref([])
const searchForm = ref({
  category: 'Assets',
  showValid: true
})
const schemaTableRefs = ref({})
const columns = ref([
  {
    label: '科目编码',
    prop: 'code'
  },
  {
    label: '科目名称',
    prop: 'name'
  },
  {
    label: '助记码',
    prop: 'fastCode'
  },
  {
    label: '余额方向',
    prop: 'direction',
    slots: { customRender: 'direction' }
  },
  {
    label: '状态',
    prop: 'status',
    slots: { customRender: 'status' }
  },
  {
    label: '操作',
    prop: 'action',
    width: 160,
    slots: { customRender: 'action' }
  }
])

function onTabClick(tab) {
  searchForm.value.category = tab.props.name
 
  schemaTableRefs.value[searchForm.value.category].refresh()
}

function onCheckboxClick() {
  schemaTableRefs.value[searchForm.value.category].refresh()
}

function loadData(params) {
  return getAccountSubjectPage(Object.assign({}, searchForm.value, params)).then(res => {
    return res
  })
}

getDataDictByGroupKeys({ groupKeys: 'AC_CATEGORY' }).then(res => {
  tabs.value = res
})
function dummyFunc(name) {
  alert(name)
}

function onDel(row) {
  alert('删除' + row.name)
}
function handleCommand(command) {
  const ids = selectedRow.value.map(e => e.id)
  batchOperate({ action: command, ids }).then(() => {
    schemaTableRefs.value[searchForm.value.category].refresh()
  })
  
}

function onSelectRow(e) {
  selectedRow.value = e
}
</script>
<style scoped>
  .mr12 {
    margin-right: 12px;
  }
  .star {
    color: red;
  }
  .tableContent {
    padding-top: 20px;
  }
</style>