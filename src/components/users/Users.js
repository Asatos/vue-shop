import axios from 'axios'

export default {
  data () {
    return {
      // 总个数
      total: 0,
      // 当前页
      pagenum: 1,
      pagesize: 5,
      // 数量
      pagesizes: [2, 5, 10, 20],
      searchText: '',
      // 用户列表数据
      usersData: [],
      // 是否显示添加用户对话框
      dialogAddUserVisible: false,
      // 添加用户的表单对象
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          // 判断是否必填
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 判断格式
          { min: 3, max: 5, message: '长度在3到5之间', trigger: 'blur' }
        ],
        password: [
          // 判断是否必填
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 判断格式
          { min: 5, max: 10, message: '长度在5到10之间', trigger: 'blur' }
        ],
        email: [
          // 判断格式
          { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          // 判断格式
          { pattern: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/, message: '手机号格式不正确', trigger: 'blur' }
        ]
      },
      value1: true
    }
  },
  created () {
    this.loadUsersData()
  },
  methods: {
    query () {
      this.loadUsersData()
    },
    async loadUsersData () {
      const url = 'http://localhost:8888/api/private/v1/users'
      const config = {
        params: {
          query: this.searchText,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
      let res = await axios.get(url, config)
      console.log(res)
      this.usersData = res.data.data.users
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.loadUsersData()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadUsersData()
    },
    showAddUserDialog () {
      this.dialogAddUserVisible = true
    },
    addUser () {
      axios.post('http://localhost:8888/api/private/v1/users', this.addUserForm, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        if (res.data.meta.status === 201) {
          this.dialogAddUserVisible = false
          this.$message({
            type: 'success',
            message: '添加成功!',
            duration: 1000,
            onClose: () => {
              this.$refs.addUserForm.resetFields()
            }
          })
          this.loadUsersData()
        }
      })
    }
  }
}
