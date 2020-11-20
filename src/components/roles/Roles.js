export default {
  data () {
    return {
      rolesData: [],
      dialogAsignRightsVisible: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: 0
    }
  },
  created () {
    this.loadRolesData()
    this.loadRightsData()
  },
  methods: {
    async loadRolesData () {
      let res = await this.$axios.get('roles')
      this.rolesData = res.data.data
    },
    indexMethod (index) {
      return index
    },
    async loadRightsData () {
      let res = await this.$axios.get('rights/tree')
      this.data = res.data.data
    },
    showAsignRightsDialog (row) {
      this.dialogAsignRightsVisible = true
      this.roleId = row.id
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })
      this.$nextTick(() => {
        this.$refs.rightsTree.setCheckedKeys(keys)
      })
    },
    async assignRights () {
      let keys1 = this.$refs.rightsTree.getCheckedKeys()
      let keys2 = this.$refs.rightsTree.getHalfCheckedKeys()
      let keys = keys1.concat(keys2)
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      if (res.data.meta.status === 200) {
        this.dialogAsignRightsVisible = false
        this.loadRolesData()
        this.$message({
          message: '权限分配成功',
          type: 'success',
          duration: 1000
        })
      }
    }
  }
}
