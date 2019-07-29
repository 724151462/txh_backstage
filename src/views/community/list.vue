<template>
  <div class="container bg-white" style="padding: 30px 20px">
    <div class="row mar-b-20">
      <div class="row">
        <img :src="require('../../assets/images/drlogo.jpg')" alt="">
        <span class="mar-l-10">话题管理</span>
      </div>
    </div>
    <el-table
    :data="tableData"
    border
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="topicTitle"
      label="主题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="内容">
    </el-table-column>
    <el-table-column
      prop="avatar"
      label="图片">
      <template slot-scope="scope" v-if="scope.row.topicImages.length !== 0">
        <el-button @click="prereview(scope.row.topicImages)" type="text" size="small">预览</el-button>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
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
import {getToplist, rzStatu} from '../../api/api'
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
    this.getToplist()
  },
  methods: {
    getToplist() {
      getToplist(this.listStatus).then(res => {
        this.tableData = res.data.pageData
      })
    },
    handleSelectionChange(data) {
      console.log(data)
    },
    del(item) {
      console.log(item)
    },
    prereview(item) {
      this.dialogVisible = true
      this.prereviewImg = item
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

