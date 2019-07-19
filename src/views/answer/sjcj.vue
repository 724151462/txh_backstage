<template>
  <div class="container row al-start" style="margin-top: 150px">
    <div class="column al-center">
      <img :src="require('../../assets/images/zjren.jpg')" alt="">
      <img :src="require('../../assets/images/avatar.png')" class="avatar zjren" alt="">
      <el-button class="cj-btn" @click="cj" type="primary">随机抽奖</el-button>
    </div>
    <div class="column al-center">
      <span class="mar-v-30 sign-num">500人已签到</span>
      <div class="sign-bg">
        <div class="wrap-parent pad-t-10 pad-b-10 pad-l-10 pad-r-10" style="width: 500px">
          <img style="flex: 0 0 8%; margin-right: 2%; margin-bottom: 5px" v-for="(item, index) in 100" :key="index" :src="require('../../assets/images/avatar.png')" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {sjcj} from '../../api/api'
export default {
  data() {
    return{
      actId: this.$store.state.actId
    }
  },
  methods:{
    cj() {
      sjcj({interactionId: this.actId, count: 1}).then(res => {

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
  .zjren
    position relative
    top -280px
    left -2px
    height 140px
    width 140px
  .cj-btn
    border-radius: 30px;
    padding: 20px 50px;
    font-size: 26px; 
    position: relative;
    top: -100px
</style>

