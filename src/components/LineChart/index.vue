<template>
  <div ref="chartsRef" class="charts" />
</template>

<script name="LineChart" setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {}
    }
  }
})

const chartsRef = ref(null)
let charts = null

watch(() => props.options, options => {
  if (charts) {
    charts.setOption(options)
    charts.resize()
  }
})

function getCharts() {
  return charts
}

onMounted(() => {
  charts = echarts.init(chartsRef.value)

  charts.setOption(props.options)
  window.addEventListener('resize', () => {
    charts.resize()
  })
})

defineExpose({
  getCharts
})
</script>

<style scoped lang="scss">
.charts {
  height: 100%;
  width: 100%;
}
</style>
