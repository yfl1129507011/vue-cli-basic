// 该文件用于创建Vuex中最为核心的store
import Vue from "vue"
import Vuex from 'vuex'

// 应用Vuex插件
Vue.use(Vuex)

// 准备actions-用于响应组件中的动作
const actions = {
    /* incr(context, value){
        context.commit('INCR', value)
    },
    decr(context, value){
        context.commit('DECR', value)
    }, */
    incrOdd(context, value){
        if (context.state.sum % 2) {
            context.commit('INCR', value)
        }
    },
    incrWait(context, value){
        setTimeout(()=>{
            context.commit('INCR', value)
        }, 2000)
    },
}
// 准备mutations-用于操作数据
const mutations = {
    INCR(state, value){
        state.sum += value
    },
    DECR(state, value){
        state.sum -= value
    }
}
// 准备state-用于存储数据
const state = {
    sum: 0,  // 当前的和
    name: 'yfl',
    age: 18
}

const getters = {
    bigSum(state){
        return state.sum*10
    }
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})