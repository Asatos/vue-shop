<!--  -->
<template>
  <div class=''>
    <el-table :data="permitsData"
              height="600px"
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
      <el-table-column prop="level"
                       label="等级">
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
