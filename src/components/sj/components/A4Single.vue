<template>
  <div>
    <div v-for="(item,index) in pageList"
         :key="index"
         class="pages">
      <!--空白头-->
      <div style="height: 80px"></div>
      <!--装订线-->
      <div class="dashedLine">
        <div style="line-height: 32px; margin-bottom: 10px;border: 1px solid #000">
          <span style="width: 150px;display: inline-block;margin-left:230px">学号：</span>
          <span style="width: 150px;display: inline-block">姓名：</span>
          <span style="width: 150px;display: inline-block">学院：</span>
          <span style="width: 150px;display: inline-block">班级：</span>
        </div>
        <div style="border-bottom: 1px dotted #000000;padding-bottom: 20px">
          <div style="position:absolute;left: 25%;top: 56px;">线</div>
          <div style="position:absolute;left: 50%;top: 56px;">订</div>
          <div style="position:absolute;left: 75%;top: 56px;">装</div>
        </div>
      </div>
      <!--卷头-->
      <div id="new-upload-header"
           ref="pageHead"
           style="margin-left: 125px"
           v-if="index==0">
        <div id="header-title"
             style="margin-left: -22px;">南宁学院{{titleInfo.xymc}}考试(查)试卷</div>
        <div style="height: 32px"></div>
        <div class="header-content1"
             style="margin:0 auto">
          <div class="header-content-item">
            <div class="header-content-item-right">《<span style="min-width:510px;text-align:center;display:inline-block">{{titleInfo.kcmc}}</span>》课程 </div>
          </div>
          <div class="noWidth">
            <div style="margin-right: 5px;float: left;line-height: 35px"
                 v-for="(itemA,indexA) in titleInfo.sjTypeList"
                 :key="indexA">
              <div v-if="titleInfo.sjxx==itemA.value">
                <span style="font-size:16px">{{itemA.mc}}</span>
              </div>
            </div>
            <div style="clear:both"></div>
          </div>
          <div style="clear:both"></div>
        </div>
        <div style="clear: both"></div>
        <div class="headTable">
          <div class="headTableRow">
            <div class="headTableCol1"
                 ref="njzy"
                 style="width:80px">年级专业</div>
            <div class="headTableCol1"
                 ref="njzyRes"
                 style="width:300px">{{titleInfo.grade}}</div>
            <div class="headTableCol1"
                 ref="mtjs"
                 style="width:80px">命题教师</div>
            <div class="headTableCol1"
                 ref="mtjsRes"
                 style="border-right:none;width:164px">{{titleInfo.mtjs}}</div>
            <div style="clear:both"></div>
          </div>
          <div class="headTableRow"
               style="border-bottom:none">
            <div class="headTableCol1"
                 style="width:80px">考试形式</div>
            <div class="headTableCol1"
                 style="width:300px">
              <span v-if="titleInfo.ksfs==='2'">闭卷</span>
              <span v-if="titleInfo.ksfs==='1'">开卷</span>
            </div>
            <div class="headTableCol1"
                 style="width:80px">考核时长</div>
            <div class="headTableCol1"
                 style="border-right:none;width:164px"><span style="text-decoration: underline">&nbsp;&nbsp;{{titleInfo.kssc}}&nbsp;&nbsp;</span>分钟</div>
            <div style="clear:both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="header-table">
          <div class="header-table-col"
               style="width: 83px;border-left: 2px solid #000000">
            <div class="header-table-th">
              题号
            </div>
            <div class="header-table-tb">
              得分
            </div>
          </div>
          <div v-if="treeData.length">
            <div class="header-table-col"
                 :style="{width:(465/(treeData.length))+'px',}"
                 v-for="(itemB,indexB) in treeData"
                 :key="indexB">
              <div class="header-table-th"
                   :style="{fontSize:itemB.th.length>1?'12px':''}">
                {{itemB.th}}
              </div>
              <div class="header-table-tb"></div>
            </div>
          </div>
          <div v-else>
            <div class="header-table-col"
                 style="width:465px">
              <div class="header-table-th"> </div>
              <div class="header-table-tb"> </div>
            </div>
          </div>
          <div class="header-table-col"
               style="width: 82px">
            <div class="header-table-th">
              总分
            </div>
            <div class="header-table-tb">
            </div>
          </div>
        </div>
        <div class="header-table"
             style="margin-top:0;border-top:none">
          <div class="header-table-col"
               style="width: 83px;border-left: 2px solid #000000">
            <div class="header-table-tb">
              阅卷人
            </div>
          </div>
          <div class="header-table-col"
               style="width: 282px;">
            <div class="header-table-tb"> </div>
          </div>
          <div class="header-table-col"
               style="width: 83px;">
            <div class="header-table-tb">
              统分人
            </div>
          </div>
          <div class="header-table-col"
               style="width: 182px">
            <div class="header-table-tb"> </div>
          </div>
        </div>
      </div>
      <!-- 试题 -->
      <div style="width:630px;margin-left:125px;margin-top:5px;"
           :style="{height:index==0?'617px':'958px'}"
           ref="page"
           class="STArea"></div>
      <!-- 卷尾 -->
      <div style="font-size:16px">
        <div class="signArea"
             style="width:630px;margin-left: 125px;display:flex;justify-content:space-around"
             v-if="QZRData.length>0">
          <span v-for="(item,index) in QZRData"
                :key="index">{{item.value}}(签字):</span>
        </div>
        <div style="text-align:center"
             v-if="showPageInfo">
          第 {{ index+1 }} 页 共 {{ pageList.length }} 页
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "A4Single",
  data () {
    return {
      pageList: [
        {
          width: 630,
          height: 617,
          showDashedLine: true,
        }
      ],//试卷list
      domList: [],//domList,
      QTBackup: {},
      pageNo: 0
    }
  },
  props: {
    titleInfo: Object,//试卷头信息
    treeData: Array,//题目信息
    QZRData: Array,//签字人信息
    showPageInfo: Boolean,//是否显示分页
    showTH: Boolean,//是否显示题号
  },
  mounted () {
    this.setCSS()
  },
  methods: {
    setCSS () {
      // 年级专业显示超出一行时重新设置改行css
      this.$refs.njzy[0].style.height = this.$refs.njzyRes[0].clientHeight + 'px'
      this.$refs.njzy[0].style.lineHeight = this.$refs.njzyRes[0].clientHeight + 'px'
      this.$refs.mtjs[0].style.height = this.$refs.njzyRes[0].clientHeight + 'px'
      this.$refs.mtjs[0].style.lineHeight = this.$refs.njzyRes[0].clientHeight + 'px'
      this.$refs.mtjsRes[0].style.height = this.$refs.njzyRes[0].clientHeight + 'px'
      this.$refs.mtjsRes[0].style.lineHeight = this.$refs.njzyRes[0].clientHeight + 'px'
    },
    putDTSM (val, count, nextTxt) {
      // 切分放置大题说明
      let pureTxt = val
      let txt = `<p style="width:630px;margin-top: 6px;font-weight: 700;text-indent: 110px;font-size:18px">${val}</p>`
      let txt2 = `<p style="width:630px;margin-top: 6px;font-weight: 700;text-indent:30px;font-size:18px">${val}</p>`
      let num = count
      let creatDiv = document.createElement("div");
      creatDiv.innerHTML = txt;
      this.$el.append(creatDiv);
      let domHeight1 = creatDiv.clientHeight;//DOM的高度
      creatDiv.style.display = "none";
      this.$el.removeChild(creatDiv)
      if (this.pageList[this.pageNo].height >= domHeight1 - 27) {
        if (this.$refs.page[this.pageNo]) {
          this.$refs.page[this.pageNo].innerHTML += txt2;
          this.pageList[this.pageNo].height -= domHeight1 - 27
        } else {
          this.$nextTick(() => {
            this.$refs.page[this.pageNo].innerHTML += txt2;
            this.pageList[this.pageNo].height -= domHeight1 - 27
          })
        }
        if (nextTxt) {
          this.pageList.push({
            width: 630,
            height: 958,
            showDashedLine: true,
          })
          this.pageNo++
          let newPage = this.cutOutWidthBq(this.QTBackup.pureTxt, this.QTBackup.txt, num + 1)[1]
          let domTxt1 = "<div style='width:630px;margin:0 auto'>" + newPage + '</div>'
          let creatDiv1 = document.createElement("div");
          creatDiv1.style.width = "630px";
          creatDiv1.style.margin = "0 auto";
          creatDiv1.innerHTML = newPage;
          this.$el.append(creatDiv1);
          let domHeight2 = creatDiv1.clientHeight;//DOM的高度
          creatDiv1.style.display = "none";
          this.$el.removeChild(creatDiv1)
          this.$nextTick(() => {
            this.$refs.page[this.pageNo].innerHTML += newPage;
            this.pageList[this.pageNo].height -= domHeight2
          })
        }
      } else {
        let arr = this.cutOutWidthBq(pureTxt, txt2, num)
        num--
        let creatDiv2 = document.createElement("div");
        creatDiv2.innerHTML = arr[0];
        let creatDiv2Txt = creatDiv2.innerText
        this.putDTSM(creatDiv2Txt, num, true)
      }
    },
    inputFn (htmlTxt, pureTxt) {
      // htmlTxt 富文本
      //  pureTxt 纯文本 

      //生成虚拟dom,获取富文本高度
      let creatDiv = document.createElement("div");
      creatDiv.style.width = "630px";
      creatDiv.style.margin = "0 auto";
      creatDiv.style.fontSize = "18px";
      creatDiv.innerHTML = htmlTxt;
      this.$el.append(creatDiv);
      let domHeight = creatDiv.clientHeight;//DOM的高度
      creatDiv.style.display = "none";
      this.$el.removeChild(creatDiv)
      // 比较高度和剩余高度
      if (domHeight < this.pageList[this.pageNo].height) {
        // 放得开
        let domTxt = "<div style='width:630px;margin:0 auto;font-size:18px'>" + htmlTxt + '</div>'
        if (this.$refs.page[this.pageNo]) {
          this.$refs.page[this.pageNo].innerHTML += domTxt
          this.pageList[this.pageNo].height -= domHeight
        } else {
          this.$nextTick(() => {
            this.$refs.page[this.pageNo].innerHTML += domTxt
            this.pageList[this.pageNo].height -= domHeight
          })
        }
      } else {
        // 放不开
        // 拆分虚拟dom
        let domArr = creatDiv.children//虚拟dom所有子元素
        // 循环放所有子元素
        for (let index = 0; index < domArr.length; index++) {
          // 获取每个子元素的高
          let creatDiv1 = document.createElement("div");
          creatDiv1.style.width = "630px";
          creatDiv1.style.margin = "0 auto";
          creatDiv1.style.fontSize = "18px";
          creatDiv1.innerHTML = domArr[index].outerHTML;
          this.$el.append(creatDiv1);
          let listItemHeight = creatDiv1.clientHeight //子元素的dom高
          creatDiv1.style.display = "none";
          this.$el.removeChild(creatDiv1);
          // 比较每个子元素和剩余高度
          if (listItemHeight < this.pageList[this.pageNo].height) {
            // 放得开
            let domTxt1 = "<div style='width:630px;margin:0 auto;font-size:18px'>" + domArr[index].outerHTML + '</div>'
            if (this.$refs.page[this.pageNo]) {
              this.$refs.page[this.pageNo].innerHTML += domTxt1
              this.pageList[this.pageNo].height -= listItemHeight
            } else {
              this.$nextTick(() => {
                this.$refs.page[this.pageNo].innerHTML += domTxt1
                this.pageList[this.pageNo].height -= listItemHeight
              })
            }
          } else {
            // 放不开
            // 判断是否为表格或图片
            let switcher = false
            if (domArr[index].children) {
              for (let ii = 0; ii < domArr[index].children.length; ii++) {
                if (domArr[index].children[ii].tagName == 'IMG') {
                  switcher = true
                }
              }
            }
            if (switcher || domArr[index].tagName == 'TABLE') {
              // 放入表格或图片       
              // 追加页面
              this.showPage = false
              this.pageList.push({
                width: 630,
                height: 958,
                showDashedLine: true,
              })
              this.pageNo++
              this.showPage = true
              this.$nextTick(() => {
                let domTxt1 = "<div style='width:630px;margin:0 auto;font-size:18px'>" + domArr[index].outerHTML + '</div>'
                this.$refs.page[this.pageNo].innerHTML += domTxt1
                this.pageList[this.pageNo].height -= listItemHeight
              })
            } else {
              // 切分dom
              let num = creatDiv1.innerText.length - 1
              this.QTBackup = {
                'pureTxt': creatDiv1.innerText,
                'txt': creatDiv1.innerHTML,
                'num': num
              }
              this.inputFn1(creatDiv1.innerHTML, creatDiv1.innerText, num)
            }
          }
        }
      }
    },
    inputFn1 (txt, pureTxt, count, nextTxt) {
      let num = count
      let creatDiv = document.createElement("div");
      creatDiv.style.width = "630px";
      creatDiv.style.margin = "0 auto";
      creatDiv.style.fontSize = "18px";
      creatDiv.innerHTML = txt;
      this.$el.append(creatDiv);
      let eachXtHeight = creatDiv.clientHeight;//DOM的高度
      creatDiv.style.display = "none";
      let domTxt = "<div style='width:630px;margin:0 auto;font-size:18px'>" + txt + '</div>'
      if (eachXtHeight < this.pageList[this.pageNo].height) {
        if (this.$refs.page[this.pageNo]) {
          this.$refs.page[this.pageNo].innerHTML += domTxt
          this.pageList[this.pageNo].height -= eachXtHeight
        } else {
          this.$nextTick(() => {
            this.$refs.page[this.pageNo].innerHTML += domTxt
            this.pageList[this.pageNo].height -= eachXtHeight
          })
        }
        if (nextTxt) {
          this.showPage = false
          this.pageList.push({
            width: 630,
            height: 958,
            showDashedLine: true,
          })
          this.pageNo++
          this.showPage = true
          let newPage = this.cutOutWidthBq(this.QTBackup.pureTxt, this.QTBackup.txt, num + 1)[1]
          let domTxt1 = "<div style='width:630px;margin:0 auto;font-size:18px'>" + newPage + '</div>'
          let creatDiv1 = document.createElement("div");
          creatDiv1.style.width = "630px";
          creatDiv1.style.margin = "0 auto";
          creatDiv1.style.fontSize = "18px";
          creatDiv1.innerHTML = newPage;
          this.$el.append(creatDiv1);
          let count1 = creatDiv1.innerText.length
          let newTXT = creatDiv1.innerText
          creatDiv1.style.display = "none";
          this.QTBackup = {
            'pureTxt': newPage,
            'txt': newTXT,
            'num': count1
          }
          this.inputFn1(newPage, newTXT, count1)
        }
      } else {
        let arr = this.cutOutWidthBq(pureTxt, txt, num)
        num--
        let creatDiv2 = document.createElement("div");
        creatDiv2.innerHTML = arr[0];
        let creatDiv2Txt = creatDiv2.innerText
        this.inputFn1(arr[0], creatDiv2Txt, num, true)
      }
    },
    async inputDT (count, max, obj) {
      let index = count
      // 先处理大题
      // 剩余高度小于大题前的得分框添加新页面
      if (this.pageList[this.pageNo].height < 56) {
        this.pageList.push({
          width: 630,
          height: 958,
          showDashedLine: true,
        })
        this.pageNo++
      }
      // 向页面添加大题和得分框
      let DThtml = `<div style="border: 1px solid rgb(0, 0, 0); margin-right: 10px; width: 70px; float: left;">
        <div style="text-align: center; border-bottom: 1px solid rgb(0, 0, 0); height: 24px;font-size:18px">
            得分
        </div>
        <div style="height: 30px; margin-right: 10px;"></div>
        </div>
        <div class="content-exam-title-text">
        <div style='font-weight: 700;font-size:18px'>
            ${obj[index].th}、${obj[index].title}（本大题共 ${obj[index].children.length} 小题，每小题 ${obj[index].fz} 分，共 ${obj[index].children.length * obj[index].fz} 分)
        </div>
        </div>`
      if (!obj[index].sm) {
        DThtml += `<div style='clear:both'></div>`
      }
      if (this.$refs.page[this.pageNo]) {
        this.$refs.page[this.pageNo].innerHTML += DThtml
      } else {
        this.$nextTick(() => {
          this.$refs.page[this.pageNo].innerHTML += DThtml
        })
      }
      // 更新剩余高度
      let creatDiv = document.createElement("div");
      creatDiv.innerHTML = DThtml;
      this.$el.append(creatDiv);
      let domHeight = 56;//DOM的高度
      creatDiv.style.display = "none";
      this.$el.removeChild(creatDiv)
      this.pageList[this.pageNo].height -= domHeight
      if (obj[index].sm) {
        // 切分放置大题说明
        this.QTBackup = {
          pureTxt: obj[index].sm,
          txt: `<p style="width:630px;font-weight: 300;font-size:18px;font-weight:700">${obj[index].sm}</p>`
        }
        this.putDTSM(obj[index].sm, obj[index].sm.length - 1)
      }

      // 处理小题
      let counts = 0
      if (obj[index].children.length) {
        await this.inputXT(counts, obj[index].children.length, obj[index])
      }
      index++
      if (index < max) {
        this.inputDT(index, max, obj)
      }
    },
    async inputXT (count, max, obj) {
      let i = count
      let tgHtml = ''
      let tgTXt = ''
      if (this.showTH) {
        let arr = obj.children[i].xttg.split('>')
        arr.splice(1, 0, `<span>${obj.children[i].th}.</span`)
        tgHtml = arr.join('>')
      } else {
        tgHtml = obj.children[i].xttg
      }
      if (obj.children[i].stlx == "composition") {
        let arr1 = tgHtml.split('<')
        arr1.splice(arr1.length - 1, 0, `span style='font-size:16px'>(${obj.children[i].xtxq.zwNumber}字)<span>`)
        tgHtml = arr1.join('<')
      }
      tgTXt = obj.children[i].th + '.' + obj.children[i].xtxq.tgTxt
      this.inputFn(tgHtml, tgTXt)
      if (obj.children[i].stlx == "composition" || obj.children[i].stlx == "answer" || obj.children[i].stlx == "shortAnswer" || obj.children[i].stlx == "discussion") {
        this.inputLine(0, obj.children[i].xtxq.lineNumber)
      }
      if (obj.children[i].stlx == "judge") {
        let domArr = ["<span style='font-size:18px;margin:0 40px;display:inline-block'>A、正确</span><span style='font-size:18px;margin:0 40px;display:inline-block'>B、错误</span>"]
        await this.inputXX(0, domArr.length, domArr)
      }
      if (obj.children[i].stlx == "single_select" || obj.children[i].stlx == "multi_select") {
        let XxArr = []
        for (let ii = 0; ii < obj.children[i].xtxq.xzxx.length; ii++) {
          let creatDiv = document.createElement('span')
          creatDiv.style.fontSize = '18px'
          creatDiv.style.margin = '0 40px'
          creatDiv.innerHTML = String.fromCharCode(ii + 65) + '、' + obj.children[i].xtxq.xzxx[ii]
          this.$el.append(creatDiv);
          let domWidth = creatDiv.offsetWidth + 80;//DOM的宽度
          creatDiv.style.display = "none";
          this.$el.removeChild(creatDiv)
          XxArr.push(domWidth)
        }
        let switcher2 = false
        let switcher1 = XxArr.some((item) => {
          return item >= 630 / 4
        })
        if (switcher1) {
          switcher2 = XxArr.some((item) => {
            return item >= 630 / 2
          })
        }
        let domArr = []
        let xxDom = ''
        if (!switcher1) {
          //一行四个
          for (let iii = 0; iii < obj.children[i].xtxq.xzxx.length; iii++) {
            xxDom += "<span style='font-size:18px;margin:0 40px;display:inline-block'>" + String.fromCharCode(iii + 65) + "、" + obj.children[i].xtxq.xzxx[iii] + "</span>"
            if ((iii + 1) % 4 == 0) {
              domArr.push(xxDom)
              xxDom = ''
            }
          }
        } else if (switcher1 && !switcher2) {
          //一行两个
          for (let iii = 0; iii < obj.children[i].xtxq.xzxx.length; iii++) {
            xxDom += "<span style='font-size:18px;margin:0 40px;display:inline-block'>" + String.fromCharCode(iii + 65) + "、" + obj.children[i].xtxq.xzxx[iii] + "</span>"
            if ((iii + 1) % 2 == 0) {
              domArr.push(xxDom)
              xxDom = ''
            }
          }
        } else {
          //一行一个
          for (let iii = 0; iii < obj.children[i].xtxq.xzxx.length; iii++) {
            xxDom += "<span style='font-size:18px;margin:0 40px;display:inline-block'>" + String.fromCharCode(iii + 65) + "、" + obj.children[i].xtxq.xzxx[iii] + "</span>"
            domArr.push(xxDom)
            xxDom = ''
          }
        }
        await this.inputXX(0, domArr.length, domArr)
      }
      if (obj.children[i].stlx == "cloze_test") {
        await this.inputWX(0, obj.children[i].xtxq.clozeList.length, obj.children[i].xtxq.clozeList)
      }
      if (obj.children[i].stlx == "English_reading") {
        // console.log(obj.children[i])
        await this.inputYYYD(0, obj.children[i].xtxq.yyyddaList.length, obj.children[i].xtxq.yyyddaList)
      }
      if (this.pageList[this.pageNo].height > 10) {
        this.$refs.page[this.pageNo].innerHTML += `<div style='width:630px;margin:0 auto;font-size:18px;height:10px'></div>`
        this.pageList[this.pageNo].height -= 10
      }
      i++
      if (i < max) {
        this.inputXT(i, max, obj)
      }
    },
    async inputLine (count, max) {
      if (this.pageList[this.pageNo].height < 27) {
        this.pageList.push({
          width: 630,
          height: 958,
          showDashedLine: true,
        })
        this.pageNo++
      }
      if (this.$refs.page[this.pageNo]) {
        this.$refs.page[this.pageNo].innerHTML += `<div style='width:630px;margin:0 auto;font-size:18px;height:27px'></div>`
        this.pageList[this.pageNo].height -= 27
        count++
        if (count < max) {
          this.inputLine(count, max)
        }
      } else {
        this.$nextTick(() => {
          this.$refs.page[this.pageNo].innerHTML += `<div style='width:630px;margin:0 auto;font-size:18px;height:27px'></div>`
          this.pageList[this.pageNo].height -= 27
          count++
          if (count < max) {
            this.inputLine(count, max)
          }
        })
      }
    },
    async inputXX (count, max, obj) {
      let i = count

      if (this.pageList[this.pageNo].height < 27) {
        this.pageList.push({
          width: 630,
          height: 958,
          showDashedLine: true,
        })
        this.pageNo++
      }
      if (this.$refs.page[this.pageNo]) {
        this.$refs.page[this.pageNo].innerHTML += "<div style='width:630px;margin:0 auto;font-size:18px'>" + obj[count] + '</div>'
        this.pageList[this.pageNo].height -= 27
      } else {
        this.$nextTick(() => {
          this.$refs.page[this.pageNo].innerHTML += "<div style='width:630px;margin:0 auto;font-size:18px'>" + obj[count] + '</div>'
          this.pageList[this.pageNo].height -= 27
        })
      }
      i++
      if (i < max) {
        this.inputXX(i, max, obj)
      }
    },
    async inputWX (count, max, obj) {
      let i = count
      let XxArr = []
      for (let ii = 0; ii < obj[i].xxList.length; ii++) {
        let creatDiv = document.createElement('span')
        creatDiv.style.fontSize = '18px'
        creatDiv.style.margin = '0 30px'
        creatDiv.innerHTML = String.fromCharCode(ii + 65) + '、' + obj[i].xxList[ii]
        this.$el.append(creatDiv);
        let domWidth = creatDiv.offsetWidth + 80;//DOM的宽度
        creatDiv.style.display = "none";
        this.$el.removeChild(creatDiv)
        XxArr.push(domWidth)
      }
      let switcher2 = false
      let switcher1 = XxArr.some((item) => {
        return item >= 550 / 4
      })
      if (switcher1) {
        switcher2 = XxArr.some((item) => {
          return item >= 550 / 2
        })
      }
      let domArr = []
      let xxDom = ''
      if (!switcher1) {
        //一行四个
        for (let iii = 0; iii < obj[i].xxList.length; iii++) {
          if (iii == 0) {
            xxDom += "<span style='font-size:18px;margin-left:40px;display:inline-block;width:35px'>(" + (i + 1) + ")</span>"
          }
          if ((iii + 1) % 4 !== 0 && iii != 0) {
            xxDom += "<span style='font-size:18px;margin:0 30px 0 105px;display:inline-block'>" + String.fromCharCode(iii + 65) + "、" + obj[i].xxList[iii] + "</span>"
          } else {
            xxDom += "<span style='font-size:18px;margin:0 30px;display:inline-block'>" + String.fromCharCode(iii + 65) + "、" + obj[i].xxList[iii] + "</span>"
          }
          if ((iii + 1) % 4 == 0) {
            domArr.push(xxDom)
            xxDom = ''
          }
        }
      } else if (switcher1 && !switcher2) {
        //一行两个
        for (let iii = 0; iii < obj[i].xxList.length; iii++) {
          if (iii == 0) {
            xxDom += "<span style='font-size:18px;margin-left:40px;display:inline-block;width:35px'>(" + (i + 1) + ")</span>"
          }
          if ((iii + 1) % 2 !== 0 && iii != 0) {
            xxDom += "<span style='font-size:18px;margin:0 30px 0 105px;display:inline-block'>" + String.fromCharCode(iii + 65) + "、" + obj[i].xxList[iii] + "</span>"
          } else {
            xxDom += "<span style='font-size:18px;margin:0 30px;display:inline-block'>" + String.fromCharCode(iii + 65) + "、" + obj[i].xxList[iii] + "</span>"
          }
          if ((iii + 1) % 2 == 0) {
            domArr.push(xxDom)
            xxDom = ''
          }
        }
      } else {
        //一行一个
        for (let iii = 0; iii < obj[i].xxList.length; iii++) {
          if (iii == 0) {
            xxDom += "<span style='font-size:18px;margin-left:40px;display:inline-block;width:35px'>(" + (i + 1) + ")</span>"
          }
          if (iii != 0) {
            xxDom += "<span style='font-size:18px;margin:0 30px 0 105px;display:inline-block'>" + String.fromCharCode(iii + 65) + "、" + obj[i].xxList[iii] + "</span>"
          } else {
            xxDom += "<span style='font-size:18px;margin:0 30px;display:inline-block'>" + String.fromCharCode(iii + 65) + "、" + obj[i].xxList[iii] + "</span>"
          }
          domArr.push(xxDom)
          xxDom = ''
        }
      }
      await this.inputXX(0, domArr.length, domArr)
      i++
      if (i < max) {
        this.inputWX(i, max, obj)
      }
    },
    async inputYYYD (count, max, obj) {
      let i = count
      let arr = obj[i].tg.split('>')
      arr.splice(1, 0, `<span>(${count + 1})(${obj[i].tx})</span`)
      let htmlTxt = arr.join('>')
      let pureTxt = "(" + (count + 1) + ")(" + obj[i].tx + ")" + obj[i].tgTxt
      await this.inputFn(htmlTxt, pureTxt)
      if (obj[i].tx == "单选" || obj[i].tx == "多选") {
        let XxArr = []
        for (let ii = 0; ii < obj[i].xxList.length; ii++) {
          let creatDiv = document.createElement('span')
          creatDiv.style.fontSize = '18px'
          creatDiv.style.margin = '0 40px'
          creatDiv.innerHTML = String.fromCharCode(ii + 65) + '、' + obj[i].xxList[ii]
          this.$el.append(creatDiv);
          let domWidth = creatDiv.offsetWidth + 80;//DOM的宽度
          creatDiv.style.display = "none";
          this.$el.removeChild(creatDiv)
          XxArr.push(domWidth)
        }
        let switcher2 = false
        let switcher1 = XxArr.some((item) => {
          return item >= 630 / 4
        })
        if (switcher1) {
          switcher2 = XxArr.some((item) => {
            return item >= 630 / 2
          })
        }
        let domArr = []
        let xxDom = ''
        if (!switcher1) {
          //一行四个
          for (let iii = 0; iii < obj[i].xxList.length; iii++) {
            xxDom += "<span style='font-size:18px;margin:0 40px;display:inline-block'>" + String.fromCharCode(iii + 65) + "、" + obj[i].xxList[iii] + "</span>"
            if ((iii + 1) % 4 == 0) {
              domArr.push(xxDom)
              xxDom = ''
            }
          }
        } else if (switcher1 && !switcher2) {
          //一行两个
          for (let iii = 0; iii < obj[i].xxList.length; iii++) {
            xxDom += "<span style='font-size:18px;margin:0 40px;display:inline-block'>" + String.fromCharCode(iii + 65) + "、" + obj[i].xxList[iii] + "</span>"
            if ((iii + 1) % 2 == 0) {
              domArr.push(xxDom)
              xxDom = ''
            }
          }
        } else {
          //一行一个
          for (let iii = 0; iii < obj[i].xxList.length; iii++) {
            xxDom += "<span style='font-size:18px;margin:0 40px;display:inline-block'>" + String.fromCharCode(iii + 65) + "、" + obj[i].xxList[iii] + "</span>"
            domArr.push(xxDom)
            xxDom = ''
          }
        }
        await this.inputXX(0, domArr.length, domArr)
      }
      if (obj[i].tx == "问答") {
        // console.log(2)
        await this.inputLine(0, 5)
      }
      i++
      if (i < max) {
        this.inputYYYD(i, max, obj)
      }
    },
    // -----------------------utils-------------------------------------
    cutOutWidthBq (txt, ttt, index) {
      //截取富文本txt纯文本、ttt富文本、index截取点
      ttt = this.replaceBq(ttt)
      let a = txt.substring(index) //后
      let b = txt.substring(0, index) //前
      let c = txt.substring(index, index + 1) //截点
      let i = b.split(c).length //第几个截
      let arr = ttt.split(c)

      let res1 = ''
      let res2 = ''
      for (let index = 0; index < arr.length; index++) {
        if (index < i) {
          res1 = res1 + arr[index] + c
        } else {
          res2 = res2 + c + arr[index]
        }
      }
      res1 = res1.substr(0, res1.length - 1);
      let bq = ''
      let switcher = false
      for (let index = 0; index < res1.length; index++) {
        if (res1[index] == '>') {
          bq += res1[index]
          switcher = false
        }
        if (switcher) {
          bq += res1[index]
        }
        if (res1[index] == '<') {
          switcher = true
          bq += res1[index]
        }
      }
      switcher = false
      bq = bq.replace(new RegExp('>', 'g'), '')
      bq = bq.split('<')
      // this.removeBq(bq)
      for (let i = 0; i < bq.length; i++) {
        if (!bq[i]) {
          bq.splice(i, 1)
        }
      }
      for (let index = bq.length - 1; index >= 0; index--) {
        res2 = `<${bq[index]}>` + res2
        res1 = res1 + `</${bq[index]}>`
      }
      res1 = this.resume(res1)
      res2 = this.resume(res2)
      return [res1, res2]
    },
    removeBq (params) {
      //移除标签
      let arr = params
      for (let index1 = 0; index1 < arr.length; index1++) {
        if (arr[index1].indexOf('style') > -1) {
          arr[index1] = arr[index1].replace(' ', '')
        }
      }
      let str = arr.join('')
      if (str.indexOf('/') > 0) {
        for (let index2 = arr.length - 1; index2 > 0; index2--) {
          let demo = [];
          let demo1 = []
          if (arr[index2]) {
            demo = arr[index2].split('style')
          }
          if (arr[index2 - 1]) {
            demo1 = arr[index2 - 1].split('style')
          }
          if (demo[0] == '/' + demo1[0]) {
            arr.splice(index2 - 1, 2)
          }
        }
        for (let index3 = 0; index3 < arr.length; index3++) {
          if (arr[index3].indexOf('style') > -1) {
            arr[index3] = arr[index3].replace(' ', '')
          }
        }
        this.removeBq(arr)
      } else {
        for (let index4 = 0; index4 < arr.length; index4++) {
          if (arr[index4].indexOf('style') > -1) {
            arr[index4] = arr[index4].replace(' ', '')
          }
        }
      }
    },
    replaceBq (val) {
      let ttt = val
      ttt = ttt.replace(new RegExp('<blockquote', 'g'), '<~@&');
      ttt = ttt.replace(new RegExp('</blockquote', 'g'), '</~@&');
      ttt = ttt.replace(new RegExp('<strong', 'g'), '<@#$');
      ttt = ttt.replace(new RegExp('</strong', 'g'), '</@#$');
      ttt = ttt.replace(new RegExp('<span', 'g'), '<~@$');
      ttt = ttt.replace(new RegExp('</span', 'g'), '</~@$');
      ttt = ttt.replace(new RegExp('<sup', 'g'), '<~@^');
      ttt = ttt.replace(new RegExp('</sup', 'g'), '</~@^');
      ttt = ttt.replace(new RegExp('<img', 'g'), '<~$^');
      ttt = ttt.replace(new RegExp('</img', 'g'), '</~$^');
      ttt = ttt.replace(new RegExp('<pre', 'g'), '<@^&');
      ttt = ttt.replace(new RegExp('</pre', 'g'), '</@^&');
      ttt = ttt.replace(new RegExp('<em', 'g'), '<#$^');
      ttt = ttt.replace(new RegExp('</em', 'g'), '</#$^');
      ttt = ttt.replace(new RegExp('<ol', 'g'), '<~#$');
      ttt = ttt.replace(new RegExp('</ol', 'g'), '</~#$');
      ttt = ttt.replace(new RegExp('<li', 'g'), '<~#^');
      ttt = ttt.replace(new RegExp('</li', 'g'), '</~#^');
      ttt = ttt.replace(new RegExp('<ul', 'g'), '<~#&');
      ttt = ttt.replace(new RegExp('</ul', 'g'), '</~#&');
      ttt = ttt.replace(new RegExp('<p', 'g'), '<~@#');
      ttt = ttt.replace(new RegExp('</p', 'g'), '</~@#');
      ttt = ttt.replace(new RegExp(`<br/`, 'g'), '@$^');
      return ttt
    },
    resume (newZ) {
      let ttt = newZ
      ttt = ttt.replace(new RegExp('<~@&', 'g'), '<blockquote');
      ttt = ttt.replace(new RegExp('</~@&', 'g'), '</blockquote');
      ttt = ttt.replace(new RegExp('<\\@\\#\\$', 'g'), '<strong');
      ttt = ttt.replace(new RegExp('</\\@\\#\\$', 'g'), '</strong');
      ttt = ttt.replace(new RegExp('<~@\\$', 'g'), '<span');
      ttt = ttt.replace(new RegExp('</~@\\$', 'g'), '</span');
      ttt = ttt.replace(new RegExp('<~@\\^', 'g'), '<sup');
      ttt = ttt.replace(new RegExp('</~@\\^', 'g'), '</sup');
      ttt = ttt.replace(new RegExp('<~\\$\\^', 'g'), '<img');
      ttt = ttt.replace(new RegExp('</~\\$\\^', 'g'), '</img');
      ttt = ttt.replace(new RegExp('<#\\$\\^', 'g'), '<em');
      ttt = ttt.replace(new RegExp('</#\\$\\^', 'g'), '</em');
      ttt = ttt.replace(new RegExp('<~#\\$', 'g'), '<ol');
      ttt = ttt.replace(new RegExp('</~#\\$', 'g'), '</ol');
      ttt = ttt.replace(new RegExp('<~#\\^', 'g'), '<li');
      ttt = ttt.replace(new RegExp('</~#\\^', 'g'), '</li');
      ttt = ttt.replace(new RegExp('<~#&', 'g'), '<ul');
      ttt = ttt.replace(new RegExp('</~#&', 'g'), '</ul');
      ttt = ttt.replace(new RegExp('<~@#', 'g'), '<p');
      ttt = ttt.replace(new RegExp('</~@#', 'g'), '</p');
      ttt = ttt.replace(new RegExp('@\\$\\^', 'g'), `<br/`);
      ttt = ttt.replace(new RegExp('<@\\^&', 'g'), `<pre`);
      ttt = ttt.replace(new RegExp('</@\\^&', 'g'), `</pre`);
      return ttt
    }
  },
  watch: {
    treeData: {
      //监听treeData传参 数据改变后重新渲染页面
      handler (newValue, oldValue) {
        setTimeout(() => {
          // console.log(this.$refs.pageHead[0].clientHeight)
          // 清空pageList
          this.pageList = [{
            width: 630,
            height: 958 - this.$refs.pageHead[0].clientHeight,
            showDashedLine: true,
          }]
          this.pageNo = 0
          this.$nextTick(() => {
            // 清空试题区域
            this.$refs.page[this.pageNo].innerHTML = ''
            // 循环treeData 渲染页面
            let counts = 0
            if (newValue.length) {
              this.inputDT(counts, newValue.length, newValue)
            }
          })
        }, 100);
      },
      deep: true,
      immediate: true
    },
    titleInfo: {
      handler (newValue, oldValue) {
        setTimeout(() => {
          this.setCSS()
        }, 100);
      },
      deep: true,
      immediate: true
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 试卷部分css */
.pages {
  width: 786px;
  height: 1122px;
  background: white;
  margin: 20px auto;
  position: relative;
}
.dashedLine {
  height: 70px;
  width: 957.66px;
  background-color: #ffffff;
  font-size: 16px;
  font-family: SimSun, '新罗马', 'Times New Roman', '宋体', SimSun-ExtB, NSimSun,
    serif, 'STSong';
  position: absolute;
  z-index: 2;
  -moz-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
  top: 530px;
  right: 240px;
}

.new-upload1 #new-upload-header {
  width: 630px;
  background: rgba(255, 255, 255, 1);
}

#new-upload-header #header-title {
  width: 100%;
  text-align: center;
  font-size: 26px;
  font-weight: 800;
  color: rgba(34, 34, 34, 1);
  line-height: 26px;
  overflow: hidden;
}

#new-upload-header .header-content1 {
  width: auto;
  margin-bottom: 15px;
}

#new-upload-header .header-content1 .header-content-item {
  float: left;
  margin-right: 20px;
  /* height: 35px; */
  line-height: 35px;
  font-size: 18px;
  color: rgba(33, 37, 41, 1);
  font-weight: 600;
}

#new-upload-header
  .header-content1
  .header-content-item
  .header-content-item-right {
  float: left;
}

#new-upload-header .header-table,
.content-xzt-datxl .header-table {
  margin-top: 20px;
  width: 630px;
  border-top: 2px solid #000000;
  font-size: 18px;
  font-weight: normal;
  color: rgba(34, 34, 34, 1);
  overflow: hidden;
}

#new-upload-header .header-table .no-data-col,
.content-xzt-datxl .no-data-col {
  float: left;
  width: 547px;
  height: 180px;
  text-align: center;
  line-height: 180px;
  border-right: 2px solid #000000;
  border-bottom: 2px solid #000000;
}

#new-upload-header .header-table .header-table-col,
.content-xzt-datxl .header-table-col {
  float: left;
}

#new-upload-header .header-table .header-table-th,
.content-xzt-datxl .header-table-th {
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding-left: 5px;
  border-right: 2px solid #000000;
  border-bottom: 2px solid #000000;
  font-weight: 600;
}

#new-upload-header .header-table .header-table-tb,
.content-xzt-datxl .header-table-tb {
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding-left: 5px;
  border-right: 2px solid #000000;
  border-bottom: 2px solid #000000;
  word-wrap: break-word;
  font-weight: 600;
}
.headTable {
  width: 630px;
  border: 2px solid #000000;
  margin-top: 20px;
}
.headTableRow {
  border-bottom: 2px solid #000000;
}
.headTableCol1 {
  min-height: 40px;
  border-right: 2px solid #000000;
  float: left;
  text-align: center;
  line-height: 40px;
  padding-left: 5px;
  font-weight: 600;
  font-size: 18px;
  position: relative;
}
</style>
