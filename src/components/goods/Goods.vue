<!--  -->
<template>
  <div class=''>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-btn">
      <el-button plain
                 type="primary"
                 size="small"
                 @click="go2goodAdd">添加商品</el-button>
    </div>
    <el-table :data="goodsData"
              height="500px"
              style="width: 100%">
      <el-table-column prop="goods_name"
                       label="商品名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="goods_price"
                       label="商品价值"
                       width="180">
      </el-table-column>
      <el-table-column prop="goods_number"
                       label="商品数量">
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.add_time|dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>
    <div class="pagination-custom">
      <el-pagination background
                     layout="sizes,prev, pager, next"
                     :total="total"
                     :page-sizes="pagesizeList"
                     :page-size="pagesize"
                     :current-page="pagenum"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
Vue.filter('dateFilter', res => {
  return moment(res).format('YYYY-MM-DD')
})
export default {
  data () {
    return {
      total: 0,
      pagenum: 1,
      pagesize: 10,
      pagesizeList: [5, 10, 20],
      goodsData: []
    }
  },
  created () {
    this.loadGoodsData()
  },
  methods: {
    async loadGoodsData (query = '') {
      let res = await this.$axios.get('goods', {
        params: {
          query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      this.goodsData = res.data.data.goods
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.loadGoodsData()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadGoodsData()
    },
    go2goodAdd () {
      this.$router.push('/goods-add')
    }
  }

}
</script>
<style lang='less' scoped>
.table-btn {
  height: 40px;
}
</style>
