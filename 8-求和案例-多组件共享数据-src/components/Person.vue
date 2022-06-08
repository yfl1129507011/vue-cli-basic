<template>
  <div>
      <h2>人员列表</h2>
      <h2 style="color:skyblue">Count组件求和为：{{sum}}</h2>
      <input type="text" placeholder="请输入名字" v-model="name">
      <button @click="add">添加</button>
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
        ...mapState(['pList', 'sum'])
    },
    methods: {
        add() {
            const pObj = {id:nanoid(), name:this.name}
            this.$store.commit('ADD_PERSON', pObj)
        }
    }
}
</script>

<style>

</style>