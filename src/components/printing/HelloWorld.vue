<template>

  <div>
    <button @click="testFn(1)">start</button>
    <button @click="testFn(2)">over</button>
    <div class="box">
      <div class="bg">
        <img src="../../assets/timg.jpg"
             alt="">
      </div>
      <div class="canvasBox"
           ref="canvasHW"
           style="position:relative">
        <!-- <div style="width:1856px;height:152px;position:absolute;top:0;left:0;z-index:1;overflow:hidden">
          <img src="../assets/logo.png"
               alt=""
               style="margin:0 auto;">
        </div> -->
        <canvas ref="canvasF"
                style="background:rgba(255,255,255,0);z-index:999"
                @touchstart='touchStart'
                @touchmove='touchMove'
                @touchend='touchEnd'
                @mousedown="mouseDown"
                @mousemove="mouseMove"
                @mouseup="mouseUp"></canvas>
      </div>
      <div class="bg bg1"
           ref="xxx"
           @click="testFun"></div>
    </div>
    <div>
      <button @click="overwrite">清空画板</button>
      <button @click="commit">生成图片</button>
      <button @click="undo">撤销</button>
    </div>
    <img :src="imgUrl"
         alt=""
         style="border:1px solid red">
  </div>
</template>

<script>
export default {
  data () {
    return {
      stageInfo: '',
      imgUrl: '',
      client: {},
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      isViewAutograph: this.$route.query.isViews > 0,
      contractSuccess: this.$route.query.contractSuccess,
      undoList: []
    }
  },
  mounted () {
    let canvas = this.$refs.canvasF
    canvas.height = 300
    canvas.width = 800
    this.canvasTxt = canvas.getContext('2d')
    this.canvasTxt.fillStyle = 'rgba(255, 255, 255, 0)';
    this.stageInfo = canvas.getBoundingClientRect()
  },
  methods: {
    testFun () {
      console.log(123)
    },
    testFn (val) {
      if (val == 1) {
        this.$refs.xxx.style.zIndex = 1
        this.$refs.canvasHW.style.zIndex = 2
      } else {
        this.$refs.xxx.style.zIndex = 2
        this.$refs.canvasHW.style.zIndex = 1
      }
    },
    //mobile
    touchStart (ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clienX,
          y: ev.targetTouches[0].clientY,
        }
        this.startX = obj.x
        this.startY = obj.y
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
      }
    },
    touchMove (ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stageInfo.left,
          y: ev.targetTouches[0].clientY - this.stageInfo.top
        }
        this.moveY = obj.y
        this.moveX = obj.x
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.startY = obj.y
        this.startX = obj.x
        this.points.push(obj)
      }
    },
    touchEnd (ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stageInfo.left,
          y: ev.targetTouches[0].clientY - this.stageInfo.top
        }
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
        this.undoList.push(this.canvasTxt.getImageData(0, 0, 800, 300))
      }
    },
    //pc
    mouseDown (ev) {
      ev = ev || event
      ev.preventDefault()
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        }
        this.startX = obj.x
        this.startY = obj.y
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
        this.isDown = true
      }
    },
    mouseMove (ev) {
      ev = ev || event
      ev.preventDefault()
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        }
        this.moveY = obj.y
        this.moveX = obj.x
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.startY = obj.y
        this.startX = obj.x
        this.points.push(obj)
      }
    },
    mouseUp (ev) {
      ev = ev || event
      ev.preventDefault()
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        }
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
        this.points.push({ x: -1, y: -1 })
        this.isDown = false
        this.undoList.push(this.canvasTxt.getImageData(0, 0, 800, 300))
      }
    },
    //重写
    overwrite () {
      this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height)
      this.points = []
    },
    //提交签名
    commit () {
      this.imgUrl = this.$refs.canvasF.toDataURL();
      console.log(this.$refs.canvasF.toDataURL()) //签名img回传后台
    },
    //撤销
    undo () {
      this.undoList.pop()
      if (this.undoList.length > 0) {
        this.canvasTxt.putImageData(this.undoList[this.undoList.length - 1], 0, 0);
      } else {
        this.overwrite()
        this.undoList = []
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  position: relative;
  width: 800px;
  height: 300px;
  border: 1px solid red;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.bg img {
  width: 800px;
  height: 300px;
}
.main {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
