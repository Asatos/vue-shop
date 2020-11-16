<!--  -->
<template>
  <el-row type="flex"
          justify="center"
          align="middle">
    <el-col :span="8">
      <el-form :model="loginForm"
               status-icon
               :rules="rules"
               ref="loginForm"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="username">
          <el-input type="text"
                    v-model="loginForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="loginForm.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="logintForm()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  // 方法集合
  methods: {
    logintForm () {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        let res = await axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)
        console.log(res)
        if (res.data.meta.status === 200) {
          let username = this.loginForm.username
          this.$message({
            message: res.data.meta.msg,
            type: 'success',
            duration: 1000,
            onClose: () => {
              localStorage.setItem('token', res.data.data.token)
              this.$router.push({
                name: 'home',
                params: { username: username }
              })
            }
          })
        } else {
          this.$message({
            message: res.data.meta.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.el-row {
  height: 100%;
  background-color: #2d434c;
}
.el-col {
  background: #fff;
  padding: 20px 30px;
  border: 1px solid #eee;
  border-radius: 10px;
}
</style>
