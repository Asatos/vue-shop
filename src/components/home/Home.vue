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
      <el-aside width="200px">
        <el-scrollbar wrap-class="default-scrollbar__warp">
          <el-menu :router="true"
                   :default-active="handlePath()"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <!-- 插槽slot 具名 -->
            <el-submenu :index="menu.path"
                        v-for="menu in menusData"
                        :key="menu.id">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>{{menu.authName}}</span>
              </template>
              <el-menu-item :index="item.path"
                            v-for="item in menu.children"
                            :key="item.id">
                <i class="el-icon-user"></i>{{item.authName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
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
      menusData: []
    }
  },
  created () {
    this.loadLeftMenusData()
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
    },
    async loadLeftMenusData () {
      let res = await this.$axios.get('menus')
      this.menusData = res.data.data
    },
    // 处理home菜单的路由路径
    handlePath () {
      let path = this.$route.path
      return path.slice(1)
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.el-header {
  width: 100%;
  height: 100px;
  background-color: #434a50;
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
  height: 100%;
  width: 60px;
  background-color: #d3dce6;
}
.el-main {
  background-color: #e9eef3;
}
</style>
