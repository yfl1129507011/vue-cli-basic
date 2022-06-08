<template>
  <div>
      <h2>人员列表</h2>
      <h2 style="color:skyblue">Count组件求和为：{{sum}}</h2>
      <h2>第一个人的姓名:{{firstPersonName}}</h2>
      <input type="text" placeholder="请输入名字" v-model="name">
      <button @click="add">添加</button>
      <button @click="addY">添加杨姓人</button>
      <button @click="addS">添加随机人</button>
      <ul>
          <li v-for="p in pList" :key="p.id">{{p.name}}</li>
      </ul>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import { mapState } from 'vuex'
export default {
    name: 'Person',
    data() {
        return {
            name: ''
        }
    },
    computed: {
        // ...mapState('personOptions', ['pList', 'sum'])
        pList() {
            return this.$store.state.personOptions.pList
        },
        sum() {
            return this.$store.state.countOptions.sum
        },
        firstPersonName() {
            return this.$store.getters['personOptions/firstPersonName']
        }
    },
    methods: {
        add() {
            const pObj = {id:nanoid(), name:this.name}
            this.$store.commit('personOptions/ADD_PERSON', pObj)
            this.name = ''
        },
        addY() {
            const pObj = {id:nanoid(), name:this.name}
            this.$store.dispatch('personOptions/addPersonYang', pObj)
            this.name = ''
        },
        addS() {
            this.$store.dispatch('personOptions/addPersonServe')
            this.name = ''
        }
    }
}
</script>

<style scoped>
button{
    margin-left: 5px;
}
</style>