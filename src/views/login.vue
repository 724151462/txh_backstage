<template>
  <div class="bg">
    <img class="img" width="650" :src="require('../assets/images/loginbg.jpg')" alt="">
    <div class="login">
      <h1 style="color:orange;font-family: FZHZ;font-size: 50px" class="mar-t-30">同乡会</h1>
      <div class="input-container">
        <el-input v-model="userName" placeholder="请输入用户名" style="width: 300px"></el-input>
        <el-input class="mar-t-20" type="password" style="width: 300px" v-model="passwd" placeholder="请输入密码"></el-input>
        <el-button type="primary" style="width: 200px" class="mar-t-30" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Cookie from 'js-cookie'
import {login} from '../api/api'
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
      passwd: '',
    }
  },
  methods: {
    login() {
      login({userName: this.userName, passwd: this.passwd}).then(res => {
        if (res.code === 200) {
          Cookie.set('token', res.data.token)
          this.$router.push({path: '/index/menu'})
        }
      })
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
    width 35%
    height 468px
    background-color #fff
  .input-container
    margin-top 100px
    
</style>

