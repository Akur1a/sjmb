<template>
  <div class="box"
       style="text-align:center;">
    <div style="margin:20px auto;margin-top:20px;width:800px">
      <Ueditor ref="ueTG"
               id="ed1"
               height='95'
               :value='tg'
               @getEditorTxt="getTgTxt"
               @updateEditor='getTG'></Ueditor>
      <div style="margin:20px 0;">
        <Button @click="exportInnerHTML">export</Button>
        <Button @click="inputFn(value,pureTxt,pureTxt.length)">inputFn</Button>
      </div>
    </div>
    <div style="margin:0 auto;width:1480px">
      <div class="mainBox"
           ref="mainBox">
        <div v-if="showPage">

          <div class="pages"
               v-for="(item,index) in pageList"
               :key="index"
               ref="page"
               style="overflow:hidden">
            <div style="width:500px;height:200px;border:1px solid red;margin:20px auto;"
                 v-if="index==0"></div>
          </div>
        </div>
      </div>
      <div class="resBox"
           ref="resBox"
           v-html="htmlTxt">
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
import Ueditor from "../../components/ueditor";
export default {
  data () {
    return {
      showPage: true,
      value: '',
      htmlTxt: '',
      pageList: [460],
      pureTxt: '',
      tg: '',
    }
  },
  components: {
    Ueditor
  },
  methods: {
    getTgTxt (value) {
      console.log(value)
      this.pureTxt = value
    },
    getTG (editorValue) {
      console.log(editorValue)
      this.value = editorValue
    },
    exportInnerHTML () {
      this.htmlTxt = this.$refs.mainBox.innerHTML
    },
    inputFn (htmlTxt, pureTxt) {
      // htmlTxt 富文本
      //  pureTxt 纯文本 

      //生成虚拟dom,获取富文本高度
      let creatDiv = document.createElement("div");
      creatDiv.style.width = "500px";
      creatDiv.style.margin = "0 auto";
      creatDiv.innerHTML = htmlTxt;
      this.$el.append(creatDiv);
      let domHeight = creatDiv.clientHeight;//DOM的高度
      creatDiv.style.display = "none";
      this.$el.removeChild(creatDiv)
      // 比较高度和剩余高度
      if (domHeight < this.pageList[this.pageList.length - 1]) {
        // 放得开
        let domTxt = "<div style='width:500px;margin:0 auto;'>" + htmlTxt + '</div>'
        this.$refs.page[this.pageList.length - 1].innerHTML += domTxt
        this.pageList[this.pageList.length - 1] -= domHeight
      } else {
        // 放不开
        // 拆分虚拟dom
        let domArr = creatDiv.children//虚拟dom所有子元素
        // 循环放所有子元素
        for (let index = 0; index < domArr.length; index++) {
          // 获取每个子元素的高
          let creatDiv1 = document.createElement("div");
          creatDiv1.style.width = "500px";
          creatDiv1.style.margin = "0 auto";
          creatDiv1.innerHTML = domArr[index].outerHTML;
          this.$el.append(creatDiv1);
          let listItemHeight = creatDiv1.clientHeight //子元素的dom高
          creatDiv1.style.display = "none";
          this.$el.removeChild(creatDiv1);
          // 比较每个子元素和剩余高度
          if (listItemHeight < this.pageList[this.pageList.length - 1]) {
            // 放得开
            let domTxt1 = "<div style='width:500px;margin:0 auto;'>" + domArr[index].outerHTML + '</div>'
            if (this.$refs.page[this.pageList.length - 1]) {
              this.$refs.page[this.pageList.length - 1].innerHTML += domTxt1
              this.pageList[this.pageList.length - 1] -= listItemHeight
            } else {
              this.$nextTick(() => {
                this.$refs.page[this.pageList.length - 1].innerHTML += domTxt1
                this.pageList[this.pageList.length - 1] -= listItemHeight
              })
            }
          } else {
            // 放不开
            // 追加页面
            this.showPage = false
            this.pageList.push(700)
            this.showPage = true
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
              this.$nextTick(() => {
                let domTxt1 = "<div style='width:500px;margin:0 auto'>" + domArr[index].outerHTML + '</div>'
                this.$refs.page[this.pageList.length - 1].innerHTML += domTxt1
                this.pageList[this.pageList.length - 1] -= listItemHeight
              })
            } else {
              // 切分dom
              let num = creatDiv1.innerText.length - 1
              this.inputFn1(creatDiv1.innerText, creatDiv1.innerHTML, num)
            }
          }
        }
      }
    },
    inputFn1 (txt, pureTxt, count, nextTxt) {
      let num = count
      let creatDiv = document.createElement("div");
      creatDiv.style.width = "500px";
      creatDiv.style.margin = "0 auto";
      creatDiv.innerHTML = txt;
      this.$el.append(creatDiv);
      let eachXtHeight = creatDiv.clientHeight;//DOM的高度
      creatDiv.style.display = "none";
      let domTxt = "<div style='width:500px;margin:0 auto'>" + txt + '</div>'
      if (eachXtHeight < this.pageList[this.pageList.length - 1]) {
        this.$nextTick(() => {
          this.$refs.page[this.pageList.length - 1].innerHTML += domTxt
          this.pageList[this.pageList.length - 1] -= eachXtHeight
        })
        if (nextTxt) {
          this.showPage = false
          this.pageList.push(700)
          this.showPage = true
          let newPage = this.cutOutWidthBq(pureTxt, txt, num + 1)[1]
          let domTxt1 = "<div style='width:500px;margin:0 auto'>" + newPage + '</div>'
          let creatDiv1 = document.createElement("div");
          creatDiv1.style.width = "500px";
          creatDiv1.style.margin = "0 auto";
          creatDiv1.innerHTML = newPage;
          this.$el.append(creatDiv1);
          let count1 = creatDiv1.innerText.length
          let newTXT = creatDiv1.innerText
          creatDiv1.style.display = "none";
          this.inputFn1(newPage, newTXT, count1)
        }
      } else {
        let arr = this.cutOutWidthBq(pureTxt, txt, num)
        num--
        let creatDiv2 = document.createElement("div");
        creatDiv2.innerHTML = arr[0];
        let creatDiv2Txt = creatDiv2.innerText
        this.inputFn1(arr[0], creatDiv2Txt, num, arr[1])
      }
    },
    //-------------------------------------------------------------------------------------------------
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
      ttt = ttt.replace(new RegExp('<blockquote>', 'g'), '<~@&>');
      ttt = ttt.replace(new RegExp('</blockquote>', 'g'), '</~@&>');
      ttt = ttt.replace(new RegExp('<strong>', 'g'), '<@#$>');
      ttt = ttt.replace(new RegExp('</strong>', 'g'), '</@#$>');
      ttt = ttt.replace(new RegExp('<span>', 'g'), '<~@$>');
      ttt = ttt.replace(new RegExp('</span>', 'g'), '</~@$>');
      ttt = ttt.replace(new RegExp('<sup>', 'g'), '<~@^>');
      ttt = ttt.replace(new RegExp('</sup>', 'g'), '</~@^>');
      ttt = ttt.replace(new RegExp('<img>', 'g'), '<~$^>');
      ttt = ttt.replace(new RegExp('</img>', 'g'), '</~$^>');
      ttt = ttt.replace(new RegExp('<pre>', 'g'), '<@^&>');
      ttt = ttt.replace(new RegExp('</pre>', 'g'), '</@^&>');
      ttt = ttt.replace(new RegExp('<em>', 'g'), '<#$^>');
      ttt = ttt.replace(new RegExp('</em>', 'g'), '</#$^>');
      ttt = ttt.replace(new RegExp('<ol>', 'g'), '<~#$>');
      ttt = ttt.replace(new RegExp('</ol>', 'g'), '</~#$>');
      ttt = ttt.replace(new RegExp('<li>', 'g'), '<~#^>');
      ttt = ttt.replace(new RegExp('</li>', 'g'), '</~#^>');
      ttt = ttt.replace(new RegExp('<ul>', 'g'), '<~#&>');
      ttt = ttt.replace(new RegExp('</ul>', 'g'), '</~#&>');
      ttt = ttt.replace(new RegExp('<p>', 'g'), '<~@#>');
      ttt = ttt.replace(new RegExp('</p>', 'g'), '</~@#>');
      ttt = ttt.replace(new RegExp(`<br/>`, 'g'), '@$^');
      return ttt
    },
    resume (newZ) {
      let ttt = newZ
      ttt = ttt.replace(new RegExp('<~@&>', 'g'), '<blockquote>');
      ttt = ttt.replace(new RegExp('</~@&>', 'g'), '</blockquote>');
      ttt = ttt.replace(new RegExp('<\\@\\#\\$>', 'g'), '<strong>');
      ttt = ttt.replace(new RegExp('</\\@\\#\\$>', 'g'), '</strong>');
      ttt = ttt.replace(new RegExp('<~@\\$>', 'g'), '<span>');
      ttt = ttt.replace(new RegExp('</~@\\$>', 'g'), '</span>');
      ttt = ttt.replace(new RegExp('<~@\\^>', 'g'), '<sup>');
      ttt = ttt.replace(new RegExp('</~@\\^>', 'g'), '</sup>');
      ttt = ttt.replace(new RegExp('<~\\$\\^>', 'g'), '<img>');
      ttt = ttt.replace(new RegExp('</~\\$\\^>', 'g'), '</img>');
      ttt = ttt.replace(new RegExp('<#\\$\\^>', 'g'), '<em>');
      ttt = ttt.replace(new RegExp('</#\\$\\^>', 'g'), '</em>');
      ttt = ttt.replace(new RegExp('<~#\\$>', 'g'), '<ol>');
      ttt = ttt.replace(new RegExp('</~#\\$>', 'g'), '</ol>');
      ttt = ttt.replace(new RegExp('<~#\\^>', 'g'), '<li>');
      ttt = ttt.replace(new RegExp('</~#\\^>', 'g'), '</li>');
      ttt = ttt.replace(new RegExp('<~#&>', 'g'), '<ul>');
      ttt = ttt.replace(new RegExp('</~#&>', 'g'), '</ul>');
      ttt = ttt.replace(new RegExp('<~@#>', 'g'), '<p>');
      ttt = ttt.replace(new RegExp('</~@#>', 'g'), '</p>');
      ttt = ttt.replace(new RegExp('@\\$\\^', 'g'), `<br/>`);
      ttt = ttt.replace(new RegExp('<@\\^&>', 'g'), `<pre>`);
      ttt = ttt.replace(new RegExp('</@\\^&>', 'g'), `</pre>`);
      return ttt
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.box {
  border: 1px solid #000;
}
.mainBox {
  width: 700px;
  height: 800px;
  background: #eee;
  margin: 0 20px;
  float: left;
  overflow: auto;
}
.resBox {
  width: 700px;
  height: 800px;
  background: #ccc;
  margin: 0 20px;
  float: left;
  overflow: auto;
}
.pages {
  width: 600px;
  height: 700px;
  margin: 20px auto;
  background: #fff;
}
</style>
