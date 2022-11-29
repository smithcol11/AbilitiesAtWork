<template>
    <p> 
    <center>Abilities at Work Login Terminal</center>
    </p>
    <!--onsubmit="return false", prevents page from reloading when a button is pressed -->
    <form onsubmit="return false">
        <center>
            <button class="btn" @click="ChangeLoginType()">{{loginTypeButtonString}}</button>
        </center>
        <div v-if="isAdmin">
            <label>Username:</label>
            <input type="username"  v-model ="username">
            <label>password:</label>
            <input type="password"   v-model="password">
        </div>
         <div v-else>
            <label>name:</label>
            <input type="name"   v-model="name">
        </div>
        <center> 
            <button class= "btn" @click="IsValidLogin()">  Sign in </button>    
            <img src= "../assets/images/logo.png" >
        </center>
    </form>
    <p> Username: {{username}}</p>
    <p> password: {{password}}</p>
    <p> name: {{name}}</p>
    <p> isAdmin: {{isAdmin}}</p>
    <p> login type: {{loginTypeButtonString}}</p>
</template>

<script>

export default {
    data(){
        return{
           username: '',
           password: '',
           name: '',
           loginTypeButtonString: "Admin Login",
           isAdmin : false,
           
        }
    },
    methods:
    {
        //This function would be used in the backend to check
        //if the login info provided was valid
        IsValidLogin()
        {   
            console.log("submitted login data!")
            if(this.isAdmin)
                this.IsValidAdminLogin()
            else
            this.IsValidEmployeeLogin();
        },
        IsValidAdminLogin()
        {
            console.log("submitted admin login!")
        },
        IsValidEmployeeLogin()
        {
            console.log("Submitted employee login!")
        },
        ChangeLoginType()
        {
            console.log("changing login type!")
            if(this.isAdmin)
               this.loginTypeButtonString = "Admin Login";
            else
               this.loginTypeButtonString = "Employee Login";
           this.isAdmin = !this.isAdmin;
        }

       
    }
    
}
</script>

<style>
form{
    max-width: 400px;
    margin: auto;
    background: rgb(236, 234, 234);
    text-align: left;
    padding: 20px;
    border-radius: 10px;
    
}
label{
    color: rgb(177, 169, 169);
    display: inline-block;
    margin: 20px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
input{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: rgb(37, 36, 36)
}
.btn {
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 6px 24px;
  font-size: 16px;
  cursor: pointer;
}
.btn:hover {
  background: #e7e7e7;
}
</style>