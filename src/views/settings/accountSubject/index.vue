<template>
  <div class="full-container">
    <page-main>
      <el-tabs
        v-model="currentTab"
        type="border-card"
      >
        <el-tab-pane
          v-for="item in tabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <div class="flex-row align-start">
            <div><span class="star">*</span> 提示：按 Ctrl + F 键并输入科目编码或者科目名称可以查找科目。</div>
             
            <div class="flex-center">
              <div class="mr12">
                <el-checkbox v-model="showValid">显示停用科目</el-checkbox>
              </div>
              
              <el-button>编码设置</el-button>
              <el-button>导出</el-button>
              <el-button>导入</el-button>
              <el-button>明细转辅助</el-button>
              <el-button>批量操作</el-button>
            </div>
          </div>
          
          <el-row>{{ item.content }}</el-row>
        </el-tab-pane>
      </el-tabs>
    </page-main>
  </div>
</template>
<script setup name="accountSubjectList">
import { DocumentAdd } from '@element-plus/icons-vue'
import { getAccountSetPage, delAccountSetById } from '@/api/accountSet'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const tabs = ref([
  {
    title: '资产',
    name: '1',
    content: '资产'

  },
  {
    title: '负债',
    name: '2',
    content: '负债'
  },
  {
    title: '权益',
    name: '3',
    content: '权益'
  }, 
  {
    title: '成本',
    name: '4',
    content: '成本'
  },
  {
    title: '损益',
    name: '5',
    content: '损益'
  }
])
const currentTab = ref('1')
const showValid = ref(true)

</script>
<style scoped>
  .mr12 {
    margin-right: 12px;
  }
  .star {
    color: red;
  }
</style>