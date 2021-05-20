<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    
  >
    <div class="column q-pa-lg">
      <div class="row">
       <q-card square class="shadow-24" style="width:300px;height:535px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Create new account</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="close" color="blue-4" @click="$router.replace('/')" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl q-pb-lg">
              <q-input square clearable v-model="email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="username" type="username" label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
                <q-input square clearable v-model="repitpassword" type="password" label="Repit Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="blue-4" class="full-width text-white" label="Get Started" @click="Signup()" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6" @click="$router.replace('/signin')" >Return to login</p>
          </q-card-section>
        </q-card>
      </div>
    </div>    
  </q-page>
</template>


<script>
import { api } from 'boot/axios'
import { Notify } from 'quasar'
export default {
  name: 'Login',
  methods: {
    auth (network) {
      this.$hello(network).login({ scope: 'friends' })
        .then((res) => {
          console.log(res)
        })
    },
   async Signup(){    
     
      if(this.password==this.repitpassword){
        let sing = await api.post('/auth/signup',{username: this.username,email:this.email, password: this.password} ).then(() => this.$router.push('/Codigo'))
       .catch(err => console.log(err))
       if(!sing){
          this.$q.notify({
        type: 'negative',
        message: 'username or email exist'
      })
       }
      }
      else {
     this.$q.notify({
        type: 'negative',
        message: 'password not match'
      })
      }
      
   
    }

  },
  data () {
    return {
      email: '',
      username: '',
      password: '',
      repitpassword:'',
      messaje:''
    }
  }
}
</script>

<style scoped>
.dark{
  background: #1817309a;
}
</style>
