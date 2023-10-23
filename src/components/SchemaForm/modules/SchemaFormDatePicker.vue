<template>
  <el-date-picker v-bind="{ ...attr }" v-model:modelValue="localDateValue" range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" :clearable="false" :value-format="attr['valueFormat'] || attr['value-format'] || 'YYYY-MM-DD'" style="width: 100%;" @change="changeHandler">
    <template v-if="localOptions.length > 0" #default="cell">
      <div class="cell" :class="{ current: cell.isCurrent }">
        <span class="text">{{ cell.text }}</span>
        <span v-if="localOptions.length && isDot(cell)" class="holiday" />
      </div>
    </template>
  </el-date-picker>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { ElDatePicker } from 'element-plus'
import { isEqual } from 'lodash-es'

const props = defineProps({
  modelValue: [Object, Array, String],
  formItem: Object,
  attr: {
    type: Object,
    default: () => {
      return { placeholder: '请选择', 'value-format': 'YYYY-MM-DD' }
    }
  }
})
const emit = defineEmits(['update:modelValue', 'search'])

const localDateValue = ref(null)

const changeHandler = e => {
  emit('update:modelValue', e)
  if (props.attr.isSearchBar) {
    emit('search')
  }
}

const localOptions = computed(() => props.formItem?.options || [])

function isDot({ dayjs }) {
  if (props.formItem.options && props.formItem.options.length > 0) {
    return props.formItem.options.includes(dayjs.format('YYYY-MM-DD'))
  }
  return false
}

watch(() => props.modelValue, (newVal, oldVal) => {
  if (!isEqual(newVal, oldVal)) {
    localDateValue.value = newVal
  }
})

onMounted(() => {
  localDateValue.value = props.modelValue
})

</script>

<style scoped lang="scss">
.el-range-editor.el-input__inner {
  padding-top: 0;
  padding-bottom: 0;
}

.cell .holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--color-error);
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}

.cell.current {
  color: var(--color-primary);
}
</style>
