import {defineStore} from 'pinia'
export const useCounterStore = defineStore("counter",{
    state: () =>{
        return {count: 0};
    },
    actions: {
        Increment()
        {
            console.log("Incremtn call");
        }
    },

});
   