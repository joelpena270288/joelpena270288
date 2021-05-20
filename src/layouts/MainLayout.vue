<template>
  <q-layout view="lHh Lpr lFf"
    class="img-background" >
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Create Training Course</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section @click="$router.replace('/')">
                Home
              </q-item-section>
            </q-item>

           

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="login" />
              </q-item-section>

              <q-item-section @click="$router.replace('/signin')">
                Signin
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>

              <q-item-section @click="$router.replace('/dashboard')">
                Dashboard
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="manage_accounts" />
              </q-item-section>

              <q-item-section @click="$router.replace('/datospersonales')">
                Profile
              </q-item-section>
            </q-item>
             <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="group" />
              </q-item-section>

              <q-item-section>
                Contact
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Help
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section @click="$router.replace('/signin')">
                Logout
              </q-item-section>
            </q-item>
            
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">
             {{userLogged}}</div>
            <div>{{emailLogged}}</div>
          </div>
        </q-img>
      </q-drawer>
   <q-page-container class="container-fluid">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import JWT from 'jwt-client'
import authenticate from 'src/logic/authenticate'
export default {
  data () {
    return {
      drawer: false,
       navPos: 'bottom',     
         slide: 'style',
         username:'',
         email:'',
         
            
    }
     },
     computed: {
      
   userLogged() {
     if(authenticate.getUserLogged()){
       return  JWT.read( authenticate.getUserLogged()).claim.username;
     }
     return "";
     
    },
    emailLogged() {
    
      if(authenticate.getUserLogged()){
         return JWT.read( authenticate.getUserLogged()).claim.email;
      }
      return "";
   }
  }
 }
</script>
<style>
::-webkit-scrollbar {
  display: none;
}
.img-background{
 background: linear-gradient( #ece9e6, #ffffff);
  /* Full height */
  height: 100%;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: solid 1px black
}
</style>
