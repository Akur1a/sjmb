/* eslint-disable */
<template>
  <div>
    <script :id="this.id"
            type="text/plain"></script>
  </div>
</template>


<script>
import '../../static/UEditor/ueditor.config.js'
import '../../static/UEditor/ueditor.all.js'
import '../../static/UEditor/lang/zh-cn/zh-cn.js'
import '../../static/UEditor/ueditor.parse.js'
import '../../static/UEditor/kityformula-plugin/addKityFormulaDialog.js'
import '../../static/UEditor/kityformula-plugin/getKfContent.js'
import '../../static/UEditor/kityformula-plugin/defaultFilterFix.js'
import '../../static/ueditor/jquery-2.2.3.min.js'

export default {
  name: "ue",
  props: {
    index: {
      type: Number,
      default: 0
    },
    id: "",
    height: "",
    value: ""
  },
  data () {
    return {
      editor: null,
      val: "",
      // config: {
      //   // 如果需要上传功能,找后端小伙伴要服务器接口地址
      //   // serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
      //   // serverUrl: 'http://localhost:8090/ueditor/ueditorConfig',
      //   // 你的UEditor资源存放的路径,相对于打包后的index.html
      //   UEDITOR_HOME_URL: "/Ueditor/",
      //   // 编辑器不自动被内容撑高
      //   autoHeightEnabled: false,
      //   // 工具栏是否可以浮动
      //   autoFloatEnabled: false,
      //   // 初始容器高度
      //   initialFrameHeight: this.height,
      //   // 初始容器宽度
      //   initialFrameWidth: "100%",
      //   // 关闭自动保存
      //   enableAutoSave: false,
      //
      //   elementPathEnabled: false,
      //   wordCount: false,
      //   toolbars: [
      //     ["source", "undo", "redo", "|", "kityformula", "bold", "italic", "underline", "fontborder", "strikethrough", "superscript", "subscript", "removeformat", "formatmatch", "autotypeset", "blockquote", "pasteplain", "|", "forecolor", "backcolor", "insertorderedlist", "insertunorderedlist", "selectall", "cleardoc", "simpleupload"]
      //   ]
      // },
      config: {
        autoFloatEnabled: false,
        elementPathEnabled: false,
        wordCount: false,
        autoHeightEnabled: false,
        toolbars: [
          ['undo', 'redo', '|', 'kityformula', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'simpleupload', 'insertimage', 'insertcode', '|', 'inserttable', 'edittable']
        ],
        initialFrameHeight: this.height,
        initialFrameWidth: 800,
        enableAutoSave: false,
      }
    };
  },
  created () {
    // if (this.value) this.val = this.value;
  },
  mounted () {
    const _this = this
    this.editor = window.UE.getEditor(this.id, this.config);
    // 初始化UE
    this.editor.addListener('ready', function () {
      _this.editor.setContent(_this.value);
      // 确保UE加载完成后，放入内容。
      _this.editor.addListener('contentChange', function () {
        const content = _this.editor.getContent();
        const contentTxt = _this.editor.getContentTxt();
        // 编辑器内容有变动,通知父组件
        _this.$emit("updateEditor", content);//带有html标签的内容
        _this.$emit("getEditorTxt", contentTxt);//得到编辑器的纯文本内容，但会保留段落格式
      })
      _this.editor.addListener('blur', function () {
        const content = _this.editor.getContent();
        const contentTxt = _this.editor.getContentTxt();
        // 编辑器内容有变动,通知父组件
        _this.$emit("updateEditor", content);//带有html标签的内容
        _this.$emit("getEditorTxt", contentTxt);//得到编辑器的纯文本内容，但会保留段落格式
      })
    })
  },
  updated () {
    // if (this.index !== 0) this.$emit("readingIndex", this.index);

    // this.$emit("updateEditor", this.val);//带有html标签的内容
    // this.$emit("getEditorTxt", this.editor.getPlainTxt());//得到编辑器的纯文本内容，但会保留段落格式
  },
  methods: {
    getReady (editor) {
      this.editor = editor;
    },
    getUEContent () {
      // 获取内容方法
      return this.editor.getContent()
    },
    getUEContentTXT () {
      // 获取内容方法
      return this.editor.getContentTxt()
    }
  },
  destroyed () {
    this.editor.destroy()
  }
};
</script>
