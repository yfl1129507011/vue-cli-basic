<template>
  <div>
      <h1>{{msg}}</h1>
      <h2 @click="showName">学生名称：{{name}}</h2>
      <h2>学生年龄：{{myAge+1}}</h2>
      <h2>学生性别：{{sex}}</h2>
      <button @click="addAge">尝试修改年龄++</button>
  </div>
</template>

<script>
// 引入一个混合
// import { mixin } from '@/mixin'

export default {
    name:'Student',
    data() {
        return {
            /* name:'fenlon',
            age:18,
            sex: '男', */
            msg: '学生信息',
            myAge: this.age
        }
    },
    methods:{
        addAge(){
            this.myAge++
        }
    },
    // props:['name', 'age', 'sex']

    // 对接受的数据进行类型限制
    /* props:{
        name:String,
        age:Number,
        sex:String
    } */

    props: {
        name:{
            type: String,
            required: true
        },
        age: {
            type: Number,
            default: 18
        },
        sex:{
            type:String,
            required:true
        }
    },
    // mixins:[mixin]
}
</script>

<style>

</style>