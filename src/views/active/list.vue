<template>
  <div class="container">
    <div class="wrap-parent container mar-t-30" style="width:1000px; margin-top:50px">
      <div class="wrap-child-45 item column al-center ju-center" @click="dialogVisible = true">
        <img :src="require('../../assets/images/create.jpg')" height="60" alt="">
        <span class="new-act">新建活动</span>
      </div>
      <div class="wrap-child-45 item row al-center ju-space" v-for="(item, index) in actList" :key="index"
        @click="toDetail(item)">
        <div class="act row center">
          <div class="t-white column al-center" :style="item.timeStatus===1? bgIng : (item.timeStatus === 2 ? bgPrepare : bgEnd)">
            <span class="mar-t-10 h3">{{item.timeStatus === 1 ? '活动进行中' : (item.timeStatus === 2 ? '活动准备中' : '活动已结束')}}</span>
            <span class="mar-t-20">{{item.startTime}}</span>
            <span>至</span>
            <span>{{item.endTime}}</span>
          </div>
          <div class="column txt-start">
            <span class="mar-b-30 txt-over">{{item.interactionName}}</span>
            <span class="new-act txt-over">{{item.interactionDescription}}</span>
            <span class="mar-t-30 txt-over">地点：{{item.interactionLoc}}</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="新建活动"
      :visible.sync="dialogVisible"
      width="30%" :modal='false'>
      <el-form :model="act">
        <el-form-item  class="row ju-start" label="活动标题">
          <el-input v-model="act.title" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item  class="row ju-start" label="活动描述">
          <el-input v-model="act.description" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item class="row ju-start" label="活动时间">
          <el-date-picker
            v-model="act.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item  class="row ju-start" label="活动地点">
          <el-input v-model="act.place"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ensureAct">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {actList, createAct} from '../../api/api'
import { type } from 'os';
export default {
  data() {
    return {
      dialogVisible: false,
      act: {},
      bgIng: {'background-image': `url(${require('../../assets/images/ing.png')})`},
      bgPrepare: {'background-image': `url(${require('../../assets/images/prepare.png')})`},
      bgEnd: {'background-image': `url(${require('../../assets/images/end.png')})`},
      actList: [
        {status: 1, title: "标题",content: '内容',joinNum: 100},
        {status: 2, title: "标题",content: '内容',joinNum: 100},
        {status: 3, title: "标题",content: '内容',joinNum: 100}
      ]
    }
  },
  created() {
    console.log(this.$route.params)
    // this.$parent.rightText = '时间' + new Date
    this.$emit('navText', {right: '活动中心'})
    this.activeList()
  },
  methods: {
    activeList(){
      actList().then(res => {
        this.actList = res.data.pageData
      })
    },
    toDetail(item) {
      if(item.timeStatus === 3) {
        this.$message({
          message: '亲，活动已经结束了~',
          type: 'warning'
        })
        return
      }
      this.$router.push({path: '/active/todo', query: {actId: item.interactionId}})
      this.$store.commit('setActId', item.interactionId)
    },
    ensureAct() {
      console.log(this.act)
      let {title, time, place, description} = this.act
      let data = {
        interactionName: title,
        startTime: time[0],
        endTime: time[1],
        interactionLoc: place,
        interactionDescription: description
      }
      createAct(data).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '创建活动成功',
            type: 'success'
          })
          this.activeList()
          this.dialogVisible = false
        }
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
  .item
    background #fff
    width 45%
    height 180px
    margin-right 5%
    margin-bottom 30px
  .act
    width 420px !important
  .act>div
    height 150px;
    width 200px;
    background-size cover
    border-radius 5px
  .new-act
    color #FF9A6C
    font-size 26px
  .txt-start>span
    width: 200px
</style>

