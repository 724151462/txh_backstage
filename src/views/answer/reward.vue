<template>
  <div class="container" style="background-color: #fff">
    <div class="container" style="width:900px; height: 600px">
      <div class="row ju-start al-center pad-t-30">
        <span style="width:120px;text-align: end">设置答题时间：</span>
        <el-input v-model="prizeDo.expireTime" style="width: 200px;height:30px;line-height: 30px" placeholder="不填为手动结束"></el-input><span class="mar-l-10">分钟</span>
      </div>
      <div class="row ju-start al-start mar-t-20">
        <span style="width:120px;text-align: end">设置奖项：</span>
        <div class="reward-bg">
          <div class="row mar-t-20 pad-r-20">
            <span style="flex: 0 0 20%">奖项</span>
            <span style="flex: 0 0 20%">数量</span>
            <span style="flex: 0 0 50%">奖品</span>
          </div>
          <div class="row mar-t-20 pad-r-20" v-for="(item, index) in prizeDo.prizeList" :key="index">
            <span style="flex: 0 0 20%">{{item.correspondingRank}}</span>
            <el-input style="flex: 0 0 20%" v-model="item.count"></el-input>
            <el-input style="flex: 0 0 50%" v-model="item.prizeName"></el-input>
          </div>
        </div>
      </div>
      <div class="mar-t-30">
        <el-button type="primary" style="padding-left: 50px; padding-right: 50px;" @click="confirmPrize">发布</el-button>
      </div>
    </div>
    
  </div>
</template>

<script>
import {setPrize} from '../../api/api'
export default {
  data() {
    return {
      prizeRank: ['一等奖', '二等奖', '三等奖', '四等奖'],
      prizeDo: {
        expireTime: '',
        interactionId: this.$store.state.actId,
        prizeList: [
          // {
          //   correspondingRank: '',
          //   count: 0,
          //   prizeName: "123",
          //   type: 1
          // }
        ]
      }
    }
  },
  created() {
    this.setPrizeNum()
  },
  methods:{
    setPrizeNum() {
      this.$prompt('请设置奖项数', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            for (let index = 0; index < value; index++) {
              this.prizeDo.prizeList.push({
              correspondingRank: this.prizeRank[index],
              count: 0,
              prizeName: "",
              type: 1
            })
            
          }
          this.$message({
            type: 'success',
            message: `设置了${value}个奖项`
          });
        }).catch((err) => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    confirmPrize() {
      let data = JSON.parse(JSON.stringify(this.prizeDo));
      data.prizeList.forEach((element, i) => {
        element.correspondingRank = i+1
      })
      setPrize(data).then(res => {
        if(res.code === 200) {
          this.$message({
            message: '设置成功~',
            type: 'success'
          })
        }else{
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .reward-bg
    height 400px
    width 80%
    background-color #f2f2f2
</style>

