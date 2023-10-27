<template>
  <div class="editForm">
    <SchemaForm
      ref="setSchemaFormRef"
      :fields="form"
      :form-schema="formItems"
      label-width="150px"
      class="flex-auto"
      :rules="rules"
      :is-search-bar="false"
    >
      <template #startPeriod>
        <div class="startPeriod">
          <el-row>
            <el-col :span="10">
              <el-select v-model="form.startYear" class="m-2" placeholder="Select">
                <el-option
                  v-for="item in yearOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="2">
              <span class="m-2">年</span>
            </el-col>
            <el-col :span="10">
              <el-select v-model="form.startMonth" class="m-2" placeholder="Select">
                <el-option
                  v-for="item in monthOptons"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="2">
              <span class="m-2">月</span>
            </el-col>
          </el-row>
        </div>
      </template>
    </SchemaForm>
    <div class="footer">
      <el-button type="primary" @click="onSubmit">{{ isUpdate?'更新帐套':'创建帐套' }}</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { deepClone, getYearList } from '@/util'
import { getDataDictByGroupKeys } from '@/api/dataDict'
import { addAccountSet, updateAccountSet, getAccountSetById } from '@/api/accountSet'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import emitter from '@/util/eventBus'
  
const userStore = useUserStore()
const router = useRouter()
const yearOptions = ref([])
const monthOptons = ref([])

const resetForm = () => {
  return {
    name: null,
    startYear: null,
    startMonth: null,
    unifiedNumber: '',
    accountingStandardCode: null,
    industryCode: null,
    taxTypeCode: null,
    assetsModule: true,
    cashModule: true,
    psiModule: true,
    voucherAudit: false
  }
}
const form = ref(resetForm())
const sureLoading = ref(false)
const setSchemaFormRef = ref(null)
const formItems = ref([
  {
    field: 'name',
    type: 'input',
    props: { label: '单位名称' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入完成的单位名称'
    }
  },
  {
    field: 'start',
    type: 'slot',
    slotName: 'startPeriod',
    props: { label: '帐套启用年月' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  },
  {
    field: 'unifiedNumber',
    type: 'input',
    props: { label: '统一社会信用代码' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: ''
    }
  },
  {
    field: 'accountingStandardCode',
    type: 'select',
    props: { label: '会计准则' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请选择'
    },
    options: []
  },
  {
    field: 'industryCode',
    type: 'select',
    props: { label: '行业' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请选择'
    },
    options: []
  },
  {
    field: 'taxTypeCode',
    type: 'select',
    props: { label: '增值税种类' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请选择'
    },
    options: []
  },
  {
    field: 'assetsModule',
    type: 'switch',
    props: { label: '固定资产模块' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请选择'
    }
  },
  {
    field: 'cashModule',
    type: 'switch',
    props: { label: '资金模块' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  },
  {
    field: 'psiModule',
    type: 'switch',
    props: { label: '关联进销存' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  },
  {
    field: 'voucherAudit',
    type: 'switch',
    props: { label: '凭证审核' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  }
])
const checkStart = (rule, value, callback) => {
  callback()
}
const rules = {
  name: [
    { required: true, message: '请输入单位名称', trigger: 'blur' }
  ],
  start: [
    { required: true, validator: checkStart, trigger: 'change' }
  ],
  accountingStandardCode: [
    { required: true, message: '请选择会计准则', trigger: 'blur' }
  ],
  taxTypeCode: [
    { required: true, message: '请选择增值税种类', trigger: 'blur' }
  ],
  assetsModule: [
    { required: true, message: '请选择是否开启资产模块', trigger: 'blur' }
  ],
  cashModule: [
    { required: true, message: '请选择是否开启现金模块', trigger: 'blur' }
  ],
  psiModule: [
    { required: true, message: '请选择是否关联进销存', trigger: 'blur' }
  ],
  voucherAudit: [
    { required: true, message: '请选择是否进行凭证审核', trigger: 'blur' }
  ]
}
const activeId = ref('')
const isUpdate = ref(false)
  
function onSubmit() {
  setSchemaFormRef.value.validate(result => {
    if (result) {
      sureLoading.value = true
      const postData = deepClone(form.value)
      // console.log('postData:', postData)

      if (!isUpdate.value) {
        postData.id = activeId.value
      }
      const method = isUpdate.value ? updateAccountSet : addAccountSet
      method(postData).then(() => {
        
        // 重新加载用户信息
        userStore.getUserInfo().then(() => {
          ElMessage.success('操作成功')
          emitter.emit('refreshUserAccountSets')
          router.push({ name: 'AccountSets' })
        })
      }).finally(() => {
        sureLoading.value = false
      })
    }
  })
}

function onCancel() {
  router.push({ name: 'AccountSets' })
}
getDataDictByGroupKeys({ groupKeys: 'ACCOUNTING_STANDARDS,INDUSTRY,TAX_TYPE' }).then(res => {
  const toSelect = item =>  { return { label: item.itemValue, value: item.itemKey } }
  formItems.value[3].options = res.filter(item => item.groupKey === 'ACCOUNTING_STANDARDS').map(toSelect)
  formItems.value[4].options = res.filter(item => item.groupKey === 'INDUSTRY').map(toSelect)
  formItems.value[5].options = res.filter(item => item.groupKey === 'TAX_TYPE').map(toSelect)
})

yearOptions.value = getYearList()
monthOptons.value = Array.from({ length: 12 }, (_, i) => i + 1).map(item => { return { lable: item, value: item } })

activeId.value = router.currentRoute.value.query.id

if (activeId.value) {
  isUpdate.value = true
  getAccountSetById(activeId.value).then(res => {
    form.value = res
  })
} else {
  const now = new Date()
  form.value.startYear = now.getFullYear()
  form.value.startMonth = now.getMonth() + 1
  form.value.taxTypeCode = '1'
}

</script>
<style scoped>
  .editForm {
    margin: 0 auto;
    padding: 80px 50px;
  }
  .footer {
    text-align: center;
    padding-top: 30px;
  }
  .startPeriod {
    /* padding: 0 11px; */
    display: flex;
  }
  .startPeriod .el-col {
    text-align: center;
  }
</style>
