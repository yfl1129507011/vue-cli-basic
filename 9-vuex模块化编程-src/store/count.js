export default {
    namespaced: true,
    actions: {
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
    },
    mutations: {
        INCR(state, value){
            state.sum += value
        },
        DECR(state, value){
            state.sum -= value
        },
    },
    state: {
        sum: 0,  // 当前的和
        name: 'yfl',
        age: 18,
    },
    getters: {
        bigSum(state){
            return state.sum*10
        }
    }
}