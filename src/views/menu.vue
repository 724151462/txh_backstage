<template>
  <div class="container" style="margin-top: 100px;background-color: rgb(255,154,108)">
    <div class="parent center pad-t-30">
      <router-link :to="{path: '/active/list'}">
        <img :src="require('../assets/images/hdzx.jpg')" alt="">
      </router-link>
      <router-link :to="{path: '/jlgl/list'}">
        <img :src="require('../assets/images/jlgl.jpg')" alt="">
      </router-link>
      <router-link :to="{path: '/daren/list'}">
        <img :src="require('../assets/images/txdr.jpg')" alt="">
      </router-link>
      <!-- <div>
        <img :src="require('../assets/images/zcsh.jpg')" alt="">
      </div> -->
      <div @click="logout">
        <img :src="require('../assets/images/tcxt.jpg')" alt="">
      </div>
    </div>
  </div>
  
</template>

<script>
import Cookie from 'js-cookie'
export default {
  mounted(){
    this.$emit('navText', {left: ''})
  },
  methods: {
    logout() {
      Cookie.remove('token')
      this.$router.replace({path: '/'})
    }
  }
}
</script>

<style lang="stylus" scoped>
  .parent
    display flex
    justify-content flex-start
    flex-wrap wrap
    width 600px
  .parent>div
    margin-bottom 30px
    // flex 0 0 33%
</style>

