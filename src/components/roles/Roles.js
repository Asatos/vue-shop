export default {
  data () {
    return {
      rolesData: [],
      dialogAsignRightsVisible: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
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
    }
  }
}
