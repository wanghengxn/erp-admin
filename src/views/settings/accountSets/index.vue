<template>
  <div class="full-container">
    <page-main>
      <div class="flex-row align-start">
        <SchemaForm
          ref="setSchemaFormRef"
          :fields="searchForm"
          :form-schema="formItems"
          label-width="0"
          class="flex-auto"
          @search="schemaTableRef.refresh(true)"
        />

        <div class="flex-center">
          <el-button type="primary" :icon="DocumentAdd" @click="dialogShow()">新增</el-button>
        </div>
      </div>
      <SchemaTable
        ref="schemaTableRef"
        row-key="id"
        :data="loadData"
        :columns="columns"
      >
        <template #status="scope">
          <el-dropdown size="small" style="height: 23px;" @command="selectStatus(scope.row.id, $event)">
            <span class="flex-center font12 h100">
              <span :class="scope.row.status ? 'color-primary' : 'color-error'">{{ scope.row.status ? '正常' : '停用' }}</span>
              <el-icon class="el-icon--right">
                <svg-icon name="ep:arrow-down" />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="NORMAL">正常</el-dropdown-item>
                <el-dropdown-item command="DISABLED">停用</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template #action="scope">
          <el-button size="small" :auto-insert-space="false" text @click="dialogShow(scope.row)">编辑</el-button>
          <el-button size="small" :auto-insert-space="false" text disabled @click="alert('')">复制</el-button>
          <el-button size="small" :auto-insert-space="false" text @click="dialogShow(scope.row)">删除</el-button>
          <el-button size="small" :auto-insert-space="false" text disabled @click="alert('')">密码锁</el-button>
        </template>
      </SchemaTable>
    </page-main>

    <!-- <AddDataDictDialog ref="AddDataDictDialogRef" @on-confirm="schemaTableRef.refresh(true)" /> -->
  </div>
</template>

<script setup name="accountSetList">
import { DocumentAdd } from '@element-plus/icons-vue'
// import AddDataDictDialog from './components/AddDataDictDialog/index.vue'
import { getAccountSetPage } from '@/api/accountSet'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const searchForm = ref({})
const formItems = ref([
  {
    field: 'name',
    type: 'input',
    props: { label: '' },
    layout: { xs: 24, sm: 12, md: 5, xl: 5 },
    attr: {
      placeholder: '单位名称',
      appendSearch: true
    },
    options: []
  }
])
const columns = ref([
  {
    label: '单位名称',
    prop: 'name'
  },
  {
    label: '当前记账年月',
    prop: 'groupName'
  },
  {
    label: '帐套启用年月',
    prop: 'itemKey'
  },
  {
    label: '会计准则',
    prop: 'itemValue'
  },
  {
    label: '资金模块',
    prop: 'status',
    minWidth: 70,
    slots: { customRender: 'status' }
  },
  {
    label: '固定资产模块',
    prop: 'status',
    minWidth: 70,
    slots: { customRender: 'status' }
  },
  {
    label: '凭证审核',
    prop: 'status',
    minWidth: 70,
    slots: { customRender: 'status' }
  },
  {
    label: '帐套权限',
    prop: 'status',
    minWidth: 70,
    slots: { customRender: 'status' }
  },
  {
    label: '操作',
    prop: 'action',
    width: 160,
    slots: { customRender: 'action' }
  }
])
// const AddDataDictDialogRef = ref(null)
const schemaTableRef = ref(null)

function loadData(params) {
  return getAccountSetPage(Object.assign({}, searchForm.value, params)).then(res => {
    return res
  })
}

function dialogShow(row) {
  // AddDataDictDialogRef.show(row)
  router.push({
    name: 'AccountSetsEdit',
    query: { id: row ? row.id : null }
  })
}

</script>
