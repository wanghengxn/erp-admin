<template>
  <el-dialog v-model="windowShow" :title="isEdit ? '编辑数据字典' : '新增数据字典'" width="600px" :close-on-click-modal="false" @close="onClose">
    <SchemaForm
      ref="setSchemaFormRef"
      :fields="form"
      :form-schema="formItems"
      label-width="90px"
      class="flex-auto"
      :rules="rules"
      :is-search-bar="false"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" :loading="sureLoading" @click="onConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import { defineEmits, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { deepClone } from '@/util'
import { createDataDict, updateDataDict } from '@/api/dataDict'
  
defineProps({
  title: {
    type: String,
    default: '温馨提示'
  }
})
const emit = defineEmits(['on-confirm'])
const windowShow = ref(false)
const resetForm = () => {
  return {
    groupKey: '',
    groupName: '',
    itemKey: '',
    itemValue: '',
    status: true
  }
}
const form = ref(resetForm())
const sureLoading = ref(false)
const isEdit = ref(false)
const setSchemaFormRef = ref(null)
const formItems = ref([
  {
    field: 'categroy',
    type: 'input',
    props: { label: '科目类别' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  },
  {
    field: 'pid',
    type: 'input',
    props: { label: '上级科目' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  },
  {
    field: 'code',
    type: 'input',
    props: { label: '科目编码' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  },
  {
    field: 'name',
    type: 'input',
    props: { label: '科目名称' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  },
  {
    field: 'direction',
    type: 'switch',
    props: { label: '余额方向' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  },
  {
    field: 'direction',
    type: 'switch',
    props: { label: '数量核算' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  },
  {
    field: 'direction',
    type: 'switch',
    props: { label: '辅助核算' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  },
  {
    field: 'direction',
    type: 'switch',
    props: { label: '外币核算' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  },
  {
    field: 'status',
    type: 'switch',
    props: { label: '科目状态' },
    layout: { xs: 24, sm: 24, md: 24, xl: 24 },
    attr: {
      placeholder: '请输入内容'
    }
  }
])

const rules = {
  groupKey: [
    { required: true, message: '请输入group key', trigger: 'blur' }
  ],
  groupName: [
    { required: true, message: '请输入group name', trigger: 'blur' }
  ],
  itemKey: [
    { required: true, message: '请输入item key', trigger: 'blur' }
  ],
  itemValue: [
    { required: true, message: '请输入item value', trigger: 'blur' }
  ]
}
const activeId = ref('')
  
function show(data) {
  isEdit.value = !!data
  if (data) {
    for (const key in form.value) {
      form.value[key] = data[key]
    }
    activeId.value = data.id
  }
  windowShow.value = true
}
  
function onClose() {
  windowShow.value = false
  setSchemaFormRef.value.clearValidate()
  Object.assign(form.value, resetForm())
}
  
function onConfirm() {
  setSchemaFormRef.value.validate(result => {
    if (result) {
      sureLoading.value = true
      const postData = deepClone(form.value)
      if (isEdit.value) {
        postData.id = activeId.value
      }
      const method = isEdit.value ? updateDataDict : createDataDict
      method(postData).then(() => {
        ElMessage.success('操作成功')
        emit('on-confirm')
        onClose()
      }).finally(() => {
        sureLoading.value = false
      })
    }
  })
}
  
defineExpose({
  show
})
</script>
  