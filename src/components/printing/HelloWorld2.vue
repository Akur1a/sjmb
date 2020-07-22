<template>
  <div>
    <button @click="testFn(1)">start</button>
    <button @click="testFn(2)">over</button>
    <div class="box">
      <div class="bg">
        <img src="../../assets/timg.jpg"
             alt="">
      </div>
      <vue-esign ref="esign"
                 :width="800"
                 :height="300"
                 :isCrop="isCrop"
                 :lineWidth="lineWidth"
                 :lineColor="lineColor"
                 :bgColor.sync="bgColor"
                 class="main" />
      <div class="bg bg1"
           ref="xxx"></div>
    </div>
    <div>
      <button @click="handleReset">清空画板</button>
      <button @click="handleGenerate">生成图片</button>
    </div>
    <img :src="resultImg"
         alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPrint: false,
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false
    }
  },
  methods: {
    testFn (val) {
      console.log(this.$refs.esign.$el.style.zIndex)
      console.log(this.$refs.xxx.style.zIndex)
      if (val == 1) {
        this.$refs.xxx.style.zIndex = 1
        this.$refs.esign.$el.style.zIndex = 2
      } else {
        this.$refs.xxx.style.zIndex = 2
        this.$refs.esign.$el.style.zIndex = 1
      }
    },
    handleReset () {
      this.$refs.esign.reset()
    },
    handleGenerate () {
      this.$refs.esign.generate().then(res => {
        this.resultImg = res
        console.log(this.resultImg)
      }).catch(err => {
        alert(err) // 画布没有签字时会执行这里 'Not Signned'
      })
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
