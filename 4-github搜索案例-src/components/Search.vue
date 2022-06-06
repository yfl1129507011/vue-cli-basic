<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="keyword"/>&nbsp;
      <button @click="searchUsers">Search</button>
    </div>
  </section>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Search',
        data() {
            return {
                keyword: ''
            }
        },
        methods: {
            searchUsers(){
                this.$bus.$emit('updataListData', {
                    isFirst: false,
                    isLoading:true,
                    errMsg: '',
                    users: []
                })
                axios.get(`https://api.github.com/search/users?q=${this.keyword}`)
                .then(res => {
                    console.log(res.data.items)
                    this.$bus.$emit('updataListData', {
                        isLoading:false,
                        errMsg: '',
                        users: res.data.items
                    })
                })
                .catch(e => {
                    console.log(`请求失败:${e.message}`)
                    this.$bus.$emit('updataListData', {
                        isLoading:false,
                        errMsg: e.message,
                        users: []
                    })
                })
            }
        }
    }
</script>

<style>

</style>