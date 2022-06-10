import axios from "axios"
import { nanoid } from "nanoid"

export default {
    namespaced: true,
    actions: {
        addPersonYang(context, value){
            if(value.name.indexOf('杨') === 0) {
                context.commit('ADD_PERSON', value)
            }else{
                alert('添加的人必须姓杨')
            }
        },
        addPersonServe(context) {
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response => {
                    context.commit('ADD_PERSON', {id:nanoid(), name: response.data})
                },
                error => {
                    alert(error.message)
                }
            )
        }
    },
    mutations: {
        ADD_PERSON(state, pObj) {
            if (pObj.name) {
                state.pList.unshift(pObj)
            } else {
                alert('不能为空')
            }
        }
    },
    state: {
        pList: []
    },
    getters: {
        firstPersonName(state) {
            if(state.pList.length){
                return state.pList[0].name
            } else {
                return ''
            }
        }
    }
}