<template>
  <div id="app">
    <button @click="showRef">点击输出ref信息</button>
    <img ref="logo" alt="Vue logo" src="./assets/logo.png">
    <School ref="sch" />
    <hr>
    <Student ref="stu" name="fenlon" :age="18" sex="男" />
  </div>
</template>

<script>
import School from './components/School.vue'
import Student from './components/Student.vue'

export default {
  name: 'App',
  components: {
    School,
    Student
  },
  methods: {
    showRef() {
      console.log(this.$refs)
    }
  }
}
</script>

<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
