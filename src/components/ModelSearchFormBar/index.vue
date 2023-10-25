<template>
  <SearchBar
    ref="setSchemaFormRef"
    :fields="modelForm"
    :form-schema="filterFormItems"
    label-width="90"
    :show-clear="false"
    show-search-handle
    @confirm="search"
    @update:fields="modelForm = $event"
  />
</template>

<script setup>
import { getIndustry, getYearTime } from '@/api/common'
import { onMounted } from 'vue'
import dayjs from 'dayjs'
import { deepClone } from '@/util'

const emit = defineEmits(['search'])

const props = defineProps({
  hiddenFields: {
    type: Array,
    default: () => []
  },
  showUpdateDate: {
    type: Boolean,
    default: false
  },
  yearText: {
    type: String,
    default: ''
  },
  updateDateText: {
    type: String,
    default: ''
  }
})

const formItems = ref([
  {
    field: 'cics1Code',
    type: 'select',
    props: { label: 'CICS1行业', required: true },
    layout: { xs: 24, sm: 12, md: 6, xl: 6 },
    attr: {
      placeholder: '请选择'
    },
    options: [],
    hidden: props.hiddenFields.includes('cics1')
  },
  {
    field: 'year',
    type: 'date-picker',
    props: { label: props.yearText || '入模指标年份', required: true, labelWidth: '110' },
    layout: { xs: 24, sm: 12, md: 6, xl: 6 },
    attr: {
      type: 'year',
      placeholder: '请选择',
      editable: false,
      'disabled-date': date => {
        return dayjs(date).get('year') >= dayjs().get('year')
      },
      valueFormat: 'YYYY'
    },
    options: [],
    hidden: props.hiddenFields.includes('year')
  },
  {
    field: 'lastInputModelDate',
    type: 'date-picker',
    props: { label: '入模时间', required: true },
    layout: { xs: 24, sm: 12, md: 6, xl: 6 },
    attr: {
      placeholder: '请选择',
      editable: false,
      valueFormat: 'YYYY-MM-DD'
    },
    options: [],
    hidden: props.hiddenFields.includes('lastInputModelDate')
  },
  {
    field: 'lastRunDate',
    type: 'date-picker',
    props: { label: props.updateDateText || '更新时间', required: true },
    layout: { xs: 24, sm: 12, md: 6, xl: 6 },
    attr: {
      placeholder: '请选择',
      editable: false,
      valueFormat: 'YYYY-MM-DD'
    },
    options: [],
    hidden: props.hiddenFields.includes('lastRunDate')
  }
])
const modelForm = ref({
  cics1Code: 'IS',
  year: '2021'
})
const filterFormItems = ref([])

watch(() => props.showUpdateDate, val => {
  const list = deepClone(formItems.value)
  if (val) {
    list.splice(2, 1)
  } else {
    list.splice(3, 1)
  }
  filterFormItems.value = list
}, { immediate: true })

watch(() => modelForm?.value?.year, val => {
  if (val && modelForm.value.cics1Code) {
    getAllDate(val, modelForm.value.cics1Code)
  }
})

watch(() => modelForm?.value?.cics1Code, val => {
  if (val && modelForm.value.year) {
    getAllDate(modelForm.value.year, modelForm.value.cics1Code)
  }
})

function getCicsCodeList() {
  getIndustry().then(res => {
    filterFormItems.value[0].options = res.map(item => {
      return {
        label: item.name,
        value: item.code
      }
    })
  })
}

function getAllDate(year, cics1Code) {
  getYearTime(year, cics1Code).then(res => {
    filterFormItems.value[2].options = res
  })
}

function search() {
  emit('search', modelForm.value)
}

onMounted(() => {
  if (!props.hiddenFields.includes('cics1')) {
    getCicsCodeList()
    modelForm.value.cics1Code = 'IS'
  }
  if (!props.hiddenFields.includes('year')) {
    modelForm.value.year = '2021'
  }

  search()
})
</script>

<style scoped>

</style>
