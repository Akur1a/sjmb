<template>
  <div class="bigBox">

    <div class="box">
      <div class="leftSetting">
        <div class="settingItem">
          <p class="settingTitle">选择打印纸张</p>
          <ul class="selPaperSize">
            <li :class="paperSize=='A4'?'active':''"
                @click="changePaperSize('A4')">A4</li>
            <li :class="paperSize=='A3'?'active':''"
                @click="changePaperSize('A3')">A3</li>
            <li :class="paperSize=='B5'?'active':''"
                @click="changePaperSize('B5')">B5</li>
            <li :class="paperSize=='B4'?'active':''"
                @click="changePaperSize('B4')">B4</li>
            <li :class="paperSize=='16K'?'active':''"
                @click="changePaperSize('16K')">16K</li>
            <li :class="paperSize=='8K'?'active':''"
                @click="changePaperSize('8K')">8K</li>
          </ul>
          <div style="clear:both"></div>
        </div>
        <div class="settingItem">
          <p class="settingTitle">选择打印方式</p>
          <RadioGroup v-model="printingMode"
                      class="printingModeRadio">
            <Radio label="1"
                   style="margin:5px 0">&nbsp;单面打印</Radio>
            <Radio label="2"
                   style="margin:5px 0">&nbsp;双面打印</Radio>
          </RadioGroup>
        </div>
        <div class="settingItem">
          <p class="settingTitle">编辑考试信息</p>
          <div class="editBtn">点击修改</div>
        </div>
        <div class="cutOff"></div>
        <div class="settingItem">
          <div class="btns">
            <img src="../../assets/ylsj.png"
                 alt=""
                 class="btnIcon"
                 style="width:16px;height:16px">
            试&nbsp;&nbsp;&nbsp;&nbsp;卷
          </div>
          <div class="btns">
            <img src="../../assets/ylsj.png"
                 alt=""
                 class="btnIcon"
                 style="width:16px;height:16px">
            <!-- <Icon type="ios-eye-outline"
                class="btnIcon" /> -->
            答&nbsp;&nbsp;&nbsp;&nbsp;案
          </div>
          <div class="btns">
            <img src="../../assets/ylsj.png"
                 alt=""
                 class="btnIcon"
                 style="width:16px;height:16px">
            答题卡
          </div>
          <div class="btns">
            <img src="../../assets/bc.png"
                 alt=""
                 class="btnIcon"
                 style="width:16px;height:16px">
            保&nbsp;&nbsp;&nbsp;&nbsp;存
          </div>
          <div class="btns">
            <img src="../../assets/xz.png"
                 alt=""
                 class="btnIcon"
                 style="width:16px;height:16px">
            <!-- <Icon type="ios-cloud-download-outline"
                class="btnIcon"
                style="font-size:18px" /> -->
            下&nbsp;&nbsp;&nbsp;&nbsp;载
          </div>
        </div>
      </div>
      <div class="mainPreview">
        <div v-for="(item,index) in pageList"
             :key="index"
             class="pages"
             ref="page">
          <h1>假装有试卷</h1>
        </div>
      </div>
      <div class="questionTree">

        <div class="settingItem">
          <p class="settingTitle">添加大题</p>
          <ul class="addDT">
            <li v-for="(item,index) in typeList"
                :key="index"
                @click="addDT(item.value)">{{item.label}}</li>
          </ul>
          <div style="clear:both"></div>
        </div>

        <p class="settingTitle">试题结构</p>
        <div class="treeBox">
          <Tree :data="data5"
                :render="renderContent"
                class="demo-tree-render"></Tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      paperSize: 'A4',
      printingMode: '1',
      typeList: [
        {
          label: "填空",
          value: "gap_filling"
        },
        {
          label: "作文",
          value: "composition"
        },
        {
          label: "判断",
          value: "judge"
        },
        {
          label: "名词解释",
          value: "answer"
        },
        {
          label: "简答",
          value: "shortAnswer"
        },
        {
          label: "论述",
          value: "discussion"
        },
        {
          label: "单项选择题",
          value: "single_select"
        },
        {
          label: "多项选择题",
          value: "multi_select"
        },
        {
          label: "完形填空",
          value: "cloze_test"
        },
        {
          label: "英语阅读",
          value: "English_reading"
        }
      ],//题型数组
      pageList: [1, 2],
      data5: [
        {
          title: '一、填空',
          expand: true,
          isDT: true,
          children: [
            {
              title: '1.哈哈',
              expand: true,
              isDT: false,
            },
            {
              title: '2.呵呵',
              expand: true,
              isDT: false,
            }
          ]
        },
        {
          title: '二、选择',
          expand: true,
          isDT: true,
          children: [
            {
              title: '1.嘻嘻',
              expand: true,
              isDT: false,
            }
          ]
        }
      ],
      buttonProps: {
        type: 'default',
        size: 'small',
      }
    }
  },
  methods: {
    changePaperSize (val) {
      this.paperSize = val
    },
    addDT (val) {

    },
    renderContent (h, { root, node, data }) {
      console.log(data)
      if (data.isDT) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
            h('span', [
              h('span', {
                style: {
                  //  fontSize:'16px'  
                  fontWeight: 'bolder'
                }
              }, data.title)
            ]),
            h('span', {
              style: {
                display: 'inline-block',
                float: 'right',
                marginRight: '32px'
              }
            }, [
                h('div', {
                  style: {
                    marginRight: '8px',
                    width: '72px',
                    height: '24px',
                    border: '1px solid #007ae1',
                    color: '#007ae1',
                    borderRadius: '4px',
                    lineHeight: '24px',
                    textAlign: 'center',
                    display: 'inline-block',
                    fontSize: '14px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => { this.append(data) }
                  }
                }, '添加小题'),
                h('div', {
                  style: {
                    marginRight: '8px',
                    width: '44px',
                    height: '24px',
                    // border: '1px solid #007ae1',
                    backgroundColor: '#007ae1',
                    color: '#fff',
                    borderRadius: '4px',
                    lineHeight: '24px',
                    textAlign: 'center',
                    display: 'inline-block',
                    fontSize: '14px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => { }
                  }
                }, '编辑'),
                h('div', {
                  style: {
                    width: '44px',
                    height: '24px',
                    // border: '1px solid red',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '4px',
                    lineHeight: '24px',
                    textAlign: 'center',
                    display: 'inline-block',
                    fontSize: '14px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => { this.remove(root, node, data) }
                  }
                }, '删除')
              ])
          ]);
      } else {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
            h('span', [
              h('span', data.title)
            ]),
            h('span', {
              style: {
                display: 'inline-block',
                float: 'right',
                marginRight: '32px'
              }
            }, [
                h('div', {
                  style: {
                    marginRight: '8px',
                    width: '44px',
                    height: '24px',
                    border: '1px solid #007ae1',
                    color: '#007ae1',
                    borderRadius: '4px',
                    lineHeight: '24px',
                    textAlign: 'center',
                    display: 'inline-block',
                    fontSize: '14px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => { }
                  }
                }, '编辑'),
                h('div', {
                  style: {
                    width: '44px',
                    height: '24px',
                    border: '1px solid red',
                    color: 'red',
                    borderRadius: '4px',
                    lineHeight: '24px',
                    textAlign: 'center',
                    display: 'inline-block',
                    fontSize: '14px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => { this.remove(root, node, data) }
                  }
                }, '删除')
              ])
          ]);
      }

    },
    append (data) {
      const children = data.children || [];
      children.push({
        title: 'appended node',
        expand: true
      });
      this.$set(data, 'children', children);
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bigBox {
  width: 100%;
  background: #eee;
}
.box {
  margin: 0 auto;
  /* width: 100vw; */
  height: 100vh;
  width: 1360px;
  overflow-y: hidden;
  overflow-x: auto;
  background: white;
  /* background: springgreen; */
  /* border: 1px solid red; */
}
.leftSetting {
  width: 150px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  float: left;
  padding-left: 20px;
}
.settingTitle {
  font-size: 18px;
}
.settingItem {
  margin: 20px 0 30px 0;
}
.selPaperSize {
  /* height: 36px; */
}
.selPaperSize li {
  float: left;
  width: 50px;
  height: 26px;
  border: 1px solid black;
  border-radius: 4px;
  line-height: 26px;
  text-align: center;
  margin: 10px 5px 0 5px;
  cursor: pointer;
}
.selPaperSize .active {
  border: 2px solid #007ae1;
  line-height: 25px;
  color: #007ae1;
}
.selPaperSize li:hover {
  border: 2px solid #007ae1;
  line-height: 25px;
  color: #007ae1;
}
.printingModeRadio {
  margin-top: 10px;
  margin-left: 6px;
}
.settingItem .editBtn {
  width: 100px;
  height: 32px;
  background: #007ae1;
  border-radius: 4px;
  line-height: 32px;
  text-align: center;
  color: white;
  cursor: pointer;
  margin-top: 10px;
}
.addDT {
  margin-top: 5px;
}
.addDT li {
  float: left;
  padding: 0 10px;
  height: 26px;
  border: 1px solid black;
  border-radius: 4px;
  line-height: 26px;
  text-align: center;
  margin: 5px 5px;
  cursor: pointer;
}
.addDT li:hover {
  border: 1px solid #007ae1;
  color: #007ae1;
}
.btns {
  width: 100px;
  height: 32px;
  /* border: 1px solid #007ae1; */
  background-color: #007ae1;
  color: white;
  border-radius: 4px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  margin: 5px 0;
  float: left;
}
.btns .btnIcon {
  font-size: 26px;
  vertical-align: middle;
  margin-right: 5px;
}
.mainPreview {
  width: 810px;
  height: 100vh;
  float: left;
  overflow-x: hidden;
  overflow-y: auto;
  background: #999;
}
.mainPreview .pages {
  width: 786px;
  height: 1122px;
  background: white;
  margin: 20px auto;
  /* vertical-align:text-bottom */
}
.questionTree {
  width: 400px;
  height: 100vh;
  float: left;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 20px;
  padding-top: 20px;
}
.treeBox {
  width: 100%;
}
.treeBox >>> .demo-tree-render .ivu-tree-title {
  width: 100%;
}
.cutOff {
  border: 1px dashed #ccc;
  margin-left: -20px;
}
.settingItem >>> .ivu-radio-inner {
  border: 1px solid black;
}
.settingItem >>> .ivu-radio-checked .ivu-radio-inner {
  border-color: #2d8cf0;
}
</style>
