<template>
  <li>
      <label>
          <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
          <!-- <input type="checkbox" v-model="todo.done" /> -->   <!-- 可以实现功能，但不建议修改props数据 -->
          <span>{{todo.title}}</span>
      </label>
      <button class="btn btn-danger" @click="del(todo.id)">删除</button>
  </li>
</template>

<script>
export default {
    name:'Item',
    // 声明接收todo对象
    props:['todo', 'checkTodo', 'delTodo'],
    methods: {
        handleCheck(id) {
            console.log(id)
            this.checkTodo(id)
        },
        del(id) {
            if(confirm('确认删除吗？')) {
                console.log(id)
                this.delTodo(id)
            }
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