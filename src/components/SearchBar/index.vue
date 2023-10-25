<script setup name="SearchBar">
import { computed, watch } from 'vue'
import { deepClone } from '@/util'

const props = defineProps({
  showMore: {
    type: Boolean,
    default: false
  },
  fields: {
    type: Object,
    default() {
      return {}
    }
  },
  defaultForm: {
    type: Object,
    default() {
      return {}
    }
  },
  rules: {
    type: Object,
    default() {
      return null
    }
  },
  unfold: {
    type: Boolean,
    default: false
  },
  showClear: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  isSearchBar: {
    type: Boolean,
    default: true
  },
  showSearchHandle: {
    type: Boolean,
    default: false
  },
  formSchema: {
    type: Array,
    default() {
      return []
    }
  }
})

const emit = defineEmits(['toggle', 'confirm', 'update:fields'])
const setSchemaFormRef = ref(null)

const isUnfold = ref(!props.unfold)

const selectorOption = computed(() => {
  const temp = deepClone(props.formSchema).map(item => {
    item.props.labelWidth = item.props.labelWidth || '100px'
    item.hidden = !!item.hidden
    return item
  })

  if (props.showSearchHandle) {
    temp.push(
      {
        field: 'action',
        type: 'slot',
        slotName: 'action',
        props: { label: '', labelWidth: '0px' },
        // layout: { span: !props.showMore ? 8 : isUnfold.value ? 24 : 8 },
        layout: { xs: 24, sm: 12, md: 4, xl: 4 }
      })
  }

  return temp
})

const searchForm = ref({})

const filterSlot = computed(() => {
  return props.formSchema.filter(item => item.type === 'slot')
})

watch(() => props.unfold, () => {
  toggle()
}, { immediate: true })

watch(searchForm, () => {
  emit('update:fields', searchForm.value)
}, { deep: true })

watch(() => props.fields, () => {
  searchForm.value = props.fields
}, { deep: true, immediate: true })

function toggle() {
  isUnfold.value = !isUnfold.value
  emit('toggle', isUnfold.value)
}

const search = () => {
  if (props.rules) {
    setSchemaFormRef.value.validate(valid => {
      if (valid) {
        emit('confirm', props.fields)
      }
    })
  } else {
    emit('confirm', props.fields)
  }
}

const clear = () => {
  emit('update:fields', deepClone(props.defaultForm))
  console.log(deepClone(props.defaultForm))
  setTimeout(() => {
    emit('confirm', { type: 'reset', data: searchForm.value })
  }, 100)
}

function handleSearch() {
  if (!props.showSearchHandle) {
    search()
  }
}

defineExpose({
  search,
  clear
})
</script>

<template>
  <div class="search-container search-bar-wrap">
    <SchemaForm
      ref="setSchemaFormRef"
      :fields="searchForm"
      :form-schema="selectorOption"
      label-width="90"
      :is-search-bar="isSearchBar"
      :rules="rules"
      @update:fields="searchForm = $event"
      @search="handleSearch"
    >
      <template v-for="item in filterSlot" :key="item.slotName" #[item.slotName]>
        <slot :name="item.slotName" />
      </template>
      <template #action>
        <!--    :class="{'flex-end': isUnfold && showMore}"     -->
        <div class="w100" style="font-size: 0">
          <el-button v-if="showSearch" type="primary" :auto-insert-space="false" @click="search">查询</el-button>
          <el-button v-if="showClear" :auto-insert-space="false" cancel @click="clear">清空</el-button>
          <el-button v-if="showMore" type="primary" text :auto-insert-space="false" @click="toggle">
            {{ isUnfold ? '收起' : '展开' }}
            <el-icon class="font14">
              <svg-icon class="ml4" :name="isUnfold ? 'ep:arrow-up' : 'ep:arrow-down'" />
            </el-icon>
          </el-button>
        </div>
      </template>
    </SchemaForm>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  position: relative;
  background-color: #fff;
  &:first-child {
    margin-top: 0;
  }
  :deep(.el-form) {
    .el-select {
      width: 100%;
    }
    .el-date-editor {
      width: 100%;
    }
  }
  &:deep(.el-form-item) {
    margin-bottom: 13px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
