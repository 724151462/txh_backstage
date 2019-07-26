<template>
  <div>
    <div class="row ju-ar con">
      <div @click="back">{{leftText}}</div>
      <div class="right">{{rightText}}</div>
    </div>
    <router-view @navText="setNavText"></router-view>
  </div>
</template>

<script>
import { setTimeout, setInterval } from 'timers';
export default {
  name: "navHeader",
  data() {
    return {
      rightText: new Date().toLocaleString(),
      leftText: '返回',
      timeText: true
    };
  },
  mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    if(this.timeText) {
      this.timer = setInterval(() => {
        _this.rightText = new Date().toLocaleString(); // 修改数据date
      }, 1000)
    }
  },
  methods: {
    setNavText(val) {
      let {left, right} = val
      // if (val.left !== undefined) this.leftText = left
      if (val.right !== undefined) {
        this.timeText = false
        this.rightText = right
      }
    },
    back() {
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="stylus" scoped>
  .con
    color: #FF9A6C
  .con>div
    height 100px
    line-height 100px
    font-size 35px
</style>
