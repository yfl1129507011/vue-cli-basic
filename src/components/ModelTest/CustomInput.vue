<template>
  <div>
    <h2>input包装组件----{{value}}</h2>
    <input :value="value" @input="emitHandler">
  </div>
</template>

<script>
export default {
    name: 'CustomInput',
    props: ['value'],
    methods: {
        emitHandler($event) {
            let val = $event.target.value
            this.$emit('input', val)
        }
    }
}
</script>

<style>

</style>