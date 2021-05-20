<template>
  <q-page
  
    class="window-height window-width row justify-center items-center"    
  >
   

    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:300px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Your Code </h4>
           
          </q-card-section>
          <q-card-section>
             <div class="row items-start q-gutter-md">
                
                
                     <q-input  style="max-width: 50px" maxlength="1" outlined v-model="codigo1" type="text" />

                       
                       <q-input  style="max-width: 50px" maxlength="1" outlined v-model="codigo2" type="text"  />
                       
                        <q-input  style="max-width: 50px" maxlength="1" outlined v-model="codigo3" type="text"  />
                       
                         <q-input  style="max-width: 50px" maxlength="1" outlined v-model="codigo4" type="text"  />

                   
                      
                 
           
               
                   </div>
             
             
           
          </q-card-section>
         
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="blue-4" class="full-width text-white" label="Send Code" @click ="SendCode()" />
          </q-card-actions>
          
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

    async SendCode(){
    try {
     this.$router.push('Datospersonales')
  
    
      

    
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
    
       codigo1: '',
      codigo2: '',
      codigo3: '',
      codigo4: '',
     
    }
  }
}

</script>

<style scoped>
.dark{
  background: #1817309a;
}
</style>
