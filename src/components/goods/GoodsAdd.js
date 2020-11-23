export default {
  data () {
    return {
      // 控制步骤条
      activeIndex: 0,
      // 控制tab
      activeTabsName: 'one',
      // 表单数据
      addGoodsForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        // 图片
        pics: [],
        cuxiao: true
      },
      // 级联选择器
      options: [],
      defaultProps: {
        label: 'cat_name',
        value: 'cat_id'
      },
      // 上传图片
      dialogImageUrl: '',
      dialogVisible: false,
      // 上传请求头token
      uploadHeaders: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.loadCatData()
  },
  methods: {
    // 点击tab
    clickTabs (tab) {
      this.activeIndex = +tab.index
    },
    // 下一步
    next (index, name) {
      this.activeIndex = index
      this.activeTabsName = name
    },
    // 加载级联数据
    async loadCatData () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3
        }
      })
      this.options = res.data.data
    },
    // 上传图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleUploadSuccess (res) {
      console.log(res)
      this.addGoodsForm.pics.push({
        pic: res.data.tmp_path
      })
    }
  }
}
