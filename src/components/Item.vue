<template>
  <li>
      <label>
          <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
          <!-- <input type="checkbox" v-model="todo.done" /> -->   <!-- 可以实现功能，但不建议修改props数据 -->
          <span v-show="!todo.isEdit">{{todo.title}}</span>
          <input type="text"
           v-show="todo.isEdit"
           :value="todo.title" 
           @blur="handleBlur(todo, $event)"
           ref="inputTitle" />
      </label>
      <button class="btn btn-danger" @click="del(todo.id)">删除</button>
      <button v-show="!todo.isEdit" class="btn btn-edit" @click="edit(todo)">编辑</button>
  </li>
</template>

<script>
import pubsub from 'pubsub-js'

export default {
    name:'Item',
    // 声明接收todo对象
    props:['todo'],
    methods: {
        handleCheck(id) {
            console.log(id)
            this.$bus.$emit('checkTodo', id)
        },
        del(id) {
            if(confirm('确认删除吗？')) {
                console.log(id)
                // this.$bus.$emit('delTodo', id)
                pubsub.publish('delTodo', id)
            }
        },
        edit(todo) {
          if(todo.hasOwnProperty('isEdit')) {
            todo.isEdit = true
          } else {
            this.$set(todo, 'isEdit' ,true)
          }
          this.$nextTick(function(){
            this.$refs.inputTitle.focus()
          })
        },
        handleBlur(todo, e) {
          todo.isEdit = false
          if(!e.target.value.trim()) {
            alert('输入不能为空')
            return
          }
          this.$bus.$emit('updateTodo', todo.id, e.target.value)
        }
    }
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li label {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}
li button {
  float: right;
  display: none;
  margin-top: 3px;
}
li:before {
  content: initial;
}
li:last-child {
  border-bottom: none;
}
li:hover{
  background: #ddd;
}
li:hover button{
  display: block;
}
</style>