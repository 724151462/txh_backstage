import Global_VM from '../main'
const mutations = {
  setActId(state, actId) {
    localStorage.setItem('actId', actId)
    state.actId = localStorage.getItem('actId')
  },
  delectConfirm(state, data) {
    Global_VM.$confirm(data.message, data.title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      data.fn()
    }).catch((err) => {
      console.log(err)
      Global_VM.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
  },
}
export default mutations