<template>
  <div class="column al-center">
      <span class="ans-phb mar-b-20">答题中奖情况</span>
      <div :class="['row','phb-item','mar-t-10', index > 2 ? 'pub-normal' : '']" v-for="(item, index) in phbRes" :key="index">
        <div class="row">
          <img v-if="index === 0" :src="require('../../assets/images/first.jpg')" alt="">
          <img v-else-if="index === 1" :src="require('../../assets/images/second.jpg')" alt="">
          <img v-else-if="index === 2" :src="require('../../assets/images/third.jpg')" alt="">
          <span v-else style="width: 22px" alt="">{{index + 1}}</span>
          <img :src="item.avatar || require('../../assets/images/avatar.png')" class="avatar mar-l-20" style="height: 30px;width: 30px" alt="">
          <span class="mar-l-20">{{item.nickName}}</span>
        </div>
        <span class="mar-l-30">{{item.score/10}}题</span>
        <span>{{item.prizeTitle}}: {{item.prizeName}}</span>
      </div>
    </div>
</template>

<script>
import {rewardRes} from '../../api/api'
export default {
  data() {
    return{
      actId: this.$store.state.actId,
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
      ]
    }
  },
  created() {
    this.getRewardRes()
  },
  methods: {
    getRewardRes() {
      rewardRes({interactionId: this.actId}).then(res => {
        this.phbRes = res.data
      })
    }
  },
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
    width 800px
    color #fff
    padding 10px 30px
    border-radius 10px
  .pub-normal
    background-color rgb(255, 155, 108)
</style>

