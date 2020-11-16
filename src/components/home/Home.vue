<!--  -->
<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="8">
          <img src="../..//assets/logo.png"
               alt="">
        </el-col>
        <el-col :span="16"
                class="login-info">
          欢迎:{{this.$route.params.username}}
          <i class="el-icon-switch-button"
             @click.prevent="logout"></i>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧栏 -->
      <el-aside width="230px">
        <el-menu :router="true"
                 default-active="2"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <!-- 插槽slot 具名 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users"><i class="el-icon-user"></i>用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">角色列表</el-menu-item>
            <el-menu-item index="permits">权限列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
    }
  },
  // 方法集合
  methods: {
    async logout () {
      try {
        await this.$confirm('此操作将退出该账户,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 1000
        })
        this.$router.back()
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #434A50;
  padding: 0;
  color: #fff;
  img {
    width: 300px;
    height: 60px;
  }
  h1 {
    height: 60px;
    line-height: 60px;
    color: #fff;
    text-align: center;
  }
  .login-info {
    line-height: 60px;
    text-align: right;
    padding-right: 30px;
    i {
      cursor: pointer;
    }
  }
}
.el-aside {
  background-color: #D3DCE6;
}
.el-main {
  background-color: #E9EEF3;
}
</style>
