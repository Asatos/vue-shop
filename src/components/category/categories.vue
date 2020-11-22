<!--  -->
<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-btn">
      <el-button plain
                 type="primary"
                 size="small"
                 @click="showAddCatDialog">添加分类</el-button>
    </div>
    <el-table :data="categoriesData"
              height="500px"
              style="width: 100%;">
      <el-table-tree-column file-icon="icon icon-file"
                            folder-icon="icon icon-folder"
                            prop="cat_name"
                            tree-key="cat_id"
                            parent-key="cat_pid"
                            level-key="cat_level"
                            :indent-size="30"
                            label="分类名称"
                            width="500">
      </el-table-tree-column>
      <el-table-column label="是否有效"
                       min-width="180">
        <template slot-scope="scope">
          <el-tag :type="scope.row.cat_deleted?'danger':'success'">{{scope.row.cat_deleted ?'否':'是'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="分类当前层级"
                       min-width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level == 1">二级</el-tag>
          <el-tag v-else>三级</el-tag>
        </template>
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
    <div class="dialog-custom">
      <el-dialog title="添加分类"
                 :visible.sync="dialogAddCatVisible"
                 :close-on-click-modal="false">
        <el-form :model="addCatForm"
                 label-width="80px">
          <el-form-item label="分类名称">
            <el-input v-model="addCatForm.cat_name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="父级名称">
            <el-cascader :options="options"
                         v-model="addCatForm.cat_pid_arr"
                         :props="defaultProps"
                         clearable></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogAddCatVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="addCat">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ElTreeGrid from 'element-tree-grid'
Vue.component(ElTreeGrid.name, ElTreeGrid)
export default {
  data () {
    return {
      categoriesData: [],
      total: 0,
      pagenum: 1,
      pagesize: 5,
      pagesizeList: [5, 10, 20],
      dialogAddCatVisible: false,
      addCatForm: {
        cat_name: '',
        cat_pid_arr: []
      },
      options: [],
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name'
      }
    }
  },
  created () {
    this.loadCategoriesData()
    this.loadCategoriesData2()
  },
  methods: {
    async loadCategoriesData () {
      const url = 'categories'
      const config = {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          type: 3
        }
      }
      let res = await this.$axios.get(url, config)
      this.categoriesData = res.data.data.result
      this.total = res.data.data.total
    },
    async loadCategoriesData2 () {
      const url = 'categories'
      const config = {
        params: {
          type: 2
        }
      }
      let res = await this.$axios.get(url, config)
      this.options = res.data.data
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.loadCategoriesData()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadCategoriesData()
    },
    showAddCatDialog () {
      this.dialogAddCatVisible = true
    },
    async addCat () {
      let { cat_name: catName, cat_pid_arr: catPidArr } = this.addCatForm
      let res = await this.$axios.post('categories', {
        cat_pid: catPidArr[catPidArr.length - 1],
        cat_name: catName,
        cat_level: catPidArr.length
      })
      if (res.data.meta.status === 201) {
        this.dialogAddCatVisible = false
        this.$message({
          message: '添加成功',
          type: 'success',
          duration: 1000
        })
        this.loadCategoriesData()
      }
    }
  }

}
</script>
<style lang='less' scoped>
.table-btn {
  height: 40px;
}
</style>
