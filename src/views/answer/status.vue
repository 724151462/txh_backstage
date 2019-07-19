<template>
  <div class="container row al-start">
    <div class="column al-center">
      <img :src="require('../../assets/images/clock.jpg')" alt="">
      <span class="mar-t-30" style="font-size: 100px;color: rgb(255, 140, 86)">03:35</span>
      <el-button class="mar-t-30" @click="endAnswer" type="primary">结束答题</el-button>
    </div>
    <div class="column al-center">
      <span class="ans-phb mar-b-20">答题排行榜</span>
      <div :class="['row','phb-item','mar-t-10', index > 2 ? 'pub-normal' : '']" v-for="(item, index) in phbRes" :key="index">
        <img v-if="index === 0" :src="require('../../assets/images/first.jpg')" alt="">
        <img v-else-if="index === 1" :src="require('../../assets/images/second.jpg')" alt="">
        <img v-else-if="index === 2" :src="require('../../assets/images/third.jpg')" alt="">
        <span v-else style="width: 22px" alt="">{{index + 1}}</span>
        <img :src="require('../../assets/images/avatar.png')" class="avatar" style="height: 30px;width: 30px" alt="">
        <span>{{item.nickName}}</span>
        <span class="mar-l-30">6题</span>
      </div>
    </div>
  </div>
</template>

<script>
import {startAns, loopAns} from '../../api/api'
export default {
  data() {
    return{
      phbRes: [
        {
          nickName: '第一名',
        },
        {
          nickName: '第二名',
        },
        {
          nickName: '第三名',
        },
        {
          nickName: '第四名',
        }
      ],
      actId: this.$store.state.actId
    }
  },
  mounted() {
    setInterval(() => {
      this.loopAns()
    }, 5000);
  },
  methods: {
    endAnswer() {
      console.log(this.actId)
      startAns({interactionId: this.actId, status: 2}).then(res => {
        this.$router.push({path: '/answer/rewardres', query: {actId: this.actId}})
      })
    },
    loopAns() {
      loopAns(this.actId).then(res => {
        if(res.data.length !== 0) {
          this.phbRes.push(res.data)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .ans-phb
    color #ffffff
    padding 10px 30px
    background-color rgb(255, 140, 86)
    border-radius 30px
  .phb-item
    background-color rgb(255, 120, 66)
    width 300px
    color #fff
    padding 10px 30px
    border-radius 10px
  .pub-normal
    background-color rgb(255, 155, 108)
</style>

