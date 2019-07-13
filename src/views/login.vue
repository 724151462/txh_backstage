<template>
  <div class="bg">
    <img class="img" width="650" :src="require('../assets/images/loginbg.jpg')" alt="">
    <div class="login">
      <h1 style="color:orange;font-family: FZHZ;font-size: 50px" class="mar-t-30">同乡会</h1>
      <div class="input-container">
        <el-input v-model="userName" placeholder="请输入用户名"></el-input>
        <el-input class="mar-t-20" type="password" v-model="password" placeholder="请输入密码"></el-input>
        <el-button type="primary" style="width: 200px" class="mar-t-30">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import '../assets/font/index.styl'

export default {
  name: 'login',
  components: {
    HelloWorld
  },
  data() {
    return{
      userName: '',
      password: '',
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bg
    width 1000px
    height 700px
    margin 0 auto
    margin-top 15%
  .img
    float:left
  .login
    float right
    height inherit
    width 30%
  .input-container
    margin-top 100px
    
</style>

