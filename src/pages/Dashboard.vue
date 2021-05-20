<template>
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
          <q-tab name="progress" label="Courses in progress" />          
          <q-tab name="past" label="Past courses" />
           <q-tab name="plan" label="My plans" />
                    
            <q-tab name="my_courses_taught" label="My courses taught" />
              <q-tab  v-if="getAdmin== true"   name="administracion" label="Administration" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="progress">
            <div class="q-pa-md" style="min-height: 200px">
             <div v-for="curso in cursosprogresos" v-bind:key="curso.id">
               <q-card class="my-card">
      
                <q-card-section class="bg-primary text-white">      
                   <div class="text-subtitle1">Name: {{curso.curso.nombre}}</div>
          
        
         
                 <div class="text-subtitle2">Description: {{curso.curso.descripcion}}</div>       
        
                 <div class="text-subtitle3">Cost: ${{curso.curso.precio}}</div>
               </q-card-section>
     
                   <q-separator />
              <q-card-actions align="right">
             <q-btn flat color="blue" @click="Detail(curso.id)">Detail</q-btn>
        <q-btn flat color="red">Delete</q-btn>
         
      </q-card-actions>
     
    </q-card>
    <q-separator/>
    </div> 

</div>
           
          </q-tab-panel>

          <q-tab-panel name="my_courses_taught">
       <div class="q-pa-md" style="min-height: 200px">
              
      <div v-for="curso in cursoscreados" v-bind:key="curso.id">
      <q-card class="my-card">
      
      <q-card-section class="bg-primary text-white">      

          <div class="text-h6">{{curso.nombre}}
        
          <q-btn v-if= "!curso.disponible" size="10px" flat dense round icon="check_circle" label="Publish"  @click="PublicarCurso(curso.id)"/>
          <q-btn v-else size="10px" flat dense round icon="remove_circle" label="high"  @click="CerrarCurso(curso.id)"/>
        </div>
       
        <div class="text-subtitle2">{{curso.descripcion}}</div>
        <div class="text-subtitle3">Registration date:</div>
         <div class="text-subtitle4">{{new Date(curso.fecha_inicio_incripcion)}}-{{new Date(curso.fecha_fin_incripcion)}}</div>
        
        <div class="text-subtitle5">Cost: ${{curso.precio}}</div>
      </q-card-section>
     
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat color="green" @click="DetailAdmin(curso.id)">Modules</q-btn>
          <q-btn flat color="black" @click="Evaluation(curso.id)">Evaluation System</q-btn>
          <q-btn flat color="blue" @click="Edit(curso.id)">Edit</q-btn>
        <q-btn flat color ="red" @click="Delete(curso)">Delete</q-btn>
         
      </q-card-actions>
     
    </q-card>
    <q-separator/>
    </div> 

            </div>
            <q-page-sticky  v-if="getAdmin== true"  position="bottom-right" :offset="[18, 18]">
           <q-btn fab icon="add" color="blue" @click="prompt = true"/>
          </q-page-sticky>
          </q-tab-panel>

          <q-tab-panel name="past">
             <div class="q-pa-md" style="min-height: 200px">


            </div>
          </q-tab-panel>
        

          <q-tab-panel name="plan">
             <div class="q-pa-md" style="min-height: 200px">


            </div>
          </q-tab-panel>
           <q-tab-panel name="administracion">
             <div class="q-pa-md" style="min-height: 200px">


            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

    
    </div>
  </div>


  <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add Course</div>
        </q-card-section>
<div class="column no-wrap flex-center">
    <div class="q-gutter-y-md column" style="max-width: 300px">
     
      <q-input color="blue" filled v-model="nombrecurso" placeholder="Course Name">
        <template v-if="nombrecurso" v-slot:append>
          <q-icon name="cancel" @click.stop="nombrecurso = null" class="cursor-pointer" />
        </template>
      </q-input>
      
            
    <q-input
      v-model="descripcion"
      filled
      type="textarea"  placeholder="Description"
    /> 
    <q-input color="blue" filled v-model="qualification" placeholder="Qualification">
        <template v-if="qualification" v-slot:append>
          <q-icon name="cancel" @click.stop="qualification = null" class="cursor-pointer" />
        </template>
      </q-input>  
       <q-input color="blue" filled v-model="price" placeholder="Price">
        <template v-if="price" v-slot:append>
          <q-icon name="cancel" @click.stop="price = null" class="cursor-pointer" />
        </template>
      </q-input> 
  
     <div class="q-gutter-y-md column" style="max-width: 300px">
     Registration date
    </div>  
   

    <q-date v-model="registrationdate" registrationdate range/>
  </div>
   
  </div>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add course" v-close-popup @click="AddCurso()" />
        </q-card-actions>
      </q-card>
    </q-dialog> 

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are shure to delete this course  {{mensajeborrar}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click = "BorrarCurso()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> 
    
   </q-page-container>   
</template>


<script>
import { api } from 'boot/axios'
import JWT from 'jwt-client'
import authenticate from 'src/logic/authenticate'
import { Notify } from 'quasar'
export default {
  data () {
    return {
      tab: 'progress',
      prompt: false,
      nombrecurso:'',
      descripcion:'',
      qualification:'',
      price:'',
      confirm: false,
      mensajeborrar: "",
      mensajeconsulta: false,
      idcursoseleccionado: 0,
      iniciofecha: new Date().toLocaleString(),
      registrationdate: { from: '2020/07/08', to: '2020/07/17' },
      cursosprogresos: api.get('/cursosprogreso/all',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response=>(this.cursosprogresos = response.data))
.catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),

  cursosaprobados: api.get('/curso/byuser',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response=>(this.cursospasados = response.data))
.catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
  cursoscreados: api.get('/curso/byuser',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response=>(this.cursoscreados = response.data))
.catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }))

    }
  },
  methods:{
  async AddCurso(){
     
      await api.post('/curso',{nombre: this.nombrecurso,nota: this.qualification,precio:this.price, descripcion: this.descripcion,fecha_inicio_incripcion:this.registrationdate.from, fecha_fin_incripcion:this.registrationdate.to},{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.addcurso = response,this.$q.notify({
        type: 'positive',
        message: 'Your peticion was acepted'
      }) ))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
     
      await api.get('/curso/byuser',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response=>(this.cursoscreados = response.data))
.catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
        this.nombrecurso = '';
      this.descripcion ='';
      this.qualification = '';
      this.price = '';
      
    
    },
    Evaluation(cursoid){
       this.$router.push({

                  path: "/Evaluation/"+cursoid,
                 params:{
                 cursoid: cursoid,
                }
                })
     
    },
    Edit(cursoid){},
    Delete(curso){
       
      this.confirm = true;
      this.idcursoseleccionado = curso.id;
      this.mensajeborrar = curso.nombre;

    },
   async BorrarCurso(){
     
      await api.delete('/curso/'+ this.idcursoseleccionado,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.mensajeconsulta = response,this.$q.notify({
        type: 'positive',
        message: 'Course was delete'
      }) ))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),

     await  api.get('/curso/byuser',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response=>(this.cursoscreados = response.data))
.catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       this.idcursoseleccionado = 0;
       this.cursoscreados = null;


    },
    
       Detail(id){
         this.$router.push({

                  path: "/SeeLesson/"+id,
                 params:{
                 idcurso: id,
                }
                })
       },
        DetailAdmin(id){
         this.$router.push({

                  path: "/Modulo/"+id,
                 params:{
                 idcurso: id,
                }
                })
       },
      async PublicarCurso(id){

           await api.post('/curso',{id: id, disponible: true },{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.addcurso = response))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       await api.get('/curso').then(response => (this.cursos = response.data))
      .catch(error => console.log(error)),
     await api.get('/curso/byuser',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response=>(this.cursoscreados = response.data))
.catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }))
     

       },
      async CerrarCurso(id){
          await api.post('/curso',{id: id, disponible: false },{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.addcurso = response))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       await api.get('/curso').then(response => (this.cursos = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
     await api.get('/curso/byuser',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response=>(this.cursoscreados = response.data))
     
      }
  },

   computed: {
    userLogged() {
      return JWT.read( authenticate.getUserLogged()).claim.username;
    },
     getAdmin(){  
     let roles= JWT.read( authenticate.getUserLogged()).claim.roles;
     let cont=0;
     for(let i = 0; i< roles.length; i ++){
      if(roles[i]=="PROFESOR"){
        cont++;
      }
     
     }
     if(cont>=1){
       return true;
     }
     else{
       return false;
     }
     
    },
   
  }
  
}
</script>