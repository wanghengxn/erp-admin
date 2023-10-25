<template>
  <div class="container">
    <div class="login-wrap">
      <div class="login-box">
        <div class="box-left">
          <img src="~img/login/login-banner.png" alt="" width="450">
        </div>
        <div class="box-right">
          <div class="form-title flex-center">
            <span>ERP管理后台</span>
          </div>

          <div class="form-wrap">
            <transition name="el-zoom-in-top">
              <div v-if="errorShow" class="error-tips">
                <el-icon class="color-error">
                  <svg-icon name="ep:circle-close-filled" />
                </el-icon>
                <span class="error-text">{{ errorText }}</span>

                <el-icon class="hand" @click="errorShow = false">
                  <svg-icon name="ep:close" />
                </el-icon>
              </div>
            </transition>
            <div class="form-item">
              <img src="~img/icon/username.png">
              <input v-model="form.username" maxlength="50" type="text" :placeholder="loginType === 'PASSWORD' ? '请输入邮箱/手机号码' : '请输入手机号码'">
            </div>
            <div class="form-item">
              <img src="~img/icon/password.png">
              <input v-model="form.password" type="password" placeholder="请输入密码" @keydown.enter="sureLogin">
            </div>

            <div class="flex-center">
              <el-checkbox v-model="form.rememberMe" size="large">记住密码</el-checkbox>
            </div>

            <el-button
              type="primary" style="height: 56px;font-size: 20px;font-weight: bold;" class="w100 mt30"
              :loading="sureLoading"
              @click="sureLogin"
            >
              登录
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Login">
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { isMobile, isEmail } from '@/util/validate'
import { localCipher, localDecrypt } from '@/util/encryption'
import { onMounted } from 'vue'
import storage from '@/util/storage'

const router = useRouter()
const userStore = useUserStore()
const loginType = ref('PASSWORD')
const errorShow = ref(false)
const errorText = ref('')
const sureLoading = ref(false)
let timer = null

const form = ref({
  username: '',
  password: '',
  rememberMe: false,
  code: ''
})

function sureLogin() {
  loginByPassword()
}

function loginByPassword() {
  // loginByPassword
  clearTimeout(timer)
  errorText.value = ''
  if (!form.value.username) {
    errorText.value = '请输入用户名'
  } else if (!isMobile(form.value.username) && !isEmail(form.value.username)) {
    errorText.value = '请输入正确的用户名'
  } else if (!form.value.password) {
    errorText.value = '请输入密码'
  }

  if (errorText.value) {
    errorShow.value = true
    timer = setTimeout(() => {
      errorShow.value = false
    }, 3000)
    return
  }
  sureLoading.value = true
  errorShow.value = false
  userStore.login(form.value).then(() => {
    if (form.value.rememberMe) {
      localCipher('pass', { username: form.value.username, password: form.value.password })
    } else {
      storage.local.remove('pass')
    }
    router.push('/')
  }).catch(error => {
    errorText.value = error.response.data.errorMsg
    errorShow.value = true
    timer = setTimeout(() => {
      errorShow.value = false
    }, 3000)
  }).finally(() => {
    sureLoading.value = false
  })
}

onMounted(() => {
  if (storage.local.get('pass')) {
    const pass = localDecrypt('pass')
    form.value.username = pass.username
    form.value.password = pass.password
    form.value.rememberMe = true
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  //background: url("img/login/login-bg.png") #101010 repeat-x center bottom;
  background-size: contain;
  .header {
    padding: 30px 30px 0;
    display: flex;
    justify-content: space-between;
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
    .nav-item {
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      transition: all linear 0.2s;
      &:hover {
        color: var(--color-primary);
      }
    }
  }
  .login-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 1204px;
    margin: 0 auto;
  }
  .login-box {
    display: flex;
    align-items: center;
    margin-top: 38px;
    //background: url("img/login/login-wrap-bg.png") no-repeat center center;
    background-size: contain;
    width: 100%;
    height: 614px;
    .box-left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 590px;
      height: 100%;
    }
    .box-right {
      flex: 1;
      height: 100%;
      //background: url("img/login/login-box-right-bg.png") no-repeat center center;
      background-size: contain;
      padding: 88px 54px;
      .tab-item {
        position: relative;
        padding: 0 2px;
        margin-right: 40px;
        font-weight: bold;
        transition: all linear 0.1s;
        padding-bottom: 4px;
        cursor: pointer;
        &.active {
          color: var(--color-primary);
          &::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            background: var(--color-primary);
          }
        }
      }
      .form-title {
        margin-top: 40px;
        justify-content: center;
        font-size: 22px;
        color: #252525;
      }
      .form-wrap {
        position: relative;
        margin-top: 50px;
        .form-item {
          position: relative;
          display: flex;
          align-items: center;
          height: 74px;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          padding: 0 26px;
          margin-bottom: 20px;
          img {
            width: 20px;
            margin-right: 30px;
          }
          input {
            flex: 1;
            font-size: $g-font-size-big;
            height: 100%;
          }
        }
        input {
          outline: none;
          box-shadow: none;
          border: none;
        }
        .send-code {
          color: var(--color-primary);
          font-size: var(--font-size-big);
          cursor: pointer;
          user-select: none;
          &.disabled {
            cursor: not-allowed;
          }
        }
      }
    }
  }
}
.error-tips {
  display: flex;
  align-items: center;
  position: absolute;
  height: 40px;
  background: #fdf1f1;
  border-radius: 4px;
  border: 1px solid #c55252;
  width: 100%;
  padding: 0 16px;
  top: -60px;
  .error-text {
    flex: 1;
    margin-left: 8px;
    color: #464646;
  }
}
</style>
