<template>
  <div class="w100 flex-auto h100">
    <InputType v-if="type === 'input'" v-model="content" :attr="attr" />
    <SelectType v-else-if="type === 'select'" v-model="content" class="w100" :attr="attr" :options="options" />
    <SliderType v-else-if="type === 'slider'" v-model="content" class="w100" :attr="attr" />
    <NumberType v-else-if="type === 'number'" v-model="content" class="w100" :attr="attr" />
    <DateType v-else-if="type === 'date'" v-model="content" class="w100" :attr="attr" />
    <Cics1Select v-else-if="type === 'cics1'" v-model="content" class="w100" :attr="attr" @changeSelect="changeSelect" />
  </div>
</template>

<script setup>
import InputType from './modules/InputType.vue'
import SelectType from './modules/SelectType.vue'
import SliderType from './modules/SliderType.vue'
import NumberType from './modules/NumberType.vue'
import DateType from './modules/DateType.vue'
import Cics1Select from './modules/Cics1Select.vue'

const emit = defineEmits(['update:modelValue', 'change', 'changeSelect'])
const props = defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: ''
  },
  attr: {
    type: Object,
    default() {
      return {}
    }
  },
  options: {
    type: Array,
    default() {
      return []
    }
  }
})
const content = ref(props.modelValue)

watch(content, () => {
  emit('update:modelValue', content.value)
  emit('change', content.value)
})

watch(
  () => props.modelValue,
  () => {
    content.value = props.modelValue
    console.log(props.modelValue)
  }
)

function changeSelect(data) {
  emit('changeSelect', data)
}
</script>

<style scoped lang="scss">

</style>
