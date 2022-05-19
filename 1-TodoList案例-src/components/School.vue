<template>
  <div>
      <h2 @click="showName">学校名称：{{name}}</h2>
      <h2>学校地址：{{addr}}</h2>
  </div>
</template>

<script>
// import {mixin} from '../mixin'
export default {
    name:'School',
    data(){
        return {
            name:'ybs',
            addr:'beijing'
        }
    },
    // mixins:[mixin]
}
</script>

<style scoped >

</style>