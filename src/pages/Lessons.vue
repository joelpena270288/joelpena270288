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
          <q-tab name="lesson" label="Lessons" />          
          <q-tab name="forum" label="Forum" />
           <q-tab name="pending" label="Pending Activities" />
                    
          
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="lesson">
            <div class="q-pa-md" style="min-height: 200px">
             <div v-for="clas in clases" v-bind:key="clas.id"> 
               <q-card class="my-card">
      
                <q-card-section class="bg-primary text-white">      
                   <div class="text-subtitle1">#: {{clas.numeroclase}}</div>   
        
         
                 <div class="text-subtitle2">{{clas.nombre}}</div>       
        
                 <div class="text-subtitle3">{{clas.descripcion}}</div>
                  <div class="text-subtitle4">Qualification: {{clas.nota}}</div>
                  <div class="text-subtitle5">Start Date: {{new Date(clas.fecha_inicio)}}</div>
                   <div class="text-subtitle2">  Activities:  </div> 
                    <div v-for="activity in clas.actividades" v-bind:key="activity.id">
                    <div class="text-subtitle2">{{activity.nombre}}</div>
                        </div>
               </q-card-section>
     
                   <q-separator />
            <q-card-actions align="right"  class="text-primary">        
         <q-btn flat color="green" @click="IrActivity(clas.id)">Activities</q-btn>
                <q-btn flat color="blue" @click="Edit(clas)">Edit</q-btn>
                 
               <q-btn flat color="red" @click="Delete(clas)">Delete</q-btn>
        
         
      </q-card-actions>
     
    </q-card>
    <q-separator/>
    </div> 

</div>
         <q-page-sticky  v-if="getAdmin== true"  position="bottom-right" :offset="[18, 18]">
           <q-btn fab icon="add" color="blue"  @click="AddClase()"/>
          </q-page-sticky>
           
          </q-tab-panel>

        
          <q-tab-panel name="forum">
             <div class="q-pa-md" style="min-height: 200px">


            </div>
          </q-tab-panel>
        

          <q-tab-panel name="pending">
             <div class="q-pa-md" style="min-height: 200px">


            </div>
          </q-tab-panel>
         
        </q-tab-panels>
      </q-card>

    
    </div>
  </div>


       <q-dialog v-model="prompt" persistent>
     <q-card style="min-width: 450px">
        <q-card-section>
          <div class="text-h6">Add Lesson</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

           <q-input color="blue" filled v-model="numeroclase" placeholder="# Lesson">
        <template v-if="numeroclase" v-slot:append>
          <q-icon name="cancel" @click.stop="numeroclase = null" class="cursor-pointer" />
        </template>
      </q-input>
          <q-input color="blue" filled v-model="tema" placeholder="Topic">
        <template v-if="tema" v-slot:append>
          <q-icon name="cancel" @click.stop="tema = null" class="cursor-pointer" />
        </template>
      </q-input>
       <q-input
      v-model="descripcion"
      filled
      type="textarea"  placeholder="Description"
    /> 

     <q-input color="blue" filled v-model="nota" placeholder="Qualification">
        <template v-if="nota" v-slot:append>
          <q-icon name="cancel" @click.stop="nota = null" class="cursor-pointer" />
        </template>
      </q-input>
      <p> Start Date</p>
       <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
     <q-date
        v-model="date"
        minimal
      />
    </div>
  </div>
       
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Lesson" v-close-popup @click="EditClase()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are shure to delete this lesson {{mensajeborrar}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click = "BorrarClase()" v-close-popup />
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
       tab: 'lesson',
      prompt:false,
      numeroclase: "",
      tema: "",
      descripcion: "",
      nota: "",
      date: new Date().now,
      idclase: '',
      confirm: false,
      idclaseseleccionada: '',
      mensajeborrar: "",
      clases: api.get('/clase/byidmodulo/'+this.$route.params.idmodulo,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.clases = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }))
      
        
     
    }
    
       
  },
   methods:{
     AddClase(){
    this.prompt =true;
     },
     Edit(clase){
       this.prompt=true;
      this.numeroclase= clase.numeroclase;
      this.tema= clase.nombre;
      this.descripcion= clase.descripcion;
      this.nota= clase.nota;
      this.date= new Date(clase.fecha_inicio); 
      this.idclase = clase.id;

     },
      Delete(clase){
       
      this.confirm = true;
      this.idclaseseleccionada = clase.id;
      this.mensajeborrar = clase.nombre;

    },
        async BorrarClase(){
     
      await api.delete('/clase/'+ this.idclaseseleccionada,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.mensajeconsulta = response,this.$q.notify({
        type: 'positive',
        message: 'Lesson was delete'
      }) ))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),

     await  api.get('/clase/byidmodulo/'+this.$route.params.idmodulo,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.clases = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       this.idmoduloseleccionado = '';
      


    },
    async EditClase(){         
        
        await api.post('/clase',{id: this.idclase, numeroclase: this.numeroclase, nombre: this.tema,descripcion: this.descripcion, nota: this.nota, fecha_inicio: this.date, modulo:this.$route.params.idmodulo },{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.clase = response.data))
        .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
        await api.get('/clase/byidmodulo/'+this.$route.params.idmodulo, {
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.clases = response.data))
       .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));
       this.prompt= false;
      this.numeroclase= "";
      this.tema= "";
      this.descripcion= "";
      this.nota= "";
      this.date= new Date().now;
      this.idclase = '';
     
       },
       IrActivity(clasid){
           this.$router.push({

                  path: "/activities/"+clasid,
                 params:{
                
                 clasid: clasid,
                }
                })
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