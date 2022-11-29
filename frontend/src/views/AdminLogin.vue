
<template>
    <p> 
    <center>Abilities at Work Login Terminal</center>
    </p>
    <!--onsubmit="return false", prevents page from reloading when a button is pressed -->
    <form onsubmit="return false">
      <center>
         <!-- <button class="btn" @click="storeCounter.IncreaseCount()">{{"Admin Login"}}</button>-->
          <button class="">
          <RouterLink class="btn" to="/userlogin">User Login</RouterLink>
          </button>
      </center>
            <label>Username:</label>
            <input type="username"  v-model ="username">
            <label>password:</label>
            <input type="password"   v-model="password">
       
        <center> 
            <button class= "btn" @click="auth">  Sign in </button>    
            <img src= "../assets/images/logo.png" >
        </center>
    </form>
    <p> </p>
</template>

<script>
import {authentication} from '../stores/Authentication'
const auth = authentication();
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