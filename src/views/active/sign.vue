<template>
  <div class="container row al-start" style="margin-top: 150px">
    <div class="column al-center">
      <img :src="require('../../assets/images/qrcode.jpg')" alt="">
      <el-button class="mar-t-30" style="border-radius: 30px;padding: 20px 50px;font-size: 26px" type="primary">结束签到</el-button>
    </div>
    <div class="column al-center">
      <span class="mar-v-30 sign-num">500人已签到</span>
      <div class="sign-bg">
        <div class="wrap-parent pad-t-10 pad-b-10 pad-l-10 pad-r-10" style="width: 500px">
          <img style="flex: 0 0 8%; margin-right: 2%; margin-bottom: 5px" v-for="(item, index) in signList" :key="index" :src="require('../../assets/images/avatar.png')" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {loopSign} from '../../api/api'
export default {
  data() {
    return{
      actId: this.$store.state.actId,
      signList: ['','']
    }
  },
  mounted() {
    setInterval(() => {
      this.loopSign()
    }, 5000);
  },
  methods:{
    loopSign() {
      loopSign(this.actId).then(res => {
        if(res.data.length !== 0) {
          this.signList.push(res.data)
        }
      })
    }
  }
}
</script>

<style lang="stylus">
  .sign-bg
    background-color rgb(239,239,239)
  .sign-num
    font-size 28px
    font-weight bold
    color rgb(255, 140, 86)
</style>

