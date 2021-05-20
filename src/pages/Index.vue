<template >  
<q-page-container>             
  <div class="q-pa-md">
     <div class="q-gutter-y-md" style="max-width: 1600px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator >
        
          <q-tab name="online" label="Courses Online" />          
          <q-tab name="planes" label="Plan" />          
        </q-tabs>

        <q-separator />
      <q-tab-panels v-model="tab" animated>
         
          <q-tab-panel name="online">
          <div class="q-pa-md" style="min-height: 200px">
              
      <div v-for="curso in cursos" v-bind:key="curso.id">
      
      
      <q-card class="my-card">
      <q-card-section class="bg-primary text-white">      
           
          <div class="text-h6">{{curso.nombre}}        
          </div>
       
        <div class="text-subtitle2">Description: {{curso.descripcion}}</div>
       
         <div class="text-subtitle3">Registration date: {{new Date(curso.fecha_inicio_incripcion)}}-{{new Date(curso.fecha_fin_incripcion)}}</div>
        
        <div class="text-subtitle4">Cost: ${{curso.precio}}</div>
      </q-card-section>
     
      <q-separator />
      <q-card-actions align="right">
       
        <q-btn flat color="green" @click= "Registrar(curso.id)" > Registrer</q-btn>
         
      </q-card-actions>
     
    </q-card>
    <q-separator/>
    </div> 

     </div>
           
          </q-tab-panel>
   
        

           <q-tab-panel name="planes">
             <div class="q-pa-md" style="min-height: 200px">


            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

    
    </div>

   
  </div>
          
   </q-page-container>

  
</template>
  
 
   <script>
import { api } from 'boot/axios'
import JWT from 'jwt-client'
import { Notify } from 'quasar'
import authenticate from 'src/logic/authenticate'
export default {
  data () {
    return {
       tab: 'online',
         navPos: 'bottom',     
         slide: 'style',
         nombrecurso:'',
         descripcion:'',
         qualification:'',
         price:'',
         prompt: false,
        registrationdate: { from: '2020/07/08', to: '2020/07/17' },
         loading2: false,
      percentage2: 0,
       addcurso: null,
         cursos: api.get('/curso').then(response => (this.cursos = response.data))
      .catch(error => this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
     
    }
     },
     methods:{
     
    
   async Registrar(idcurso){
       
 await api.post('/cursosprogreso', {id: idcurso},{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.addcurso = response.data, this.$q.notify({
        type: 'positive',
        message: 'Your peticion was acepted'
      }) )
     )
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
    
       await api.get('/curso').then(response => (this.cursos = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }))
      

       }   
       
     },
      computed: {
    userLogged() {
      return JWT.read( authenticate.getUserLogged()).claim.username;
    },
   
  }
}
</script> 

