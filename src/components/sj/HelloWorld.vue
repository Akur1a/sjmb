<template>
  <div class="bigBox">
    <!-- 主视图 -->
    <div class="box">
      <!-- 左侧选项部分 -->
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
          <div class="editBtn"
               @click="editKSXX">点击修改</div>
        </div>
        <div class="settingItem">
          <p class="settingTitle">编辑签字栏</p>
          <div class="editBtn"
               @click="showQZL=true">点击修改</div>
        </div>
        <div class="settingItem">
          <p class="settingTitle">是否显示分页</p>
          <i-switch v-model="showPageInfo"
                    style="margin-top:10px">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </div>
        <div class="settingItem">
          <p class="settingTitle">是否显示题号</p>
          <i-switch v-model="showTH"
                    @on-change='changeTHStatus'
                    style="margin-top:10px">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </div>
        <div class="cutOff"></div>
        <div class="settingItem">
          <div class="btns"
               @click="showPreview(1)">
            <img src="../../assets/ylsj.png"
                 alt=""
                 class="btnIcon"
                 style="width:16px;height:16px">
            试&nbsp;&nbsp;&nbsp;&nbsp;卷
          </div>
          <div class="btns"
               @click="showPreview(2)">
            <img src="../../assets/ylsj.png"
                 alt=""
                 class="btnIcon"
                 style="width:16px;height:16px">
            答&nbsp;&nbsp;&nbsp;&nbsp;案
          </div>
          <div class="btns"
               @click="showPreview(3)">
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
            下&nbsp;&nbsp;&nbsp;&nbsp;载
          </div>
        </div>
      </div>
      <!-- 中间预览视图 -->
      <div class="mainPreview"
           ref="mainBox">
        <div v-if="showPage">
          <A4Single :titleInfo='titleInfo'
                    :QZRData='QZRData'
                    :showTH='showTH'
                    :showPageInfo='showPageInfo'
                    :treeData='treeData'></A4Single>
        </div>
      </div>
      <!-- 右侧添加试题部分 -->
      <div class="questionTree">
        <div class="settingItem">
          <p class="settingTitle">添加大题</p>
          <p v-if="treeData.length>=15"
             style="color:red">最多添加15道大题，请删除原有大题后继续添加。</p>
          <ul class="addDT"
              v-if="treeData.length<15">
            <li v-for="(item,index) in typeList"
                class="AddLi"
                :key="index"
                @click="showAddDT(item)">{{item.label}}</li>
          </ul>
          <ul class="addDT"
              v-else>
            <li v-for="(item,index) in typeList"
                :key="index"
                class="AddLiNotAllow">{{item.label}}</li>
          </ul>
          <div style="clear:both"></div>
        </div>
        <p class="settingTitle">试题结构</p>
        <div class="treeBox">
          <Tree :data="treeData"
                :render="renderContent"
                class="demo-tree-render"></Tree>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <!-- 添加大题弹窗 -->
    <transition name="fade">
      <div v-if="showTJDT"
           style="width:100vw;height:100vh;position:fixed;background:rgba(0,0,0,0.5);z-index:1000;top:0;left:0">
        <div style="width:500px;height:350px;background:rgba(255,255,255,1);box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);border-radius:4px;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);">
          <p style="font-size:18px;margin:20px 0 0 30px">添加大题</p>
          <p style="font-size:14px;margin:25px 40px">
            <span style="width:80px;text-align:right;display:inline-block;margin-right:10px;">题型:</span>
            <span>{{addDTInfo.label}}</span>
          </p>
          <p style="font-size:14px;margin:25px 40px">
            <span style="width:80px;text-align:right;display:inline-block;margin-right:10px;">单题分数:</span>
            <InputNumber :min="0"
                         v-model="addDTInfo.fz"
                         @on-blur="fsChange"
                         placeholder='最多支持小数点后一位'
                         style="width:200px;"></InputNumber>
          </p>
          <p style="font-size:14px;margin:25px 40px">
            <span style="width:80px;text-align:right;display:inline-block;margin-right:10px;">说明:</span>
            <Input v-model="addDTInfo.sm"
                   type="textarea"
                   placeholder="请输入答题说明"
                   style="width:300px;vertical-align:top"
                   :autosize='{ minRows: 4, maxRows: 4 }' />
          </p>
          <div style="width:280px;margin:0 auto">
            <div style="width:120px;height:36px;font-size:16px;line-height:36px;text-align:center;cursor:pointer;float:left;margin:0 10px;border-radius:4px;background:#007ae1;color:white"
                 @click=addDT>确定</div>
            <div style="width:120px;height:36px;font-size:16px;line-height:36px;text-align:center;cursor:pointer;float:left;margin:0 10px;border-radius:4px;border:1px solid #ccc;color:#bbb"
                 @click="showTJDT=false">取消</div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 确认删除弹窗 -->
    <transition name="fade">
      <div v-if="confirmDel"
           style="width:100vw;height:100vh;position:fixed;background:rgba(0,0,0,0.5);z-index:9999;top:0;left:0">
        <div style="width:433px;height:180px;background:rgba(255,255,255,1);box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);border-radius:4px;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);">
          <Icon type="md-close-circle"
                style="color:#F5222D;font-size:22px;position:absolute;top:32px;left:32px" />
          <span style="position:absolute;top:33px;left:70px;font-size:16px;color:black;">请确认!</span>
          <span style="position:absolute;top:70px;left:70px;font-size:14px;font-family:PingFangSC;font-weight:400;width:331px;color:rgba(73,80,96,1);">请确认删除该题,此操作不可恢复!</span>
          <div style="position:absolute;top:120px;left:263px;">
            <div @click="remove"
                 style="cursor: pointer;float:left;color:#4D79F6;line-height:32px;text-align:center;width:66px;height:32px;background:rgba(255,255,255,1);border-radius:4px;border:1px solid #4D79F6;margin-right:7px">确定</div>
            <div @click="confirmDel=false"
                 style="cursor: pointer;float:left;color:rgba(130,141,177,1);line-height:32px;text-align:center;width:66px;height:32px;background:rgba(255,255,255,1);border-radius:4px;border:1px solid rgba(130,141,177,1);">取消</div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 修改考试信息弹窗-->
    <transition name="fade">
      <div v-if="showKSXX"
           style="width:100vw;height:100vh;position:fixed;background:rgba(0,0,0,0.5);z-index:1000;top:0;left:0">
        <div style="width:500px;background:rgba(255,255,255,1);box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);border-radius:4px;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);">
          <p style="font-size:18px;margin:20px 0 0 30px">编辑考试信息</p>
          <p style="font-size:14px;margin:25px 40px">
            <span style="width:80px;text-align:right;display:inline-block;margin-right:10px;">课程名称:</span>
            <Input v-model="ksxxBackup.kcmc"
                   style="width: 300px" />
          </p>
          <p style="font-size:14px;margin:25px 40px">
            <span style="width:80px;text-align:right;display:inline-block;margin-right:10px;">年级专业:</span>
            <Input v-model="ksxxBackup.grade"
                   style="width: 300px" />
          </p>
          <p style="font-size:14px;margin:25px 40px">
            <span style="width:80px;text-align:right;display:inline-block;margin-right:10px;">考试形式:</span>
            <RadioGroup v-model="ksxxBackup.ksfs">
              <Radio label="2"
                     style="margin-right:15px">&nbsp;闭卷</Radio>
              <Radio label="1"
                     style="margin-right:15px">&nbsp;开卷</Radio>
            </RadioGroup>
          </p>
          <p style="font-size:14px;margin:25px 40px">
            <span style="width:80px;text-align:right;display:inline-block;margin-right:10px;">考试时长:</span>
            <InputNumber :min="0"
                         v-model="ksxxBackup.kssc"
                         :precision='0'
                         style="width:200px;"></InputNumber>
          </p>
          <p style="font-size:14px;margin:25px 40px">
            <span style="width:80px;text-align:right;display:inline-block;margin-right:10px;">试卷信息:</span>
            <span style="display:inline-block;width:300px;vertical-align: top;">
              <RadioGroup v-model="ksxxBackup.sjxx">
                <Radio v-for="(item,index) in ksxxBackup.sjTypeList"
                       :label="item.value"
                       :key="index"
                       style="margin-right:15px">&nbsp;{{item.mc}}</Radio>
              </RadioGroup>
            </span>
          </p>
          <div style="width:280px;height:36px;margin:0 auto;margin-bottom:30px;">
            <div style="width:120px;height:36px;font-size:16px;line-height:36px;text-align:center;cursor:pointer;float:left;margin:0 10px;border-radius:4px;background:#007ae1;color:white"
                 @click=subKSXX>确定</div>
            <div style="width:120px;height:36px;font-size:16px;line-height:36px;text-align:center;cursor:pointer;float:left;margin:0 10px;border-radius:4px;border:1px solid #ccc;color:#bbb"
                 @click="showKSXX=false">取消</div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 修改签字栏弹窗-->
    <transition name="fade">
      <div v-if="showQZL"
           style="width:100vw;height:100vh;position:fixed;background:rgba(0,0,0,0.5);z-index:1000;top:0;left:0">
        <div style="width:500px;background:rgba(255,255,255,1);box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);border-radius:4px;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);">
          <p style="font-size:18px;margin:20px 0 0 30px">编辑签字栏</p>
          <p style="font-size:14px;margin:25px 40px">
            <span style="width:120px;text-align:right;display:inline-block;margin-right:10px;">是否启用签字栏:</span>
            <RadioGroup v-model="enableQZL">
              <Radio label="1"
                     style="margin-right:15px">&nbsp;是</Radio>
              <Radio label="0"
                     style="margin-right:15px">&nbsp;否</Radio>
            </RadioGroup>
          </p>
          <div style="font-size:14px;margin:25px 40px"
               v-if="enableQZL==1">
            <span style="width:120px;text-align:right;display:inline-block;margin-right:10px;">添加签字人:</span>
            <div style="display:inline-block;width:250px;vertical-align: top;">
              <p style="display:inline-block;width:300px;margin-bottom:10px;"
                 v-for="(item,index) in QZRList"
                 :key="index">
                <Input v-model="item.value"
                       placeholder="请输入签字人"
                       style="width: 200px" />
                <Icon type="md-trash"
                      v-if="index>0"
                      @click="delQZR(index)"
                      style="font-size:18px;color:red;cursor:pointer;margin-left:5px" />
              </p>
              <p style="display:inline-block;padding:2px 5px;border:1px solid black;border-radius:4px;cursor:pointer"
                 @click="QZRList.push({value:''})"
                 v-if="QZRList.length<3">
                添加签字人
              </p>
            </div>
          </div>
          <div style="width:280px;height:36px;margin:0 auto;margin-bottom:30px;">
            <div style="width:120px;height:36px;font-size:16px;line-height:36px;text-align:center;cursor:pointer;float:left;margin:0 10px;border-radius:4px;background:#007ae1;color:white"
                 @click=subQZL>确定</div>
            <div style="width:120px;height:36px;font-size:16px;line-height:36px;text-align:center;cursor:pointer;float:left;margin:0 10px;border-radius:4px;border:1px solid #ccc;color:#bbb"
                 @click="showQZL=false">取消</div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 添加小题弹窗 -->
    <transition name="fade">
      <div class="new-upload-dialog"
           v-if="showAddXT">
        <div id="new-upload-dialog-content">
          <div id="new-upload-dialog-title">
            添加
          </div>
          <add-new :testType="addXTType"
                   :testValue="XTValue"
                   @newChildTest="newChildTest"
                   @saveEditTest="saveEditTest"></add-new>
          <div id="new-upload-dialog-buttons">
            <Button id="cancelButton"
                    @click="showAddXT=false">取消
            </Button>
            <Button id="saveButton"
                    type="primary"
                    @click="confirmAddXT">保存
            </Button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 预览弹窗 -->
    <transition name="fade">
      <div v-if="showPreviewPage"
           style="width:100vw;height:100vh;position:fixed;background:rgba(0,0,0,0.5);z-index:9999;top:0;left:0">
        <div style="width:100vw;height:100vh;background:rgba(255,255,255,0.5);box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);border-radius:4px;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);overflow:auto">
          <Icon type="md-close"
                style="position:absolute;top:10px;right:10px;font-size:40px;cursor:pointer"
                @click="showPreviewPage=false" />
          <div style="margin:0 auto;margin-top:60px"
               v-html="previewHTML"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import addNew from "./addNew";
import bus from "../../common/reLoadBus";
import A4Single from './components/A4Single'

export default {
  data () {
    return {
      paperSize: 'A4',//打印尺寸
      printingMode: '1',//打印方式
      typeList: [
        {
          label: "单项选择题",
          value: "single_select"
        },
        {
          label: "多项选择题",
          value: "multi_select"
        },
        {
          label: "填空",
          value: "gap_filling"
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
          label: "完形填空",
          value: "cloze_test"
        },
        {
          label: "英语阅读",
          value: "English_reading"
        },
        {
          label: "作文",
          value: "composition"
        }
      ],//题型数组
      treeData: [],//题目list
      showTJDT: false,//添加大题弹窗
      editDTIndex: -1,//编辑大题坐标
      addDTInfo: {
        label: '',
        value: '',
        fz: null,
        sm: ''
      },//编辑新增大题信息
      confirmDel: false,//确认删除弹窗
      delInfo: {},//确认删除信息
      titleInfo: {
        xymc: '2019-2020学年第一学期',
        kcmc: '母猪的产后护理',
        sjTypeList: [
          {
            mc: 'A卷',
            value: '1'
          },
          {
            mc: 'B卷',
            value: '2'
          },
          {
            mc: 'C卷',
            value: '3'
          },
          {
            mc: 'D卷',
            value: '4'
          },
          {
            mc: 'E卷',
            value: '5'
          },
          {
            mc: 'F卷',
            value: '6'
          },
          {
            mc: 'G卷',
            value: '7'
          },
          {
            mc: 'H卷',
            value: '8'
          }
        ],
        grade: '2020级养猪与种地',
        ksfs: '1',
        mtjs: '养猪大户王铁牛',
        kssc: 120,
        sjxx: '1'
      },//考试头部信息
      ksxxBackup: {},//考试头部信息备份
      showKSXX: false,//修改考试信息弹窗
      showAddXT: false,//添加小题弹窗
      addXTType: '',//添加小题类型
      XTValue: {},//添加/编辑小题信息
      parentIndex: '',//添加编辑小题时对应大题的index
      childIndex: '',//编辑小题时小题的index
      xtth: '',//编辑小题时保存的小题题号
      showPage: true,//显示中间试卷主页面开关
      showPreviewPage: false,//预览弹窗
      previewHTML: '',//预览html
      showQZL: false,//编辑签字栏弹窗
      enableQZL: '0',//是否启用签字栏
      QZRList: [{ value: '' }],//签字人list
      QZRData: [],//签字人数据
      showPageInfo: true,//是否显示分页信息
      showTH: true,//是否显示题号
    }
  },
  components: {
    addNew, A4Single
  },
  mounted () {
  },
  methods: {
    fsChange () { // 该方法在input内容改变是就会触发进行检测
      if (this.addDTInfo.fz) {
        this.addDTInfo.fz = this.addDTInfo.fz.toFixed(1) * 1
      }
    },
    changePaperSize (val) {
      // 切换打印尺寸
      this.paperSize = val
    },
    editKSXX () {
      // 点击显示修改考试信息,把考试信息备份,在备份中修改
      this.showKSXX = true
      this.ksxxBackup = JSON.parse(JSON.stringify(this.titleInfo))
    },
    subKSXX () {
      // 点击提交修改考试信息,把修改过的备份赋值给真实数据
      this.titleInfo = JSON.parse(JSON.stringify(this.ksxxBackup))
      this.showKSXX = false
    },
    showAddDT (val) {
      // 点击添加大题
      this.showTJDT = true
      this.addDTInfo.label = val.label
      this.addDTInfo.value = val.value
    },
    addDT () {
      // 添加大题确认
      // 验证必填
      if (!this.addDTInfo.fz) {
        this.$Modal.error({
          title: '请输入单题分数且分数不能为0！'
        });
        return
      }
      // 判断是否为编辑,editDTIndex为-1新增,否则修改editDTIndex项
      if (this.editDTIndex == -1) {
        let treeDataItem = {
          title: this.addDTInfo.label,
          type: this.addDTInfo.value,
          fz: this.addDTInfo.fz,
          sm: this.addDTInfo.sm,
          th: this.toChinesNum(this.treeData.length + 1),
          expand: true,
          isDT: true,
          children: []
        }
        this.treeData.push(treeDataItem)
      } else {
        this.treeData[this.editDTIndex].fz = this.addDTInfo.fz
        this.treeData[this.editDTIndex].sm = this.addDTInfo.sm
      }
      this.showTJDT = false
    },
    renderContent (h, { root, node, data }) {
      // 树形试题结构render方法
      // 大题比小题多渲染一个新增按钮
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
                  fontWeight: 'bolder'
                }
              }, data.th + '、' + data.title)
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
                    click: () => {
                      this.showAddXT = true
                      this.addXTType = data.type;
                      this.parentIndex = this.treeData.indexOf(data);
                    }
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
                    click: () => {
                      this.editDTInfo(data)
                    }
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
                    click: () => {
                      this.confirmDel = true
                      this.delInfo = {
                        'root': root,
                        'node': node,
                        'data': data
                      }
                    }
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
                    click: () => {
                      const parentKey = root.find(el => el === node).parent;
                      const parent = root.find(el => el.nodeKey === parentKey).node;
                      this.parentIndex = this.treeData.indexOf(parent)
                      this.childIndex = parent.children.indexOf(data)
                      this.addXTType = data.type;
                      this.xtth = data.th
                      this.XTValue = data
                      this.$set(this.XTValue, "newData", true);
                      this.showAddXT = true
                    }
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
                    click: () => {
                      this.confirmDel = true
                      this.delInfo = {
                        'root': root,
                        'node': node,
                        'data': data
                      }
                    }
                  }
                }, '删除')
              ])
          ]);
      }
    },
    append (data) {
      //向树形结构添加数据
      const children = data.children || [];
      children.push({
        title: children.length + 1,
        th: children.length + 1,
        expand: true
      });
      this.$set(data, 'children', children);
    },
    editDTInfo (data) {
      // 编辑大题信息 获取编辑的index存入editDTIndex,信息填入addDTInfo
      const parentIndex1 = this.treeData.indexOf(data);
      this.addDTInfo.label = this.treeData[parentIndex1].title
      this.addDTInfo.value = this.treeData[parentIndex1].value
      this.addDTInfo.fz = this.treeData[parentIndex1].fz
      this.addDTInfo.sm = this.treeData[parentIndex1].sm
      this.editDTIndex = parentIndex1
      this.showTJDT = true
    },
    remove () {
      // 删除树形结构中数据方法,判断点击条目的node中是否存在parent,node.parent为undefined是大题否则为小题
      if (this.delInfo.node.parent != undefined) {
        const parentKey = this.delInfo.root.find(el => el === this.delInfo.node).parent;
        const parent = this.delInfo.root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(this.delInfo.data);
        parent.children.splice(index, 1);
        for (let j = 0; j < parent.children.length; j++) {
          parent.children[j].th = j + 1
        }
      } else {
        const parentIndex = this.treeData.indexOf(this.delInfo.data);
        this.treeData.splice(parentIndex, 1)
        for (let i = 0; i < this.treeData.length; i++) {
          this.treeData[i].th = this.toChinesNum(i + 1)
        }
      }
      this.confirmDel = false
    },
    confirmAddXT () {
      // 确认添加小题
      bus.$emit("saveChild123", true);
    },
    newChildTest (data) {
      //保存新增小题
      let th = this.treeData[this.parentIndex].children.length + 1
      this.$set(data, "title", '第' + th + '小题');
      this.$set(data, "th", th);
      this.$set(data, "expand", true);
      this.treeData[this.parentIndex].children.push(data)
      this.showAddXT = false
    },
    saveEditTest (data) {
      this.$set(data, "title", '第' + this.xtth + '小题');
      this.$set(data, "th", this.xtth);
      this.$set(data, "expand", true);
      this.treeData[this.parentIndex].children.splice(this.childIndex, 1, data);
      this.showAddXT = false;
    },
    showPreview (val) {
      // 点击显示预览方法
      // 1--试卷,
      // 2--答案,
      // 3--答题卡
      this.showPreviewPage = true
      if (val == 1) {
        this.previewHTML = this.$refs.mainBox.innerHTML
      }
    },
    subQZL () {
      if (this.enableQZL == '1') {
        this.QZRData = this.QZRList
      } else {
        this.QZRData = []
      }
      this.showQZL = false
    },
    delQZR (index) {
      this.QZRList.splice(index, 1)
    },
    changeTHStatus () {
      this.showPage = false
      setInterval(() => {
        this.showPage = true
      }, 0);
    },
    // -----------------------utils-------------------------------------
    toChinesNum (num) {
      //阿拉伯数字转中文数字
      let changeNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]; //changeNum[0] = "零"
      let unit = ["", "十", "百", "千", "万"];
      num = parseInt(num);
      let getWan = (temp) => {
        let strArr = temp.toString().split("").reverse();
        let newNum = "";
        for (var i = 0; i < strArr.length; i++) {
          newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : (i == 1 && strArr.length == 2 && strArr[i] == 1) ? (strArr[i] == 0 ? unit[0] : unit[i]) : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
        }
        return newNum;
      };
      let overWan = Math.floor(num / 10000);
      let noWan = num % 10000;
      if (noWan.toString().length < 4) noWan = "0" + noWan;
      return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    },
  },
  watch: {
    showTJDT () {
      // watch添加大题弹窗 关闭后清空相关数据并重新渲染页面
      if (!this.showTJDT) {
        this.showPage = false
        this.showPage = true
        this.editDTIndex = -1
        this.addDTInfo = {
          label: '',
          value: '',
          fz: 0.0,
          sm: ''
        }
      }
    },
    confirmDel () {
      // watch确认删除弹窗 关闭后清空相关数据并重新渲染页面
      if (!this.confirmDel) {
        this.showPage = false
        this.showPage = true
        this.delInfo = {}
      }
    },
    showKSXX () {
      // watch修改考试信息弹窗 关闭后清空考试信息备份并重新渲染页面
      if (!this.showKSXX) {
        this.showPage = false
        this.showPage = true
        this.ksxxBackup = {}
      }
    },
    showAddXT () {
      // watch添加修改小题弹窗 关闭后清空相关数据并重新渲染页面
      if (!this.showAddXT) {
        this.showPage = false
        this.showPage = true
        this.xtth = ''
        this.addXTType = ''
        this.XTValue = {}
        this.parentIndex = ''
        this.childIndex = ''
        this.xtth = ''
      }
    },
    showQZL () {
      // watch编辑签字栏弹窗 关闭后清空相关数据
      if (!this.showQZL && this.QZRData.length == 0) {
        this.enableQZL = '0'
        this.QZRList = [{ value: '' }]
      }
    },
    titleInfo: {
      handler (newValue, oldValue) {
        this.showPage = false
        setInterval(() => {
          this.showPage = true
        }, 0);
      },
      deep: true,
      immediate: true
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
  height: 100vh;
  width: 1360px;
  overflow-y: hidden;
  overflow-x: auto;
  background: white;
}
.leftSetting {
  width: 160px;
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
.addDT .AddLi {
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
.addDT .AddLi:hover {
  border: 1px solid #007ae1;
  color: #007ae1;
}
.addDT .AddLiNotAllow {
  float: left;
  padding: 0 10px;
  height: 26px;
  border: 1px solid #ccc;
  color: #ccc;
  border-radius: 4px;
  line-height: 26px;
  text-align: center;
  margin: 5px 5px;
  cursor: not-allowed;
}
.btns {
  width: 100px;
  height: 32px;
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
.questionTree {
  width: 390px;
  height: 100vh;
  float: left;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 20px;
  padding-top: 20px;
}
.treeBox {
  width: 100%;
  margin-bottom: 20px;
}
.treeBox >>> .demo-tree-render .ivu-tree-title {
  width: 100%;
}
.cutOff {
  border: 1px dashed #ccc;
  margin-left: -20px;
}
.bigBox >>> .ivu-radio-inner {
  border: 1px solid black;
}
.bigBox >>> .ivu-radio-checked .ivu-radio-inner {
  border-color: #2d8cf0;
}
.bigBox >>> .ivu-input-number-handler-wrap {
  display: none;
}
.bigBox >>> textarea {
  resize: none;
}
</style>
<style lang="less" scoped>
/* 添加小题弹窗 */
.new-upload-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 2;

  #new-upload-dialog-content {
    overflow-y: auto;
    position: absolute;
    max-height: 800px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    width: 760px;
    padding: 0 25px 25px;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;

    #new-upload-dialog-title {
      height: 55px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFangSC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 55px;
      border-bottom: 1px solid #d9d9d9;
    }

    #new-upload-dialog-buttons {
      padding-top: 20px;
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid #d9d9d9;

      .ivu-btn-primary {
        width: 87px;
        height: 43px;
        background: rgba(77, 124, 255, 1);
        border-radius: 4px;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          font-size: 14px;
        }

        &:hover {
          background: rgba(77, 124, 255, 0.8);
        }
      }

      #cancelButton {
        margin-right: 12px;
        width: 87px;
        height: 43px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(217, 217, 217, 1);
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          font-size: 14px;
        }

        &:hover {
          border-color: rgba(77, 124, 255, 1);
          color: rgba(77, 124, 255, 1);
        }
      }
    }
  }
}
</style>