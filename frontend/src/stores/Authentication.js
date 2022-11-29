import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const authentication = defineStore({
    id: 'counter',
    state:() => ({
         isAuthUser: false,
         isAuthAdmin: false,
         username: ' ',
         password: ' ',
         name: ' '
    }),

    actions:{
        AdminLogin(){
            console.log("Admin login method")
        },
        UserLogin(){
            console.log("User login")
        }
    },
    getters:
    {
        IsAuthorizedUser(){
            return this.isAuthUser;
        },
        IsAuthorizedAdmin(){
            return this.isAuthAdmin;
        }
    }
})
