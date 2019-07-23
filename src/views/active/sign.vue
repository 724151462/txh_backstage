<template>
  <div class="container row al-start" style="margin-top: 150px">
    <div class="column al-center">
      <!-- <img :src="require('../../assets/images/qrcode.jpg')" alt=""> -->
      <div :style="bg" class="sign-code column al-center ju-center">
        <span class="mar-l-30">签到码：</span>
        <span>{{signCode}}</span>
      </div>
      <el-button class="mar-t-30" style="border-radius: 30px;padding: 20px 50px;font-size: 26px" type="primary" @click="endSign">结束签到</el-button>
    </div>
    <div class="column al-center">
      <span class="mar-v-30 sign-num">{{signList.length}}人已签到</span>
      <div class="sign-bg">
        <div class="wrap-parent pad-t-10 pad-b-10 pad-l-10 pad-r-10" style="width: 500px">
          <div class="column al-center mar-r-10" v-for="(item, index) in signList" :key="index">
            <img style="margin-right: 2%; margin-bottom: 5px" :src="item.avatar || require('../../assets/images/user.jpg')" width="50" height="50" alt="">
            <span class="txt-over" style="width: 50px">{{item.nickName}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {signNum, endSign, loopSign} from '../../api/api'
import { clearInterval } from 'timers';
export default {
  data() {
    return{
      bg: {'background-image':`url(${require('../../assets/images/sign.png')}`},
      actId: this.$store.state.actId,
      signList: [],
      timer: null,
      signCode: ''
    }
  },
  mounted() {
    this.getSignNum()
    this.timer = setInterval(() => {
      this.loopSign()
    }, 5000)
  },
  methods:{
    getSignNum() {
      signNum(this.actId).then(res => {
        if(res.code === 200){
          this.signCode = res.data
        }
      })
    },
    endSign() {
      endSign(this.actId).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '已结束签到',
            type: 'success'
          })
          window.clearInterval(this.timer)
        }
      })
    },
    loopSign() {
      loopSign(this.actId).then(res => {
        if(res.data.length !== 0) {
          this.signList = res.data
        }
      })
    }
  },
  beforeDestroy() {
    console.log(this)
    if(this.timer) window.clearInterval(this.timer); 
  }
}
</script>

<style lang="stylus">
  .sign-bg
    background-color rgb(239,239,239)
    min-height 600px
  .sign-num
    font-size 28px
    font-weight bold
    color rgb(255, 140, 86)
  .sign-code
    text-align center
    height 689px
    width 662px
    background-position center
    color #FF8C56
    font-size 100px
</style>

