<template>
  <div>
    <h1>当前求和为：{{$store.state.sum}}</h1>
    <h1>当前求和放大10倍为：{{bigSum}}</h1>
    <h1>我是：{{getName}}，今年:{{getAge}}岁</h1>
    <h1>我是：{{name}}，今年:{{age}}岁</h1>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>

    <h2>Person组件的总人数：{{pList.length}}</h2>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: "Count",
  data() {
    return {
      n: 1,  // 用户选择的数字
    }
  },
  computed: {
    ...mapState({getName:'name', getAge: 'age'}),
    ...mapState(['name', 'age', 'pList']),
    ...mapGetters({bigSum:'bigSum'})
  },
  methods: {
    /* increment(){
      this.$store.commit('INCR', this.n)
    },
    decrement(){
      this.$store.commit('DECR', this.n)
    }, */

    ...mapMutations({increment:'INCR', decrement:'DECR'}),

    /* incrementOdd(){
      this.$store.dispatch('incrOdd', this.n)
    },
    incrementWait(){
      this.$store.dispatch('incrWait', this.n)
    } */

    ...mapActions({incrementOdd:'incrOdd', incrementWait:'incrWait'})
  },
  mounted(){
    console.log(this)
  }
}
</script>

<style scoped>
   button{
     margin-left: 5px;
   }
</style>