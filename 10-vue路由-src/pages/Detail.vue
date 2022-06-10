<template>
  <ul>
      <!-- <li>消息的编号：{{$route.query.id}}</li>
      <li>消息的内容：{{$route.query.title}}</li> -->
      <li>消息的编号：{{id}}</li>
      <li>消息的内容：{{title}}</li>
  </ul>
</template>

<script>
export default {
    name: 'Detail',
    props: ['id', 'title'],
    mounted() {
        console.log(this.$route)
    }
}
</script>

<style>

</style>