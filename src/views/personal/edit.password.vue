<route>
{
    name: 'personalEditPassword',
    meta: {
        title: "修改密码"
    }
}
</route>

<script setup name="PersonalEditPassword">
import useUserStore from '@/store/modules/user'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const validatePassword = (rule, value, callback) => {
  if (value !== form.value.newpassword) {
    callback(new Error('请确认新密码'))
  } else {
    callback()
  }
}

const formRef = ref()
const form = ref({
  oldPwd: '',
  newPwd: '',
  confirmNewPwd: ''
})

const rules = ref({
  oldPwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
  ],
  confirmNewPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: validatePassword }
  ]
})

function onSubmit() {
  formRef.value.validate(valid => {
    if (valid) {
      userStore.editPassword(form.value).then(() => {
        ElMessage({
          type: 'success',
          message: '修改成功，请重新登录'
        })
        userStore.logout().then(() => {
          router.push({
            name: 'login',
            query: {
              redirect: route.fullPath
            }
          })
        })
      }).catch(() => {})
    }
  })
}
function cancel() {
  router.push({
    name: 'dashboard'
  })
}
</script>

<template>
  <div>
    <page-header title="修改密码" content="定期修改密码可以提高帐号安全性噢~" />
    <page-main>
      <el-row>
        <el-col :md="24" :lg="12">
          <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="原密码" prop="oldPwd">
              <el-input v-model="form.oldPwd" type="password" placeholder="请输入原密码" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
              <el-input v-model="form.newPwd" type="password" placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmNewPwd">
              <el-input v-model="form.confirmNewPwd" type="password" placeholder="请确认新密码" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </page-main>
  </div>
</template>
