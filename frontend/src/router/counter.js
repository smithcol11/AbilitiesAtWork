import {defineStore} from 'pinia'
export const useCounterStore = defineStore({
    id:'counter',
    state:()=>({
        count: 0,
        user: 'carson'
    }),
    actions: {
        IncreaseCount()
        {
            this.count++
            console.log("increase count")
        }
    },
    getters:
    {
        Value: (state) =>{
            return 'this'
        }
        
    }
})