<template>
  <div class="container" style="margin-top: 200px">
    <div class="row">
      <router-link tag="li" :to="{path: '/active/sign'}" class="column al-center">
        <img class="radius-10" :src="require('../../assets/images/sign.jpg')" alt="">
        <span class="mar-t-30" style="font-size: 30px;color: #FF9A6C">现场签到</span>
      </router-link>
      <router-link tag="li" :to="{path: '/answer/detail'}" class="column al-center">
        <img class="radius-10" :src="require('../../assets/images/dt.jpg')" alt="">
        <span class="mar-t-30" style="font-size: 30px;color: #FF9A6C">答题抽奖</span>
      </router-link>
      <router-link tag="li" :to="{path: '/answer/sjcj'}" class="column al-center">
        <img class="radius-10" :src="require('../../assets/images/cj.jpg')" alt="">
        <span class="mar-t-30" style="font-size: 30px;color: #FF9A6C">随机抽奖</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      actId: this.$store.state.actId
    }
  },
  created() {
    console.log(this.$store.state.actId)
  }
}
</script>

<style>

</style>
