<!--  -->
<template>
  <div class=''>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="permitsData"
              height="550px"
              style="width: 100%;">
      <el-table-column type="index"
                       label="#"
                       :index="indexMethod">
      </el-table-column>
      <el-table-column prop="authName"
                       label="权限名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="path"
                       label="路径"
                       width="180">
      </el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
          <span v-if="scope.row.level == 0">一级</span>
          <span v-else-if="scope.row.level == 1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {

  data () {
    // 这里存放数据
    return {
      permitsData: []
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadPermitsData()
  },
  methods: {
    async loadPermitsData () {
      let res = await this.$axios.get(`rights/list`)
      this.permitsData = res.data.data
    },
    indexMethod (index) {
      return index
    }
  }
}
</script>
<style lang='less' scoped>
</style>
