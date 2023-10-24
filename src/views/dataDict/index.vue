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
          <el-button type="primary" :icon="DocumentAdd" @click="AddDataDictDialogRef.show()">新增</el-button>
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
          <el-button size="small" :auto-insert-space="false" text @click="AddDataDictDialogRef.show(scope.row)">编辑</el-button>
        </template>
      </SchemaTable>
    </page-main>

    <AddDataDictDialog ref="AddDataDictDialogRef" @on-confirm="schemaTableRef.refresh(true)" />
  </div>
</template>

<script setup name="dataDictList">
import { DocumentAdd } from '@element-plus/icons-vue'
import AddDataDictDialog from './components/AddDataDictDialog/index.vue'
import { getDataDictMeta, getDataDictPage, updateDataDictStatus } from '@/api/dataDict'
import { ElMessageBox } from 'element-plus'

const searchForm = ref({})
const formItems = ref([
  {
    field: 'groupKey',
    type: 'select',
    props: { label: '' },
    layout: { xs: 24, sm: 12, md: 5, xl: 5 },
    attr: {
      placeholder: '分组KEY',
      filterable: true
    },
    options: []
  },
  {
    field: 'itemValue',
    type: 'input',
    props: { label: '' },
    layout: { xs: 24, sm: 12, md: 5, xl: 5 },
    attr: {
      placeholder: '字典值',
      appendSearch: true
    },
    options: []
  }
])
const columns = ref([
  {
    label: '分组KEY',
    prop: 'groupKey'
  },
  {
    label: '分组名',
    prop: 'groupName'
  },
  {
    label: '字典KEY',
    prop: 'itemKey'
  },
  {
    label: '字典值',
    prop: 'itemValue'
  },
  {
    label: '状态',
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
const AddDataDictDialogRef = ref(null)
const schemaTableRef = ref(null)

function loadData(params) {
  return getDataDictPage(Object.assign({}, searchForm.value, params)).then(res => {
    return res
  })
}

function selectStatus(id, e) {
  let msg = ''
  if (e) {
    msg = '确定要启用字典吗？'
  } else {
    msg = '确定要停用该字典么？'
  }
  ElMessageBox.confirm(msg, '提示', {
    dangerouslyUseHTMLString: true,
    type: 'warning'
  }).then(() => {
    updateDataDictStatus(id, e === 'NORMAL').then(() => {
      schemaTableRef.value.refresh()
    })
  }).catch(() => {
  })
}

function getGroupKey() {
  getDataDictMeta().then(res => {
    formItems.value[0].options = res.map(item => {
      return {
        label: item.itemValue,
        value: item.itemKey
      }
    })
  })
}
getGroupKey()

</script>
