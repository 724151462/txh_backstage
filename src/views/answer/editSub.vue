<template>
  <div class="container" style="background: #fff; height: 600px">
    <div class="pad-t-30 container column container" style="width: 800px">
      <el-input
        class="mar-t-20"
        style="width: 800px"
        v-model="subObj.subjectName"
        placeholder="题目内容"
        type="textarea"
      ></el-input>
      <div class="mar-t-20">
        <el-button @click="saveSubj" type="primary">保存题目</el-button>
      </div>
      <div class="row mar-t-20" style="width:800px">
        <el-tag>{{subObj.multipleSubject === 1 ? '多选' : '单选'}}</el-tag>
        <el-button type="primary" @click="addOption">添加选项</el-button>
      </div>
      <div class="mar-t-20">
        <div class="row" v-for="(option, index) in subObj.options" :key="index">
          <span>{{abc[index]}}</span>
          <el-input class="option-width mar-l-20" placeholder="请输入选项" v-model="option.optionName" @blur="saveOptions(option)"></el-input>
          <i
            class="el-icon-circle-check mar-l-10"
            style="font-size: 26px"
            @click="correctAnswer(index)"
            :class="option.subjectOptionType === 1 ? 'optionType' : ''"
          ></i>
          <i @click="delOption(index)" class="el-icon-remove-outline" style="font-size: 26px"></i>
        </div>
      </div>
    </div>
    <div class="mar-t-30">
      <el-button type="primary">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getSubj, startAns, editSubj, editOption } from "../../api/api";
export default {
  data() {
    return {
      rtype: 1,
      subObj: [
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
      subObj: {},
      abc: ["A", "B", "C", "D", "E", "F"],
      selectIndex: this.$route.query.subId,
      actId: this.$store.state.actId
    };
  },
  mounted() {
    this.getSubj(this.actId);
  },
  methods: {
    getSubj(actId) {
      getSubj(actId).then(res => {
        this.subObj = res.data.find((value, index, arr) => {
          console.log(value.subjectId, this.selectIndex);
          return value.subjectId == this.selectIndex;
        });
      });
    },
    saveSubj(option) {
      console.log(option)
      editSubj({
        subjectId: this.selectIndex,
        subjectName: this.subObj.subjectName
      }).then(res => {
        if(res.code === 200) {
          this.$message({
            message: "修改标题成功~",
            type: 'success'
          })
        }
      });
    },
    saveOptions(option) {
      editOption({
        subjectId: Number(this.selectIndex),
        optionId: option.optionId || -1,
        optionName: option.optionName,
        optionType: option.subjectOptionType
      }).then(res => {
        if(res.code === 200) {
          this.$message({
            message: "修改选项成功~",
            type: 'success'
          })
        }else if(res.code === 1000 || res.code === 440) {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      });
    },
    addSubject() {
      this.subObj.push({
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
      this.selectIndex = this.subObj.length - 1;
    },
    addSubj(id) {
      this.$router.push({ path: "/answer/create" });
    },
    delOption(index) {
      console.log(index)
      this.subObj.options.splice(index, 1)
    },
    editSubj() {
      this.$router.push({
        path: "/answer/edit",
        query: { subId: this.selectIndex }
      });
    },
    cleanSelect(item) {
      console.log(item)
      item.options.forEach(element => {
        element.subjectOptionType = false
      })
    },
    selectsubObj(index) {
      this.selectIndex = index - 1;
    },
    addOption() {
      if (this.subObj.options.length > this.abc.length - 1) {
        this.$message({
          message: "选项限制！",
          type: "warning"
        });
        return;
      }
      this.subObj.options.push({
        content: "",
        subjectOptionType: 2
      });
    },
    correctAnswer(index) {
      // 判断选项字数
      if(this.subObj.options[index].optionName.length < 3) {
        this.$message({
          message: '选项字数在[3-100]之间',
          type: 'warning'
        })
        return
      }else{
        this.subObj.options[index].subjectOptionType = this.subObj.options[index].subjectOptionType  == 1 ? 2 : 1;
      }
      // let times = 0;
      // console.log(this.subObj.multipleSubject)
      // this.subObj.options.forEach(element => {
      //   console.log(element.subjectOptionType)
      //   // 单选题
      //   if (this.subObj.multipleSubject === 2) {
      //     if (element.subjectOptionType === 1) times++;
      //   }
      // });
      // if (times > 1) {
      //   this.subObj.options[index].subjectOptionType = 2;
      //   this.$message({
      //     message: "单选题只有一个正确答案",
      //     type: "warning"
      //   });
      //   return
      // }
      this.saveOptions(this.subObj.options[index])
    },
    startAnswer() {
      startAns({ interactionId: this.actId, status: 1 }).then(res => {
        this.$router.push({
          path: "/answer/status",
          query: { actId: this.actId }
        });
      });
    }
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
  margin-bottom: 5px;
}

.bg-gray {
  background-color: #ababab;
}

.optionType {
  color: rgb(255, 140, 86);
}

.subj-select {
  background-color: #FF6600;
}
</style>
