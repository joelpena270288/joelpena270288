
<template>
  <q-page
  
    class="window-height window-width row justify-center items-center"    
  >
   

    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:500px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Sign In </h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="add" color="blue-4" @click="$router.replace('/signup')"/>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl"  @submit.prevent="login">
              <q-input square clearable v-model="username" type="email" label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
         
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="blue-4" class="full-width text-white" label="Sign In" @click ="login()" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>    
  </q-page>
</template>


<script>
import { api } from 'boot/axios'
import { Notify } from 'quasar'
import JWT from 'jwt-client'
import authenticate from "../logic/authenticate"
export default {
  name: 'Login',
  methods: {
      auth(network) {       
      this.$hello(network).login({ scope: 'friends' })
       .then(() => {
       this.$router.push('profile')
        })
    },

    async login(){
    try {
    const token = await authenticate.login(this.username, this.password);
  
    if(token){
     authenticate.deleteUserLogged();
    let session = JWT.read(token.data.token);    
   
    session.claim.roles
    authenticate.setUserLogged(token.data.token);
    for(let i =0; i < session.claim.roles.length; i++){
        if( session.claim.roles[i]=="ADMINISTRADOR")
        {
            this.$router.push("/ADMINISTRACION");
        }
        else{
           this.$router.push("/");
        }
       

    }
  
    }
      

    
  }
   catch (error) {
    this.$q.notify({
        type: 'negative',
        message: 'username or password wrong'
      })
  
  }
} 
},

  data () {
    return {
      email: '',
      username: '',
      password: '',
     
    }
  }
}

</script>

<style scoped>
.dark{
  background: #1817309a;
}
</style>
