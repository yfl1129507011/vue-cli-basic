<template>
  <div>
    <h2>深入v-modle</h2>
    <input type="text" v-model="msg"><span>{{msg}}</span>
    <br>
    <h2>深入v-model原理</h2>
    <!-- 原生DOM中有oninput事件：表示表单元素发生文本变化时触发 -->
    <input type="text" :value="msg" @input="inputHandler">

    <!-- 下面两个组件传递参数的方式等价 -->
    <CustomInput :value="msg" @input="noInputHandler" />
    <CustomInput v-model="msg" />
  </div>

</template>

<script>
import CustomInput from './CustomInput.vue'
export default {
    name: "ModelTest",
    data() {
        return {
            msg: "yfl"
        };
    },
    methods: {
        inputHandler($e) {
            this.msg = $e.target.value;
        },

        noInputHandler(val) {
            this.msg = val
        }
    },
    components: { CustomInput }
}
</script>

<style>

</style>