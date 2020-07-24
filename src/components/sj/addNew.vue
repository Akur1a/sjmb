<template>
  <div id="addNew">
    <!--    编辑-->
    <div class="main"
         v-if="!showPreview&&dataInfo.tx">
      <div class="tg">
        <div style="display: flex;justify-content: space-between;align-items: center">
          <p class="mainTitle">题干</p>
          <div v-if="dataInfo.tx=='composition'">
            <span class="mainTitle"
                  style="margin-right: 15px">字数</span>
            <InputNumber v-model="zwNumber"
                         min="1"
                         :step="1"
                         style="width: 225px"
                         placeholder="请填写"></InputNumber>
          </div>
        </div>
        <div class="editorTG">
          <Ueditor ref="ueTG"
                   id="ed1"
                   height='95'
                   :value='tg'
                   @getEditorTxt="getTgTxt"
                   @updateEditor='getTG'></Ueditor>
        </div>
      </div>
      <!--      作文-->
      <div class="jdda"
           v-if="dataInfo.tx=='composition'">
        <p class="mainTitle">评分标准</p>
        <div class="editorJX">
          <Ueditor ref="uezw"
                   id="ed34"
                   height='111'
                   :value='zw'
                   @getEditorTxt="getZwTxt"
                   @updateEditor='getZw'></Ueditor>
        </div>
      </div>

      <!--      填空-->
      <div class="tkda"
           v-if="dataInfo.tx=='gap_filling'">
        <p class="mainTitle">答案</p>
        <div v-for="(item,index) in tkdaList"
             :key="index"
             class="tkdaItem">
          <span>{{index+1}}</span>
          <Input v-model="tkdaList[index]"
                 style="width: 530px;margin-right:7px" />
          <img src="../../assets/close.png"
               alt=""
               class="delItem delItem1"
               @click.stop="deltkItem(index)">
        </div>
        <div class="addxx"
             @click="addtkxx">
          添加选项
        </div>
      </div>

      <!--      名词解释-->
      <div class="jdda"
           v-if="dataInfo.tx=='answer'">
        <p class="mainTitle">答案</p>
        <div class="editorJX">
          <Ueditor ref="uejdda"
                   id="ed3"
                   height='111'
                   :value='answerHtml'
                   @getEditorTxt="getJdTxt"
                   @updateEditor='getAnswer'></Ueditor>
        </div>
      </div>
      <!--      简答-->
      <div class="jdda"
           v-if="dataInfo.tx=='shortAnswer'">
        <p class="mainTitle">答案</p>
        <div class="editorJX">
          <Ueditor ref="uejdda"
                   id="ed3"
                   height='111'
                   :value='answerHtml'
                   @getEditorTxt="getJdTxt"
                   @updateEditor='getAnswer'></Ueditor>
        </div>
      </div>
      <!--      论述-->
      <div class="jdda"
           v-if="dataInfo.tx=='discussion'">
        <p class="mainTitle">答案</p>
        <div class="editorJX">
          <Ueditor ref="uejdda"
                   id="ed3"
                   height='111'
                   :value='discussionHtml'
                   @getEditorTxt="getJdTxt"
                   @updateEditor='getAnswer'></Ueditor>
        </div>
      </div>
      <!--            主观题 答题行数-->
      <div class="pdda"
           style="display: flex;align-items: center;height: 62px"
           v-if="dataInfo.tx=='answer'||dataInfo.tx=='shortAnswer'||dataInfo.tx=='discussion'||dataInfo.tx=='composition'">
        <p style="font-size: 16px;font-weight: bolder;font-family: FZLTZHK--GBK1;color: rgba(57, 61, 73, 1);margin-right: 20px">
          作答行数</p>
        <InputNumber :min="1"
                     :step="1"
                     v-model="lineNumber"
                     style="width: 200px"></InputNumber>
      </div>
      <!--判断-->
      <div class="pdda"
           v-if="dataInfo.tx=='judge'">
        <p class="mainTitle">答案</p>
        <RadioGroup v-model="pdda">
          <Radio label="正确"></Radio>
          <Radio label="错误"></Radio>
        </RadioGroup>
      </div>

      <!--      单选-->
      <div class="xx"
           v-if="dataInfo.tx=='single_select'">
        <!-- <div class="xx"> -->
        <p class="mainTitle">选项</p>
        <RadioGroup v-model="answer"
                    size='large'>
          <div v-for="(item,index) in xxList"
               :key="index">
            <Radio :label="index"
                   class="xxRadio"
                   :class="(index+1)%4==0?'rightRadio':''">
              <span style="width:14px;display:inline-block">{{String.fromCharCode(index+65)}}</span>
              <Input v-model="xxList[index]"
                     class="xxInput" />
            </Radio>
            <img src="../../assets/close.png"
                 alt=""
                 class="delItem delItem2"
                 style="margin-top: -20px;"
                 @click.stop="delRadioItem(index)">
          </div>
        </RadioGroup>
        <div class="addxx"
             @click="addxx">
          添加选项
        </div>
      </div>
      <!--      多选-->
      <div class="xx"
           v-if="dataInfo.tx=='multi_select'">
        <p class="mainTitle">选项</p>
        <CheckboxGroup v-model="answer1"
                       size='large'>
          <div v-for="(item,index) in xxList"
               :key="index">
            <Checkbox :label="index"
                      class="xxRadio"
                      :class="(index+1)%4==0?'rightRadio':''">
              <span style="width:14px;display:inline-block">{{String.fromCharCode(index+65)}}</span>
              <Input v-model="xxList[index]"
                     class="xxInput" />
              <!--              <Input v-model="choosedDx"-->
              <!--                     @on-change="changeDx(index)"-->
              <!--                     class="xxInput" />-->
            </Checkbox>
            <img src="../../assets/close.png"
                 alt=""
                 class="delItem delItem3"
                 @click.stop="delRadioItem(index)">
          </div>
        </CheckboxGroup>
        <div class="addxx"
             @click="addxx">
          添加选项
        </div>
      </div>
    </div>
    <!--    英语阅读 编辑-->
    <div v-if="dataInfo.tx==='English_reading'&&!showPreview">
      <!--{{yyyddaList.length}}-->
      <div v-for="(item,index) in yyyddaList"
           :key="index"
           class="yyydItem">
        <div class="yyydtg"
             @Mousemove="countIndex(index)">
          <p>{{index+1}}</p>
          <RadioGroup v-model="yyyddaList[index].tx"
                      style="margin-top:-5px;">
            <Radio label="单选"></Radio>
            <Radio label="多选"></Radio>
            <Radio label="问答"></Radio>
          </RadioGroup>
          <img src="../../assets/delete.png"
               alt=""
               style="position:absolute;right: 65px"
               @click="deleteYyyd(index)">
          <div class="editorJX"
               style="margin-top:19px">
            <Ueditor :ref="item.ueditorRefTg"
                     :id="item.ueditorIdTg"
                     :index=index
                     height='95'
                     :value='item.tg'
                     @getEditorTxt="getyyydTxt($event,index)"
                     @updateEditor='getyyydtg($event,index)'
                     @readingIndex="readingIndex"></Ueditor>
          </div>
        </div>
        <div v-if="yyyddaList[index].tx=='单选'">
          <p class="mainTitle">选项</p>
          <RadioGroup v-model="yyyddaList[index].answer"
                      size='large'>
            <div v-for="(items,indexs) in yyyddaList[index].xxList"
                 :key="indexs">
              <Radio :label="indexs"
                     class="xxRadio"
                     :class="(indexs+1)%4==0?'rightRadio':''">
                <span style="width:14px;display:inline-block">{{String.fromCharCode(indexs+65)}}</span>
                <Input v-model="yyyddaList[index].xxList[indexs]"
                       class="xxInput"
                       style="width:530px" />
              </Radio>
              <img src="../../assets/close.png"
                   alt=""
                   style="margin-top: -20px"
                   class="delItem delItem4"
                   @click.stop="delyyydRadioItem(index,indexs)">
            </div>
          </RadioGroup>
          <div class="addxx"
               @click="addyyydxx(index)">
            添加选项
          </div>
        </div>
        <div v-else-if="yyyddaList[index].tx==='多选'">
          <p class="mainTitle">选项</p>
          <CheckboxGroup v-model="yyyddaList[index].answer1"
                         size='large'>
            <div v-for="(items,indexs) in yyyddaList[index].xxList"
                 :key="indexs">
              <Checkbox :label="indexs"
                        class="xxRadio"
                        :class="(index+1)%4==0?'rightRadio':''">
                <span style="width:14px;display:inline-block">{{String.fromCharCode(indexs+65)}}</span>
                <Input v-model="yyyddaList[index].xxList[indexs]"
                       class="xxInput"
                       style="width:530px" />
              </Checkbox>
              <img src="../../assets/close.png"
                   alt=""
                   class="delItem delItem5"
                   @click.stop="delyyydRadioItem(index,indexs)">
            </div>
          </CheckboxGroup>
          <div class="addxx"
               @click="addyyydxx(index)">
            添加选项
          </div>
        </div>
        <div v-else-if="yyyddaList[index].tx==='问答'">
          <p class="mainTitle">答案</p>
          <div class="editorJX"
               style="margin-top:19px">
            <Ueditor :ref="item.ueditorRefWd"
                     :id="item.ueditorIdWd"
                     :index=index
                     height='95'
                     :value='item.wd'
                     @getEditorTxt="getyyydwdTxt($event,index)"
                     @updateEditor='getyyydwd($event,index)'></Ueditor>
          </div>
        </div>
      </div>
    </div>
    <!--      完形 编辑-->
    <!--    {{!showPreview}}{{dataInfo.tx}}-->
    <div v-if="dataInfo.tx=='cloze_test' && !showPreview">
      <div v-for="(item,index) in clozeList"
           :key="index"
           class="yyydItem">
        <div class="wxtkTitle">
          <span>{{index+1}}</span>
          <img src="../../assets/delete.png"
               alt=""
               @click="deleteWxtk(index)">
          <!--          <span @click="deleteWxtk(index)"> 删除</span>-->
        </div>
        <RadioGroup v-model="item.answer"
                    size='large'>
          <div v-for="(items,indexs) in item.xxList"
               :key="indexs">
            <Radio :label="indexs"
                   class="xxRadio"
                   :class="(indexs+1)%4==0?'rightRadio':''">
              <span style="width:14px;display:inline-block">{{String.fromCharCode(indexs+65)}}</span>
              <Input v-model="clozeList[index].xxList[indexs]"
                     class="xxInput"
                     style="width:530px" />
            </Radio>
            <img src="../../assets/close.png"
                 alt=""
                 style="margin-top: -20px"
                 class="delItem delItem6"
                 @click.stop="delClozeRadioItem(index,indexs)">
          </div>

        </RadioGroup>
        <div class="addxx"
             @click="addClozeXx(index)">
          添加选项
        </div>
      </div>
    </div>
    <div class="bottonBtn5"
         @click="addEnglishItem"
         v-if="dataInfo.tx=='English_reading'||dataInfo.tx=='cloze_test'">添加小题
    </div>
  </div>
</template>

<script>
import common from "../../common/util";
import Ueditor from "..//ueditor";
import bus from "../../common/reLoadBus"

export default {
  name: "addNew",
  components: {
    Ueditor
  },
  data () {
    return {
      discussionHtml: "",//论述题
      showPreview: false,
      txList: [],
      ndList: [],
      cjList: [],
      bqList: [],
      visible: false,
      tx: "",
      txTxt: "",
      nd: "",
      ndTxt: "",
      cj: "",
      cjTxt: "",
      zsd: "",
      bq: [],
      bqItems: [],
      editorData: "",
      answer: "",
      // xxList: ["", "", "", ""],
      xxList: ["", "", "", ""],
      choosedDx: '',
      tg: "",
      tgTxt: "",
      jx: "",
      answer1: [],
      tkdaList: ["", "", "", ""],
      jdda: "",
      pdda: "",
      yyyddaList: [
        {
          tg: "",//富文本
          answer: '',
          answer1: [],
          ueditorRefTg: 'uezw',
          ueditorIdTg: 'ed34',
          ueditorIdWd: 'ed3',//问答
          ueditorRefWd: 'uejdda',
          xxList: ["", "", "", ""],
          wd: ''
        }
      ],
      newEnglishReadingL: {
        tx: "单选",
        tg: "",
        tgTxt: "",//题干 纯文本
        jx: "",
        jxTxt: "",//解析 纯文本
        wd: "",
        wdTxt: "",//问答 纯文本
        answer: "",
        answer1: [],
        xxList: ["", "", "", ""]
      },
      answerHtml: "",
      answerWords: "",//解析题答案
      clozeList: [
        {
          answer: '',
          xxList: ["", "", "", ""],
        }
      ],//完形填空
      newCloze: {
        answer: "",
        xxList: ["", "", "", ""]
      },
      zw: "",//作文
      zwTxt: "",//作文纯文本
      zwNumber: 1,//作文 字数
      dataInfo: {
        tx: "",
        nd: "",
        cj: ""
      },
      editTest: false,//编辑考试
      EnglishReadingIndex: 0,//英语阅读 index
      lineNumber: 1//主观题 作答行数
    };
  },
  props: {
    testType: "",
    testValue: {}
  },
  mounted () {
    this.$set(this.dataInfo, "tx", this.testType);
    if (this.testValue.newData) this.getInfo();
    bus.$off("saveChild123");
    bus.$on("saveChild123", (data) => {
      if (data) {
        this.saveAndNext();
      }
    });
  },
  methods: {
    getInfo () {
      console.log(123)
      this.editTest = true;
      this.stInfo = this.testValue;
      this.stInfo.tx = this.stInfo.stlx;
      this.stInfo.nd = this.stInfo.stnd;
      this.stInfo.cj = this.stInfo.rzcj;
      this.dataInfo = this.stInfo;
      this.zsd = this.stInfo.zsd;
      this.tgTxt = this.stInfo.xttg;
      this.txTxt = this.stInfo.xtxq.txTxt;
      this.ndTxt = this.stInfo.xtxq.ndTxt;
      this.cjTxt = this.stInfo.xtxq.cjTxt;
      this.tkdaList = this.stInfo.xtxq.tkdaList;
      this.answerHtml = this.stInfo.xtxq.answerHtml;
      this.answerWords = this.stInfo.xtxq.answerWords;
      this.pdda = this.stInfo.xtxq.pdda;
      this.yyyddaList = this.stInfo.xtxq.yyyddaList;
      this.clozeList = this.stInfo.xtxq.clozeList;
      this.answer = this.stInfo.xtxq.answer;
      this.answer1 = this.stInfo.xtxq.answer1;
      this.zw = this.stInfo.xtxq.zw;
      this.zwTxt = this.stInfo.xtxq.zwTxt;
      this.zwNumber = Number(this.stInfo.xtxq.zwNumber);
      this.lineNumber = this.stInfo.xtxq.lineNumber;
      this.bq = this.stInfo.xtxq.bq;
      this.bqItems = this.bq;
      this.tg = this.stInfo.xtxq.xttg;
      this.jx = this.stInfo.xtxq.stjx;
      this.xxList = [];
      for (let k in this.stInfo.xtxq.xzxx) {
        this.xxList.push(this.stInfo.xtxq.xzxx[k]);
      }
      this.$forceUpdate();
    },
    input (obj) {
    },
    showDropDown () {
      this.visible = true;
    },
    closeDorpDown () {
      this.visible = false;
    },
    confirmDorpDown () {
      this.bqItems = [];
      for (let i = 0; i < this.bq.length; i++) {
        this.bqItems.push(this.bq[i]);
      }
      this.visible = false;
    },
    delbqListItem (index) {
      this.bqItems.splice(index, 1);
      this.bq.splice(index, 1);
    },
    getJdTxt (value) {
      //解答 题干
      this.answerWords = value;//纯文本
    },
    getAnswer (editorValue) {
      //获取解析文本
      if (this.dataInfo.tx == "discussion") {
        this.discussionHtml = editorValue
      } else {
        this.answerHtml = editorValue;//html
      }
    },
    getTgTxt (value) {
      //题干 纯文本
      this.tgTxt = value;
      let params = {
        txt: value,
        type: "tktg"
      };
      bus.$emit("countHeight", true);
      bus.$emit("tgInfo", params);
    },
    getTG (editorValue) {
      this.tg = editorValue;
    },
    getJX (editorValue) {
      this.jx = editorValue.content;
    },
    getZwTxt (value) {
      //作文 纯文本
      this.zwTxt = value;
    },
    getZw (editorValue) {
      this.zw = editorValue;
    },
    countIndex (val) {

    },
    readingIndex (index) {
      if (index) this.EnglishReadingIndex = index;
    },
    getyyydTxt (value, index) {
      //英语阅读 text
      this.yyyddaList[index].tgTxt = value;
    },
    getyyydtg (editorValue, index) {
      //英语阅读 题干
      this.yyyddaList[index].tg = editorValue;
    },
    getyyydjx (editorValue) {
      //英语阅读 解析 无用20200719
      this.yyyddaList[this.EnglishReadingIndex].jx = editorValue;
    },
    getyyydwdTxt (value, index) {
      //英语阅读 问答 text
      this.yyyddaList[index].wdTxt = value;
    },
    getyyydwd (editorValue, index) {
      //英语阅读 问答
      this.yyyddaList[index].wd = editorValue;
    },
    changeDx (index) {
      this.choosedDx = this.xxList[index];
    },
    delRadioItem (index) {
      if (this.xxList.length > 2) {
        this.xxList.splice(index, 1);
        this.answer1 = "";//多选
        this.choosedDx = "";
        this.answer = "";//单选
      } else {
        this.$Message.error("至少保留两个选项！");
      }
    },
    delyyydRadioItem (index, indexs) {
      //英语阅读 删除单选
      if (this.yyyddaList[index].xxList.length > 2) {
        this.yyyddaList[index].xxList.splice(indexs, 1);
        this.yyyddaList[index].answer = "";//单选
        this.yyyddaList[index].answer1 = '';//多选
      } else {
        this.$Message.error("至少保留两个选项！");
      }
    },
    delClozeRadioItem (index, indexs) {
      //完形填空 删除单选
      if (this.clozeList[index].xxList.length > 2) {
        this.clozeList[index].xxList.splice(indexs, 1);
        this.clozeList[index].answer = "";
      } else {
        this.$Message.error("至少保留两个选项！");
      }
    },
    deleteWxtk (index) {
      //完形填空 删除大项
      this.$Modal.confirm({
        title: "删除",
        content: "<p>是否删除该问题？</p>",
        onOk: () => {
          this.clozeList.splice(index, 1);
          this.$Message.success("删除成功！");
        },
        onCancel: () => {

        }
      });
      setTimeout(() => {
        for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
          document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
        }
      }, 10);
    },
    deltkItem (index) {
      if (this.tkdaList.length > 1) {
        this.tkdaList.splice(index, 1);
      } else {
        this.$Message.error("至少保留一个答案！");
      }
    },
    addxx () {
      if (this.xxList.length < 26) {
        this.xxList.push("");
      } else {
        this.$Message.error("最多26个选项！");
      }
    },
    addyyydxx (index) {
      //英语阅读 添加子选项
      if (this.yyyddaList[index].xxList.length < 26) {
        this.yyyddaList[index].xxList.push("");
      } else {
        this.$Message.error("最多26个选项！");
      }
    },
    addClozeXx (index) {
      //英语阅读 添加子选项
      if (this.clozeList[index].xxList.length < 26) {
        this.clozeList[index].xxList.push("");
      } else {
        this.$Message.error("最多26个选项！");
      }
    },
    addtkxx () {
      this.tkdaList.push("");
    },
    getjdda (editorValue) {
      this.jdda = editorValue;
    },
    saveAndNext () {
      let xx = {};
      let txTxt = "";
      let ndTxt = "";
      let cjTxt = "";
      for (let i = 0; i < this.txList.length; i++) {
        if (this.txList[i].zdz == this.dataInfo.tx) {
          txTxt = this.txList[i].zdmc;
        }
      }
      for (let j = 0; j < this.ndList.length; j++) {
        if (this.ndList[j].zdz == this.dataInfo.nd) {
          ndTxt = this.ndList[j].zdmc;
        }
      }
      for (let k = 0; k < this.cjList.length; k++) {
        if (this.cjList[k].zdz == this.dataInfo.cj) {
          cjTxt = this.cjList[k].zdmc;
        }
      }
      if (this.tg == "") {
        this.$alert("题干信息不完整,请补充信息", "信息不全", {
          confirmButtonText: "确定",
          callback: action => {
          }
        });
        return false;
      } else {
      }
      //名词解释 简答 论述 答案
      if ((this.dataInfo.tx == "answer" && this.answerHtml == "") || (this.dataInfo.tx == "shortAnswer" && this.answerHtml == "") || (this.dataInfo.tx == "discussion" && this.discussionHtml == "")) {
        this.$Modal.warning({
          title: "信息不全",
          content: "<p>答案信息不完整，请补充信息！</p>"
        });
        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
            document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
          }
        }, 10);
        return false;
      }
      //填空
      let checkTk = false;
      if (this.dataInfo.tx == "gap_filling") {
        this.tkdaList.forEach(item => {
          if (item !== "") checkTk = true;
        });
      }
      if (this.dataInfo.tx == "gap_filling" && !checkTk) {
        this.$Modal.warning({
          title: "信息不全",
          content: "<p>填空答案信息不完整，请至少添加一项答案！</p>"
        });
        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
            document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
          }
        }, 10);
        return false;
      }
      //判断
      if (this.dataInfo.tx == "judge" && this.pdda == "") {
        this.$Modal.warning({
          title: "信息不全",
          content: "<p>判断答案信息不完整，请补充信息！</p>"
        });
        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
            document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
          }
        }, 10);
        return false;
      }
      //英语阅读
      let checkTg = true;//题干
      let checkAnswer = true;//单选 答案
      let checkSingle = true;//单选 答案数量
      let checkAnswer1 = true;//多选 答案
      let checkSingle1 = true;//多选 答案数量
      let checkWd = true;//问答
      if (this.dataInfo.tx == "English_reading") {
        let canSave = true;
        if (this.yyyddaList.length > 0) {
          this.yyyddaList.forEach(item => {
            if (item.tg === "") {
              checkTg = false;
            }
            if (item.tx === "单选") {
              if (item.answer === "") {
                checkAnswer = false;
              }
              let singleNumber = 0;
              item.xxList.forEach(itemSingle => {
                if (itemSingle !== "") singleNumber += 1;
                if (itemSingle == '') {
                  canSave = false;
                  this.$Modal.warning({
                    title: "信息不全",
                    content: "<p>答案信息不完整，请将选项补充完整！</p>"
                  });
                  setTimeout(() => {
                    for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
                      document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
                    }
                  }, 10);
                  return false;
                }

              });
              if (singleNumber < 2) {
                checkSingle = false;
              }
            } else if (item.tx === "多选") {
              if (item.answer1.length == 0) {
                checkAnswer1 = false;
              }
              let mutliNumber = 0;
              item.xxList.forEach(itemMutli => {
                if (itemMutli !== "") mutliNumber += 1;
                if (itemMutli == '') {
                  canSave = false;
                  this.$Modal.warning({
                    title: "信息不全",
                    content: "<p>答案信息不完整，请将选项补充完整！</p>"
                  });
                  setTimeout(() => {
                    for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
                      document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
                    }
                  }, 10);
                  return false;
                }
              });
              if (mutliNumber < 2) {
                checkSingle1 = false;
              }
            } else {
              if (item.wd === "") {
                this.$Modal.warning({
                  title: "信息不全",
                  content: "<p>答案信息不完整，请将问答题答案补充完整！</p>"
                });
                setTimeout(() => {
                  for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
                    document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
                  }
                }, 10);
                canSave = false;
                return false;
              }
            }
          });
        } else {
          this.$Modal.warning({
            title: "信息不全",
            content: "<p>问题信息不完整，请至少添加一项问题！</p>"
          });
          setTimeout(() => {
            for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
              document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
            }
          }, 10);
          return false;
        }
        if (!canSave) return false
      }
      if (this.dataInfo.tx == "English_reading" && !checkTg) {
        this.$Modal.warning({
          title: "信息不全",
          content: "<p>问题题干信息不完整，请补充信息！</p>"
        });
        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
            document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
          }
        }, 10);
        return false;
      }
      if (this.dataInfo.tx == "English_reading" && !checkAnswer) {
        this.$Modal.warning({
          title: "信息不全",
          content: "<p>单选答案信息不完整，请选择正确答案！</p>"
        });
        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
            document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
          }
        }, 10);
        return false;
      }
      if (this.dataInfo.tx == "English_reading" && !checkSingle) {
        this.$Modal.warning({
          title: "信息不全",
          content: "<p>单选答案信息不完整，请至少添加两项答案！</p>"
        });
        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
            document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
          }
        }, 10);
        return false;
      }
      if (this.dataInfo.tx == "English_reading" && !checkAnswer1) {
        this.$Modal.warning({
          title: "信息不全",
          content: "<p>多选答案信息不完整，请至少选择一项正确答案！</p>"
        });
        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
            document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
          }
        }, 10);
        return false;
      }
      if (this.dataInfo.tx == "English_reading" && !checkSingle1) {
        this.$Modal.warning({
          title: "信息不全",
          content: "<p>多选答案信息不完整，请至少添加两项答案！</p>"
        });
        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
            document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
          }
        }, 10);
        return false;
      }
      if (this.dataInfo.tx == "English_reading" && !checkSingle1) {
        this.$Modal.warning({
          title: "信息不全",
          content: "<p>问答答案信息不完整，请补充答案！</p>"
        });
        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
            document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
          }
        }, 10);
        return false;
      }
      //完形填空
      let checkWxtkAnswer = true;
      let checkWxtkDa = true;
      if (this.dataInfo.tx == "cloze_test") {
        if (this.clozeList.length > 0) {
          this.clozeList.forEach(item => {
            if (item.answer === "") {
              checkWxtkAnswer = false;
            }
            let singleNumber = 0;
            item.xxList.forEach(itemSingle => {
              if (itemSingle !== "") singleNumber += 1;
            });
            if (singleNumber < 2) {
              checkWxtkDa = false;
            }
          });
        } else {
          this.$Modal.warning({
            title: "信息不全",
            content: "<p>答案信息不完整，请至少添加一项答案！</p>"
          }); setTimeout(() => {
            for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
              document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
            }
          }, 10);

          return false;
        }
      }
      if (this.dataInfo.tx == "cloze_test" && !checkWxtkAnswer) {
        this.$Modal.warning({
          title: "信息不全",
          content: "<p>答案信息不完整，请选择正确答案！</p>"
        });
        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
            document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
          }
        }, 10);
        return false;
      }
      if (this.dataInfo.tx == "cloze_test" && !checkWxtkDa) {
        this.$Modal.warning({
          title: "信息不全",
          content: "<p>答案信息不完整，请至少添加两项答案！</p>"
        });
        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
            document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
          }
        }, 10);
        return false;
      }
      //作文
      if (this.dataInfo.tx == "composition" && this.zw == "") {
        this.$Modal.warning({
          title: "信息不全",
          content: "<p>作文信息不完整，请补充完整评分标准！</p>"
        });
        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
            document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
          }
        }, 10);
        return false;
      }
      //单选
      if (this.dataInfo.tx == "single_select") {
        let canSave = true;//是否可保存
        if (this.answer === "") {
          this.$Modal.warning({
            title: "信息不全",
            content: "<p>答案信息不完整，请选择正确答案！</p>"
          });
          setTimeout(() => {
            for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
              document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
            }
          }, 10);
          return false;
        }
        let singleNumber = 0;
        this.xxList.forEach(itemSingle => {
          if (itemSingle !== "") singleNumber += 1;
          if (itemSingle == '') {
            canSave = false;
            this.$Modal.warning({
              title: "信息不全",
              content: "<p>答案信息不完整，请将选项补充完整！</p>"
            });
            setTimeout(() => {
              for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
                document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
              }
            }, 10);
            return false;
          }
        });
        if (singleNumber < 2) {
          this.$Modal.warning({
            title: "信息不全",
            content: "<p>答案信息不完整，请至少添加两项答案！</p>"
          });
          setTimeout(() => {
            for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
              document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
            }
          }, 10);
          return false;
        }
        if (!canSave) return false
      }
      //多选
      if (this.dataInfo.tx == "multi_select") {
        let canSave = true;
        if (this.answer1.length == 0) {
          this.$Modal.warning({
            title: "信息不全",
            content: "<p>多选答案信息不完整，请至少选择一项正确答案！</p>"
          });
          setTimeout(() => {
            for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
              document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
            }
          }, 10);
          return false;
        }
        let mutliNumber = 0;
        this.xxList.forEach(itemMutli => {
          if (itemMutli !== "") mutliNumber += 1;
          if (itemMutli == '') {
            canSave = false;
            this.$Modal.warning({
              title: "信息不全",
              content: "<p>答案信息不完整，请将选项补充完整！</p>"
            });
            setTimeout(() => {
              for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
                document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
              }
            }, 10);
            return false;
          }
        });
        if (mutliNumber < 2) {
          this.$Modal.warning({
            title: "信息不全",
            content: "<p>多选答案信息不完整，请至少添加两项答案！</p>"
          });
          setTimeout(() => {
            for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
              document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
            }
          }, 10);
          return false;
        }
        if (!canSave) return false
      }
      //题干
      let params = {
        bh: "",
        "rzcj": this.dataInfo.cj,
        "stlx": this.dataInfo.tx,
        "stnd": this.dataInfo.nd,
        "xttg": this.tg,
        kcmc: this.dataInfo.kcmc,
        "xtxq": {
          txTxt: this.txTxt,
          ndTxt: this.ndTxt,
          cjTxt: this.cjTxt,
          "stlx": txTxt,
          "rzcj": cjTxt,
          "zt": "待审核",
          "stnd": ndTxt,
          "zsd": this.zsd,
          "xttg": this.tg,
          tgTxt: this.tgTxt,
          "bq": this.bqItems,
          "xzxx": this.xxList,//单选或多选
          "stjx": this.jx,
          "stda": [`${String.fromCharCode(this.answer + 65)}`],
          tkdaList: this.tkdaList, //填空题 答案
          answerHtml: this.answerHtml,//解答题 html
          answerWords: this.answerWords,//解答题 纯文本
          pdda: this.pdda,//判断题 答案
          yyyddaList: this.yyyddaList,//英语阅读
          clozeList: this.clozeList,//完形填空
          answer: this.answer,//单选 答案
          answer1: this.answer1,//多选 答案
          zw: this.zw,//作文html
          zwTxt: this.zwTxt,//作文 纯文本
          zwNumber: this.zwNumber,//作文 字数
          lineNumber: this.lineNumber//主观题 行数
        },
        "zsd": this.zsd
      };
      if (!this.editTest) {
        //新增
        this.$emit("newChildTest", params);
      } else {
        //编辑
        this.$emit("saveEditTest", params);
        this.editTest = false;
      }
    },
    addEnglishItem () {
      //添加英语阅读 试题
      if (this.dataInfo.tx == "English_reading") {
        let addNew = JSON.parse(JSON.stringify(this.newEnglishReadingL));
        this.$set(addNew, "ueditorRefTg", common.uuid(10));
        this.$set(addNew, "ueditorIdTg", common.uuid(10));
        this.$set(addNew, "ueditorRefJx", common.uuid(10));
        this.$set(addNew, "ueditorIdJx", common.uuid(10));
        this.$set(addNew, "ueditorRefWd", common.uuid(10));
        this.$set(addNew, "ueditorIdWd", common.uuid(10));
        this.yyyddaList.push(addNew);
      } else {
        let addNew = JSON.parse(JSON.stringify(this.newCloze));
        this.clozeList.push(addNew);
      }
    },
    perview () {
      this.showPreview = !this.showPreview;
    },
    clearAll () {
      bus.$emit("cleanAll", true);
      this.$set(this.dataInfo, "tx", "");
      this.$set(this.dataInfo, "nd", "");
      this.$set(this.dataInfo, "cj", "");
      this.$set(this.dataInfo, "kcmc", "");
      this.zsd = "";
      this.bqItems = [];
      this.bq = [];
      this.tgTxt = "";
      this.tkdaList = ["", "", "", ""]; //填空题 答案
      this.answerHtml = "";//解答题 html
      this.answerWords = "";//解答题 纯文本
      this.pdda = "";//判断题 答案
      this.yyyddaList = [];//英语阅读
      this.clozeList = [];//完形填空
      this.answer = "";//单选 答案
      this.answer1 = [];//多选 答案
      this.zw = "";//作文html
      this.zwTxt = "";//作文 纯文本
      this.zwNumber = 1;//作文 字数
      this.showPreview = false;
    },
    changeTx () {
      for (let i = 0; i < this.txList.length; i++) {
        if (this.txList[i].zdz == this.dataInfo.tx) {
          this.txTxt = this.txList[i].zdmc;
        }
      }
    },
    changeNd () {
      for (let j = 0; j < this.ndList.length; j++) {
        if (this.ndList[j].zdz == this.dataInfo.nd) {
          this.ndTxt = this.ndList[j].zdmc;
        }
      }
    },
    changeCj () {
      for (let k = 0; k < this.cjList.length; k++) {
        if (this.cjList[k].zdz == this.dataInfo.cj) {
          this.cjTxt = this.cjList[k].zdmc;
        }
      }
    },
    deleteYyyd (index) {
      //删除 英语阅读 子项
      this.$Modal.confirm({
        title: "删除",
        content: "<p>是否删除该问题？</p>",
        onOk: () => {
          this.yyyddaList.splice(index, 1);
          this.$Message.success("删除成功！");
        },
        onCancel: () => {
        }
      });
      setTimeout(() => {
        for (let index = 0; index < document.getElementsByClassName('ivu-modal-wrap').length; index++) {
          document.getElementsByClassName('ivu-modal-wrap')[index].className += ' vertical-center-modal'
        }
      }, 10);
    },
    getCourseName () {
      //获取课程名称
      this.courseList.forEach(item => {
        if (item.kch === this.dataInfo.kch) this.dataInfo.kcmc = item.kcmc;
      });
    }
  }
};
</script>
<style>
.ivu-select-not-found li {
  list-style: none;
}
</style>
<style scoped>
.head >>> .ivu-select-dropdown {
  z-index: 99999;
}

.bq >>> .ivu-select-dropdown {
  z-index: 99999;
}

#addNew .head {
  width: 100%;
  /* height: 153px; */
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  position: relative;
  padding: 30px 0;
}

.tx {
  position: absolute;
  top: 29px;
  left: 34px;
}

.label {
  font-size: 14px;
  font-family: HiraginoSansGB;
  font-weight: normal;
  color: rgba(130, 141, 177, 1);
  margin-right: 43px;
}

.nd {
  position: absolute;
  top: 29px;
  left: 387px;
}

.cj {
  position: absolute;
  top: 29px;
  left: 740px;
}

.bq {
  position: absolute;
  left: 34px;
  top: 84px;
  height: 32px;
  line-height: 32px;
}

.dropDown {
  width: 650px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 14px 0px rgba(223, 223, 223, 0.36);
  padding: 23px 0 23px 25px;
}

.checkItem {
  width: 30%;
  font-size: 14px;
  font-family: HiraginoSansGB;
  font-weight: normal;
  color: rgba(130, 141, 177, 1);
}

.dropDownBottom {
  width: 100%;
  height: 49px;
  border-top: 1px solid rgba(216, 216, 216, 1);
}

.dropDownBottom div {
  float: right;
  width: 58px;
  height: 26px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  text-align: center;
  line-height: 26px;
  font-size: 14px;
  font-family: HiraginoSansGB;
  font-weight: normal;
  cursor: pointer;
  margin-top: 9px;
}

.dropDownBottom .btn1 {
  color: rgba(77, 121, 246, 1);
  border: 1px solid rgba(77, 121, 246, 1);
  margin-right: 9px;
}

.dropDownBottom .btn2 {
  color: rgba(155, 167, 202, 1);
  border: 1px solid rgba(155, 167, 202, 1);
  margin-right: 32px;
}

.zsd {
  position: absolute;
  top: 84px;
  left: 413px;
}

.bqList {
  padding-top: 50px;
  padding-left: 110px;
  padding-bottom: 20px;
  width: 960px;
}

.bqListItem {
  font-size: 14px;
  height: 14px;
  font-family: HiraginoSansGB;
  font-weight: normal;
  color: rgba(74, 199, 236, 1);
  margin-right: 24px;
  margin-bottom: 20px;
  display: inline-block;
}

.main {
  margin-top: 13px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding: 6px 37px 75px 35px;
}

.mainTitle {
  font-size: 16px;
  font-family: FZLTZHK--GBK1;
  color: rgba(57, 61, 73, 1);
  margin-top: 22px;
  margin-bottom: 16px;
  font-weight: bolder;
}

.editorTG >>> .editorMain {
  width: 530px;
  height: 125px;
  background: rgba(255, 255, 255, 1);
}

.editorTG >>> .w-e-text-container {
  height: 95px !important;
  border-radius: 0 0 4px 4px;
}

.editorTG >>> .w-e-toolbar {
  border-radius: 4px 4px 0 0;
}

.editorJX >>> .editorMain {
  width: 530px;
  height: 131px;
  background: rgba(255, 255, 255, 1);
}

.editorJX >>> .w-e-text-container {
  height: 111px !important;
  border-radius: 0 0 4px 4px;
}

.editorJX >>> .w-e-toolbar {
  border-radius: 4px 4px 0 0;
}

.xxInput {
  width: 530px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}

.xxRadio {
  margin-bottom: 20px;
}

.xxRadio:first-of-type {
}

.rightRadio {
}

.delItem {
  margin-left: 10px;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.addxx {
  width: 110px;
  height: 36px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(74, 199, 236, 1);
  font-size: 14px;
  font-family: HiraginoSansGB;
  font-weight: normal;
  color: rgba(74, 199, 236, 1);
  line-height: 36px;
  text-align: center;
  margin-top: 14px;
  cursor: pointer;
}

.addxx:hover {
  color: white;
  border: 1px solid white;
  background: rgba(74, 199, 236, 1);
}

.btnsDiv {
  width: 1180px;
  height: 76px;
  background: rgba(255, 255, 255, 1);
  margin: 0 auto;
  margin-top: 19px;
  margin-bottom: 20px;
  padding-right: 37px;
}

.bottonBtn {
  width: 120px;
  height: 42px;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC;
  font-weight: 400;
  line-height: 42px;
  text-align: center;
  float: right;
  margin-top: 17px;
  margin-left: 18px;
  cursor: pointer;
}

.bottonBtn5 {
  margin: 20px 0 20px 35px;
  width: 110px;
  height: 36px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(77, 121, 246, 1);
  font-size: 14px;
  font-family: HiraginoSansGB;
  font-weight: normal;
  color: rgba(77, 121, 246, 1);
  line-height: 36px;
  text-align: center;
}

.bottonBtn5:hover {
  cursor: pointer;
}

.bottonBtn4 {
  background: rgba(77, 121, 246, 1);
  color: white;
  opacity: 0.9;
  border: 1px solid white;
}

.bottonBtn3 {
  background: white;
  color: rgba(130, 141, 177, 1);
  border: 1px solid rgba(130, 141, 177, 1);
}

.bottonBtn2 {
  background: white;
  color: rgba(74, 199, 236, 1);
  border: 1px solid rgba(74, 199, 236, 1);
}

.bottonBtn1 {
  background: white;
  color: rgba(254, 209, 98, 1);
  border: 1px solid rgba(254, 209, 98, 1);
}

.tkda span {
  font-size: 16px;
  font-family: FZLTZHK--GBK1;
  font-weight: normal;
  color: rgba(57, 61, 73, 1);
  margin-right: 9px;
}

.tkdaItem {
  margin-bottom: 13px;
}

.yyydItem {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding: 40px 40px 35px 35px;
}

.yyydtg p {
  font-size: 16px;
  font-family: FZLTZHK--GBK1;
  font-weight: normal;
  color: rgba(57, 61, 73, 1);
  display: inline-block;
  margin-right: 5px;
}

.wxtkTitle {
  width: 100%;
  font-size: 16px;
  font-family: FZLTZHK--GBK1;
  font-weight: normal;
  color: rgba(57, 61, 73, 1);
  line-height: 22px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
}

img:hover {
  cursor: pointer;
}

.ivu-radio-wrapper {
  font-size: 14px;
}

.ivu-checkbox-wrapper {
  font-size: 14px;
}
</style>
<style>
.ivu-form .ivu-form-item-label {
  text-align: center;
  font-size: 14px;
  font-family: HiraginoSansGB;
  font-weight: normal;
  color: rgba(130, 141, 177, 1);
}
</style>
