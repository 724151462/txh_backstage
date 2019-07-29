<template>
  <div class="container bg-white" style="padding: 30px 20px">
    <div class="row mar-b-20">
      <div class="row">
        <img :src="require('../../assets/images/drlogo.jpg')" alt="">
        <span class="mar-l-10">达人认证</span>
      </div>
      <div>
        <!-- <span @click="changeStatu(4)" :class="['sta-txt','mar-r-10',listStatus === 4 ?'active' : '']">未审核</span> -->
        <span @click="changeStatu(1)" :class="['sta-txt','mar-r-10',listStatus === 1 ?'active' : '']">审核通过</span>
        <span @click="changeStatu(3)" :class="['sta-txt','mar-r-10',listStatus === 3 ?'active' : '']">审核中</span>
        <span @click="changeStatu(2)" :class="['sta-txt','mar-r-10',listStatus === 2 ?'active' : '']">审核拒绝</span>
      </div>
    </div>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="peopleName"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="peopleBirthday"
      label="出生年份"
      width="180">
    </el-table-column>
    <el-table-column
      prop="peopleOccupation"
      label="职业/行业">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="公司/个人介绍">
    </el-table-column>
    <el-table-column
      prop="avatar"
      label="图片/视频">
      <template slot-scope="scope">
        <el-button @click="prereview(scope.row)" type="text" size="small">预览</el-button>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="pass(scope.row)" type="text" size="small">通过</el-button>
        <el-button @click="reject(scope.row)" type="text" size="small">退回</el-button>
      </template>
    </el-table-column>
  </el-table>
   <el-dialog
    title="预览"
    :visible.sync="dialogVisible"
    width="50%"
    :modal="false">
    <img class="mar-r-30" width="30%" v-for="(item, index) in prereviewImg" :key="index" :src="item" />
  </el-dialog>
  </div>
</template>

<script>
import {getRzlist, rzStatu, drImgPreview} from '../../api/api'
export default {
  data() {
    return {
      listStatus: 3,
      tableData: [
        
      ],
      prereviewImg: '',
      dialogVisible: false
    };
  },
  created() {
    this.getRzlist()
  },
  methods: {
    prereview() {

    },
    getRzlist() {
      getRzlist(this.listStatus).then(res => {
        this.tableData = res.data.pageData
      })
    },
    changeStatu(statu) {
      this.listStatus = statu
      this.getRzlist(statu)
    },
    pass(item) {
      rzStatu({peopleId: item.peopleId, auditStatus: 1}).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '已设置通过',
            type: 'success'
          })
          this.getRzlist(1)
        }
      })
    },
    reject(item) {
      rzStatu({peopleId: item.peopleId, auditStatus: 2}).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '已设置驳回',
            type: 'warning'
          })
          this.getRzlist(2)
        }
      })
    },
    prereview(item) {
      this.dialogVisible = true
      drImgPreview(item.peopleId).then(res => {
        this.prereviewImg = res.data.images
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
  .sta-txt
    display inline-block
    color #E5CDBC
    cursor pointer
    padding-bottom 5px
  .active
    font-weight bold
    color #FD8C5A
    border-bottom 3px solid #FD8C5A
</style>

