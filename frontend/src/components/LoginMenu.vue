<template>
    <p> 
    <center>Abilities at Work Login Terminal</center>
    </p>
    <form>
       <label>Username:</label>
       <input type="username" required v-model="username">
       <label>password:</label>
       <input type="password" required v-model="password">
       <label>name:</label>
       <input type="name" required v-model="name">
      <button @click="IsValidLogin()"> Submit </button>
       <img src= "../assets/images/logo.png" >
    </form>
    <p> Username: {{username}}</p>
    <p> password: {{password}}</p>
    <p> name: {{name}}</p>
</template>

<script>
export default {
    data(){
        return{
           username: '',
           password: '',
           name: ''
        }
    },
    methods:
    {
        //This function would be used in the backend to check
        //if the login info provided was valid
        IsValidLogin()
        {
            console.log("submitted login data!")
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
.pill{
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12-x;
    background: white;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: rgb(136, 22, 22);
    cursor: pointer;

}
</style>