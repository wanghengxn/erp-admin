<route>
{
    name: 'personalNotification',
    meta: {
        title: "通知中心"
    }
}
</route>

<script setup>
import useNotificationStore from '@/store/modules/notification'
const notificationStore = useNotificationStore()

function messagePlus() {
  notificationStore.$patch(state => {
    state.message += 1
  })
}
function messageMinus() {
  notificationStore.$patch(state => {
    state.message -= state.message > 0 ? 1 : 0
  })
}

function todoPlus() {
  notificationStore.$patch(state => {
    state.todo += 1
  })
}
function todoMinus() {
  notificationStore.$patch(state => {
    state.todo -= state.todo > 0 ? 1 : 0
  })
}
</script>

<template>
  <div>
    <page-header title="通知中心" content="本页面仅模拟右上角通知数变化，具体业务逻辑请到 /src/store/modules/notification.js 文件中编写" />
    <page-main title="消息">
      <el-button @click="messagePlus">
        <template #icon>
          <el-icon>
            <svg-icon name="i-ep:plus" />
          </el-icon>
        </template>
        1
      </el-button>
      <el-button @click="messageMinus">
        <template #icon>
          <el-icon>
            <svg-icon name="i-ep:minus" />
          </el-icon>
        </template>
        1
      </el-button>
    </page-main>
    <page-main title="待办">
      <el-button @click="todoPlus">
        <template #icon>
          <el-icon>
            <svg-icon name="i-ep:plus" />
          </el-icon>
        </template>
        1
      </el-button>
      <el-button @click="todoMinus">
        <template #icon>
          <el-icon>
            <svg-icon name="i-ep:minus" />
          </el-icon>
        </template>
        1
      </el-button>
    </page-main>
  </div>
</template>
