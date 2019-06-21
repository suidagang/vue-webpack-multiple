<template>
  <div>
    <h1>Hello World!11222444</h1>
    <button @click="btn" style="background:blue;">按钮</button>
    <div>{{num}}</div>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return {
      num:0
    }
  },
  mounted() {
  },
  methods:{
      btn(){
        this.num = this.num+2;
      }
  }
};
</script>

<style lang='less' scoped>
@clolor:pink;
html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 16px;
}
h1 {
  display: flex;
  color: @clolor;
}
</style>