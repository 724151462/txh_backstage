<template>
  <div class="container" style="background: #fff; height: 600px">
    <div class="pad-t-30 container column container" style="width: 800px">
      <div class="column" v-for="(item, index) in subList" :key="index">
        <div class="mar-t-20 row" style="width: 800px" v-if="index === 0">
          <div class="row al-start">
            <span>共 {{subList.length}} 题</span>
            <div class="row ju-start" style="width:600px;flex-wrap:wrap">
              <div style="flex: 0 0 6%" v-for="(i, index) in subList" :key="index" :class="['sub-index','mar-l-20',selectIndex+1 === i ? 'subj-select' : '']"
              @click="selectObj(i, index)">{{index+1}}</div>
            </div>
             <el-button @click="startAnswer" type="primary">开始答题</el-button>
          </div>
        </div>
        <div style="text-align: start; height: 400px" v-if="index === selectIndex">
          <span
            class="mar-t-20"
          >{{item.subjectName}}</span>
          <div class="row mar-t-20 ju-start">
            <el-tag>{{item.multipleSubject === 1 ? '多选' : '单选'}}</el-tag>
            <!-- <el-button type="primary" @click="addOption">添加选项</el-button> -->
          </div>
          <div class="mar-t-20">
            <div class="row" v-for="(option, index) in item.options" :key="index">
              <span>{{abc[index]}}</span>
              <span class="option-width mar-l-20">{{option.optionName}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row ju-center" style="width: 800px;">
        <el-button type="primary" @click="addSubj(actId)">新增题目</el-button>
        <el-button type="primary" @click="editSubj">编辑题目</el-button>
        <el-button type="primary" @click="deleteSub">删除题目</el-button>
        <el-button type="primary" @click="setReward">奖项设置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {getSubj, startAns, delSub} from '../../api/api'
export default {
  data() {
    return {
      rtype: 1,
      subList: [
        {
          subjectName: "",
          radio: 1,
          options: [
            {
              optionName: ""
            },
            {
              optionName: ""
            }
          ]
        }
      ],
      abc: ['A','B','C','D','E','F'],
      selectIndex: 0,
      selectId: '',
      actId: this.$store.state.actId
    };
  },
  mounted() {
    console.log(1243)
    this.getSubj(this.actId)
  },
  methods: {
    deleteSub() {
      this.$store.commit('delectConfirm', {
        title: '提示',
          message: '确认删除题目?', 
          fn:() => {
            delSub({subjectId: this.selectId, withOption: 1, interactionId: this.actId})
            .then(response=> {
              if(response.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.getSubj(this.actId)
              }else{
                this.$message({
                  message: '出错了',
                  type: 'warning'
                })
              }
            })
          }
      })
    },
    getSubj(actId) {
      getSubj(actId).then(res => {
         this.subList = res.data
      })
    },
    addSubject() {
      this.subList.push({
        subjectName: "",
        options: [
          {
            optionName: ""
          },
          {
            optionName: ""
          }
        ]
      });
      this.selectIndex = this.subList.length - 1
    },
    setReward() {
      this.$router.push({path: '/answer/reward'})
    },
    addSubj(id) {
      this.$router.push({path: '/answer/create'})
    },
    editSubj() {
      this.$router.push({path: '/answer/edit', query: {subId: this.selectId}})
    },
    selectObj(i, index) {
      this.selectIndex = index
      console.log(i)
      this.selectId = i.subjectId
    },
    addOption() {
      if(this.subList[this.selectIndex].options.length>this.abc.length-1) {
        this.$message({
          message:'选项限制！',
          type: 'warning'
          })
        return
      }
      this.subList[this.selectIndex].options.push({content: '', optionType: false})
      
    },
    correctAnswer(index) {
      
      this.subList[this.selectIndex].options[index].optionType = !this.subList[this.selectIndex].options[index].optionType
      console.log(this.subList[this.selectIndex].options)
      let times = 0
      this.subList[this.selectIndex].options.forEach(element => {
        // 单选题
        if(this.subList[this.selectIndex].radio === 1) {
          if(element.optionType === true) times++
          if (times > 1) {
            this.subList[this.selectIndex].options[index].optionType = false
            this.$message({
              message: '单选题只有一个正确答案',
              type: 'warning'
            })
          } 
        }
      })
    },
    startAnswer() {
      startAns({interactionId: this.actId, status: 1}).then(res => {
        this.$router.push({path: '/answer/status', query: {actId: this.actId}})
      })
    }
  },
  created() {
    this.subList.forEach(element => {
      element.options.forEach(option => {
        this.$set(option, 'optionType', false)
      })
    });
  }
};
</script>

<style lang="stylus" scoped>
.input-width {
  width: 800px;
}

.option-width {
  width: 700px;
}

.sub-index {
  height: 35px;
  border-radius: 50px;
  background-color: rgb(255, 140, 86);
  line-height: 35px;
  color: #fff;
  cursor: pointer;
  margin-bottom 5px
}

.bg-gray {
  background-color: #ababab;
}

.optionType {
  color: rgb(255, 140, 86);
}

.subj-select
  background-color #FF6600
</style>
