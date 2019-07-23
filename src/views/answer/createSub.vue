<template>
  <div class="container" style="background: #fff; height: 600px">
    <div class="pad-t-30 container column container" style="width: 800px">
      <div class="column" v-for="(item, index) in subList" :key="index">
        <div class="mar-t-20 row" style="width: 800px" v-if="index === 0">
          <div class="row">
            <span>共 {{subList.length}} 题</span>
            <div class="row ju-start" style="width:600px;flex-wrap:wrap">
              <div style="flex: 0 0 6%" v-for="(i, index) in subList.length" :key="index" :class="['sub-index','mar-l-20',selectIndex+1 === i ? 'subj-select' : '']"
              @click="selectObj(i)">{{i}}</div>
            </div>
            <div class="sub-index mar-l-10 bg-gray" style="width:35px" @click="addSubject">+</div>
          </div>
          <el-button @click="saveList" type="primary">保存</el-button>
        </div>
        <div v-if="index === selectIndex">
          <el-input
            class="mar-t-20"
            style="width: 800px"
            v-model="item.subjectName"
            placeholder="题目内容"
            type="textarea"
          ></el-input>
          <div class="row mar-t-20 ju-start">
            <el-radio v-model="item.multipleSubject" @change="cleanSelect(item)" :label="2">单选</el-radio>
            <el-radio v-model="item.multipleSubject" @change="cleanSelect(item)" :label="1">多选</el-radio>
            <el-button type="primary" @click="addOption">添加选项</el-button>
          </div>
          <div class="mar-t-20">
            <div class="row" v-for="(option, index) in item.options" :key="index">
              <span>{{abc[index]}}</span>
              <el-input
                class="option-width mar-l-20"
                placeholder="请输入选项"
                v-model="option.optionName"
              ></el-input>
              <i
                class="el-icon-circle-check mar-l-10"
                style="font-size: 26px"
                @click="correctAnswer(index)"
                :class="option.optionType === true ? 'optionType' : ''"
              ></i>
              <i @click="delOption(index)" class="el-icon-remove-outline" style="font-size: 26px"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createSubj} from '../../api/api'
export default {
  data() {
    return {
      rtype: 1,
      subList: [
        {
          subjectName: "",
          multipleSubject: 1,
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
      actId: this.$store.state.actId,
      selectIndex: 0
    };
  },
  mounted() {
  },
  methods: {
    addSubject() {
      this.subList.push({
        subjectName: "",
        options: [
          {
            optionName: "",
            optionType: false
          },
          {
            optionName: "",
            optionType: false
          }
        ]
      });
      this.selectIndex = this.subList.length - 1
    },
    delOption(index) {
      this.subList[this.selectIndex].options.splice(index)
    },
    saveList() {
      this.subList.forEach(element => {
        element.options.forEach(option => {
          if(option.optionType === true) {
            option.optionType = 1
          }else{
            option.optionType = 2
          }
        })
      });
      console.log(this.subList)
      createSubj({interactionId: this.actId, subjectList: this.subList}).then(res => {
        if(res.code === 200) {
          this.$confirm('设置题目成功，前往签到？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: '/active/sign'
            })
          })
        }
      })
    },
    selectObj(index) {
      this.selectIndex = index-1
    },
    cleanSelect(item) {
      console.log(item)
      item.options.forEach(element => {
        element.optionType = false
      })
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
        if(this.subList[this.selectIndex].multipleSubject === 2) {
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
