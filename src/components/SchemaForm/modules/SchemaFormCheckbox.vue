<template>
  <div class="flex-center">
    <el-checkbox v-if="attr.showAll || formItem.props.showGroupAll" v-model="checkAll" @change="changeAll">全部</el-checkbox>
    <el-checkbox-group style="width: 100%;" v-bind="{ ...attr }" :model-value="props.modelValue" @change="changeHandler">
      <template v-for="(item, index) in localOptions" :key="index">
        <el-checkbox-button v-if="item.type === 'button'" :label="item.value" :disabled="item.disabled">{{ item.label }}</el-checkbox-button>
        <el-checkbox class="mr10" v-else :label="item.value" :disabled="item.disabled" v-bind="{ ...item.attr }">{{ item.label }}</el-checkbox>
      </template>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { computed, onMounted } from 'vue'
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ([])
  },
  attr: {
    type: Object
  },
  formItem: {
    type: Object
  }
})

const emit = defineEmits(['update:modelValue', 'search'])
const checkAll = ref(false)

const changeHandler = e => {
  emit('update:modelValue', e)
  if (e.length < localOptions.value.length) {
    checkAll.value = false
  } else {
    checkAll.value = true
  }
  if (props.attr.isSearchBar) {
    emit('search')
  }
}

const localOptions = computed(() => props.formItem?.options || [])

function changeAll(e) {
  if (e) {
    emit('update:modelValue', localOptions.value.map(item => item.value))
  } else {
    emit('update:modelValue', [])
  }
  if (props.attr.isSearchBar) {
    emit('search')
  }
}

onMounted(() => {
  if (props.modelValue.length === localOptions.value.length) {
    checkAll.value = true
  } else {
    checkAll.value = false
  }
})

</script>

<style lang="scss" scoped>
.el-checkbox {
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
