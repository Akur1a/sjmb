<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px;   */
}
ul,
ol {
  list-style: none;
}
.ivu-modal-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ivu-modal-wrap .ivu-modal {
  top: 0;
}
</style>
