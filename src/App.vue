<template>
  <div id="root">
      <div class="todo-container">
        <div class="todo-wrap">
            <MyHeader @addTodo="addTodo" />
            <List :todos="todos" />
            <MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @clearAllTodo="clearAllTodo" />
        </div>
      </div>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'

import MyHeader from "./components/MyHeader.vue";
import List from "./components/List.vue";
import MyFooter from "./components/MyFooter.vue";
import { title } from 'process';

export default {
    name: "App",
    components: { MyHeader, List, MyFooter },
    data() {
        return {
            todos: JSON.parse(localStorage.getItem('todos')) || []
        }
    },
    methods: {
        addTodo(todoObj) {
            console.log('App' + JSON.stringify(todoObj))
            this.todos.unshift(todoObj)
        },
        checkTodo(id) {
            this.todos.forEach((todo)=>{
                if(todo.id === id) {
                    todo.done = !todo.done
                }
            })
        },
        updateTodo(id, title) {
            this.todos.forEach((todo)=>{
                if(todo.id === id) {
                    todo.title = title
                }
            })
        },
        delTodo(_, id) {
            this.todos = this.todos.filter((todo) => {
                return todo.id !== id
            })
        },
        checkAllTodo(done) {
            this.todos.forEach((todo)=>{
                todo.done = done
            })
        },
        clearAllTodo() {
            this.todos = this.todos.filter((todo)=>{
                return !todo.done
            })
        }
    },
    watch: {
        todos: {
            deep: true,   // 深度监视
            handler(value) {
                localStorage.setItem('todos', JSON.stringify(value))
            }
        }
    },
    mounted(){
        // 给接收数据的组件绑定事件
        this.$bus.$on('checkTodo', this.checkTodo)
        // this.$bus.$on('delTodo', this.delTodo)
        // 订阅消息
        this.pid = pubsub.subscribe('delTodo', this.delTodo)

        this.$bus.$on('updateTodo', this.updateTodo)
    },
    beforeDestroy(){
        this.$bus.$off('checkTodo')
        // this.$bus.$off('delTodo')
        pubsub.unsubscribe(this.pid)
        this.$bus.$off('updateTodo')
    }
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: skyblue;
  border: 1px solid skyblue;
  margin-right: 5px;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>