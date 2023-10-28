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
        <template #cashModule="scope">
          <span :class="scope.row.cashModule ? 'color-primary' : 'color-error'">{{ scope.row.cashModule ? '启用' : '不启用' }}</span>
        </template>
        <template #assetsModule="scope">
          <span :class="scope.row.assetsModule ? 'color-primary' : 'color-error'">{{ scope.row.assetsModule ? '启用' : '不启用' }}</span>
        </template>
        <template #voucherAudit="scope">
          <span :class="scope.row.voucherAudit ? 'color-primary' : 'color-error'">{{ scope.row.voucherAudit ? '启用' : '不启用' }}</span>
        </template>
        
        <template #action="scope">
          <el-button size="small" :auto-insert-space="false" text @click="dialogShow(scope.row)">编辑</el-button>
          <el-button size="small" :auto-insert-space="false" text disabled @click="alert('')">复制</el-button>
         
          <el-popconfirm title="确定要删除此帐套吗?" @confirm="onDel(scope.row)">
            <template #reference>
              <el-button size="small" :auto-insert-space="false" text>删除</el-button>
            </template>
          </el-popconfirm>
         
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
import { getAccountSetPage, delAccountSetById } from '@/api/accountSet'
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
    prop: 'currentYearMonth'
  },
  {
    label: '帐套启用年月',
    prop: 'startYearMonth'
  },
  {
    label: '会计准则',
    prop: 'accountingStandard'
  },
  {
    label: '资金模块',
    prop: 'cashModule',
    minWidth: 70,
    slots: { customRender: 'cashModule' }
  },
  {
    label: '固定资产模块',
    prop: 'assetsModule',
    minWidth: 70,
    slots: { customRender: 'assetsModule' }
  },
  {
    label: '凭证审核',
    prop: 'voucherAudit',
    minWidth: 70,
    slots: { customRender: 'voucherAudit' }
  },
  {
    label: '帐套权限',
    prop: 'accountSetPermission',
    minWidth: 70
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

function onDel(row) {
  delAccountSetById(row.id).then(() => {
    ElMessage.success('操作成功')
    schemaTableRef.value.refresh()
  })
}

</script>
