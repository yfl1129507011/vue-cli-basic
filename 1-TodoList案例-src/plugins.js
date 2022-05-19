export default {
    install(Vue) {
        console.log('@install', Vue)

        // 全局过滤器
        Vue.filter('mySlice', function(val){
            return val.slice(0,4)
        })

        // 定义混入
        Vue.mixin({
            data() {
                return {
                    x:100,
                    y:200
                }
            },
        })

        // 给Vue原型添加方法
        Vue.prototype.hello = ()=>{alert('hello, worlds')}
    }
}