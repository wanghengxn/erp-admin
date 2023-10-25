<template>
  <el-form v-bind="$attrs" :ref="setSchemaFormRef" :label-width="labelWidth" :class="{ 'search-form-wrap': isSearchBar }" :model="fields" :rules="rules">
    <el-row type="flex" :justify="justify" :gutter="24" class="schema__form__body">
      <template v-for="(formItem, index) in localFormSchema" :key="index">
        <el-col v-bind="{ ...formItem.layout }">
          <el-form-item v-bind="{ ...formItem.props }" :prop="formItem.field">
            <template v-if="formItem.type !== 'slot'">
              <component
                :is="getComponent(formItem.type)"
                v-model="fields[formItem.field]"
                :form-item="formItem"
                :attr="formItem.attr"
                @change="changeData"
                @search="$emit('search')"
              />
            </template>
            <template v-else>
              <slot :name="formItem.slotName" :form-item="formItem" class="test" />
            </template>
            <span v-if="formItem.afterFix">{{ formItem.afterFix }}</span>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import { ref, isReactive, isRef, createVNode } from 'vue'
import { ElRow, ElCol, ElForm, ElFormItem } from 'element-plus'
import modules from './modules'

export default {
  name: 'SchemaForm',
  components: {
    ElRow,
    ElCol,
    ElForm,
    ElFormItem,
    ...modules
  },
  inheritAttrs: false,
  props: {
    formSchema: {
      required: true,
      type: Array
    },
    fields: {
      type: Object
    },
    rules: {
      type: Object
    },
    justify: {
      type: String,
      default: 'start'
    },
    isSearchBar: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: '90px'
    }
  },
  emits: ['search'],
  setup(props) {
    // form ref
    const SchemaFormRef = ref(null)
    const setSchemaFormRef = el => SchemaFormRef.value = el

    const cacheDataMap = ref({})
    // 过滤本地显示数据
    const localFormSchema = ref(props.formSchema)

    watch(() => props.formSchema, () => {
      localFormSchema.value = props.formSchema.filter(item => !item.hidden).map(item => {
        if (!item.attr) {
          item.attr = {}
        }
        item.attr.isSearchBar = props?.isSearchBar
        return item
      })
    }, { deep: true, immediate: true })
    // 预设组件索引
    const preset = [
      'input',
      'input-range',
      'textarea',
      'select',
      'radio',
      'checkbox',
      'input-number',
      'switch',
      'cascader',
      'date-picker',
      'time-picker',
      'time-select',
      'single-checkbox',
      'search'
    ]
    // 获取组件
    const getComponent = type => {
      // 预设组件
      if (preset.includes(type)) {
        return 'schema-form-' + type
      } else if (isReactive(type) || isRef(type)) {
        // 自定义组件
        return createVNode(type)
      } else {
        // 不识别组件
        return type
      }
    }
    // 校验表单
    const validate = callback => {
      return new Promise(resolve => {
        SchemaFormRef.value.validate((valid, arg) => {
          callback && callback(valid, props.fields, arg)
          resolve(valid, props.fields, arg)
        })
      })
    }
    // 清除表单校验
    const clearValidate = () => {
      SchemaFormRef.value.clearValidate()
      cacheDataMap.value = {}
    }
    // 清除表单字段校验
    const clearFieldValidate = field => {
      SchemaFormRef.value.clearValidate(field)
    }

    const changeData = data => {
      cacheDataMap.value[data.key] = data.data
    }

    const getCacheDataMap = () => {
      return cacheDataMap.value
    }

    return { SchemaFormRef, localFormSchema, setSchemaFormRef, getComponent, validate, clearValidate, changeData, getCacheDataMap, clearFieldValidate }
  }
}
</script>

<style scoped lang="scss">
.search-form-wrap {
  &::v-deep(.el-input__wrapper) {
    background-color: #f4f4f4;
    box-shadow: none;
  }
  &::v-deep(.el-input-group__append) {
    border: none;
    background: var(--color-primary);
    color: var(--color-whites);
  }
}
</style>
