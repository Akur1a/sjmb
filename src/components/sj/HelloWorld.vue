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
            下&nbsp;&nbsp;&nbsp;&nbsp;载
          </div>
        </div>
      </div>
      <!-- 中间预览视图 -->
      <div class="mainPreview">
        <div v-for="(item,index) in pageList"
             :key="index"
             class="pages"
             ref="page">
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
               style="margin-left: 125px"
               v-if="index==0">
            <div id="header-title"
                 style="margin-left: -22px;">南宁学院{{titleInfo.xymc}}考试(查)试卷</div>
            <div style="height: 32px"></div>
            <div class="header-content1"
                 style="margin:0 auto">
              <div class="header-content-item">
                <div class="header-content-item-right">《<span style="min-width:515px;text-align:center;display:inline-block">{{titleInfo.kcmc}}</span>》课程 </div>
              </div>
              <div class="noWidth">
                <div style="margin-right: 5px;float: left;line-height: 35px"
                     v-for="(itemA,indexA) in titleInfo.sjTypeList"
                     :key="indexA">
                  <div v-if="titleInfo.sjxx==itemA.value">
                    <span>{{itemA.mc}}</span>
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
                  <div class="header-table-th">
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

        </div>
      </div>
      <!-- 右侧添加试题部分 -->
      <div class="questionTree">
        <div class="settingItem">
          <p class="settingTitle">添加大题</p>
          <ul class="addDT">
            <li v-for="(item,index) in typeList"
                :key="index"
                @click="showAddDT(item)">{{item.label}}</li>
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
                         :precision='1'
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

  </div>
</template>

<script>

export default {
  data () {
    return {
      paperSize: 'A4',//打印尺寸
      printingMode: '1',//打印方式
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
      pageList: [1, 2],//试卷list
      treeData: [],//题目list
      showTJDT: false,//添加大题弹窗
      editDTIndex: -1,//编辑大题坐标
      addDTInfo: {
        label: '',
        value: '',
        fz: 0.0,
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
    }
  },
  mounted () {
    // 年级专业显示超出一行时重新设置改行css
    this.$refs.njzy[0].style.height = this.$refs.njzyRes[0].clientHeight + 'px'
    this.$refs.njzy[0].style.lineHeight = this.$refs.njzyRes[0].clientHeight + 'px'
    this.$refs.mtjs[0].style.height = this.$refs.njzyRes[0].clientHeight + 'px'
    this.$refs.mtjs[0].style.lineHeight = this.$refs.njzyRes[0].clientHeight + 'px'
    this.$refs.mtjsRes[0].style.height = this.$refs.njzyRes[0].clientHeight + 'px'
    this.$refs.mtjsRes[0].style.lineHeight = this.$refs.njzyRes[0].clientHeight + 'px'
  },
  methods: {
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
              h('span', data.th + '.' + data.title)
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
      // watch添加大题弹窗 关闭后清空相关数据
      if (!this.showTJDT) {
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
      // watch确认删除弹窗 关闭后清空相关数据
      if (!this.confirmDel) {
        this.delInfo = {}
      }
    },
    showKSXX () {
      // watch修改考试信息弹窗 关闭后清空考试信息备份
      if (!this.showKSXX) {
        this.ksxxBackup = {}
      }
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
  position: relative;
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
/* 试卷部分css */
.dashedLine {
  height: 70px;
  width: 957.66px;
  background-color: #ffffff;
  font-size: 14px;
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
  font-size: 16px;
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
  font-size: 16px;
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
  font-size: 16px;
  position: relative;
}
</style>
