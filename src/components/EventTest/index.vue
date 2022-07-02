<template>
    <div>
        <h1>EventTest组件</h1>
        <button @click="handler">原生btn按钮</button>
        <Event1 class="Event1" @click.native="handler1"/>
        <hr>
        <Event2 @click="handler2" @xxx="handler2" />
    </div>
</template>

<script>
import Event1 from './Event1'
import Event2 from './Event2'

export default {
    name: "EventTest",
    components: {
        Event1, Event2,
    },
    methods: {
        handler($event) {
            alert($event.target.innerHTML)
        },
        handler1($event) {
            alert($event.target.className)
        },
        handler2(params) {
            alert(params)
        },
    }
}
</script>

<style>
</style>