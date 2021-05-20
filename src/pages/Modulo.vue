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
          <q-tab name="modules" label="Modules" />          
          <q-tab name="event" label="Events" />
           <q-tab name="stadistic" label="Stadistic" />
                    
          
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="modules">
            <div class="q-pa-md" style="min-height: 200px">
             <div v-for="modulo in modulos" v-bind:key="modulo.id">
               <q-card class="my-card">
      
                <q-card-section class="bg-primary text-white">      
                   <div class="text-subtitle1"># {{modulo.numeromodulo}}</div>   
        
         
                 <div class="text-subtitle2">{{modulo.nombre}}</div>       
        
                 <div class="text-subtitle3">{{modulo.descripcion}}</div>
                  <div class="text-subtitle3">Qualification: {{modulo.nota}}</div>
               </q-card-section>
     
                   <q-separator />
            <q-card-actions align="right"  class="text-primary">        
          <q-btn flat label="Lessons" v-close-popup color="green" @click="IrClases(modulo.id)"/>
          <q-btn flat label="Examen" v-close-popup color="black" @click="IrExamen(modulo.id)"/>
          <q-btn flat label="Edit" color="blue" v-close-popup @click="Edit(modulo)" />
           <q-btn flat label="Delete" @click="Delete(modulo)" v-close-popup color="red" />
        
         
      </q-card-actions>
     
    </q-card>
    <q-separator/>
    </div> 

</div>
         <q-page-sticky  v-if="getAdmin== true"  position="bottom-right" :offset="[18, 18]">
           <q-btn fab icon="add" color="blue"  @click="AddModule()"/>
          </q-page-sticky>
           
          </q-tab-panel>

        
          <q-tab-panel name="stadistic">
             <div class="q-pa-md" style="min-height: 200px">


            </div>
          </q-tab-panel>
        

          <q-tab-panel name="event">
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
          <div class="text-h6">Add Module</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
           <q-input color="blue" filled v-model="numeromodulo" placeholder="# Module">
        <template v-if="numeromodulo" v-slot:append>
          <q-icon name="cancel" @click.stop="numeromodulo = null" class="cursor-pointer" />
        </template>
      </q-input>
          <q-input color="blue" filled v-model="nombremodulo" placeholder="Module Name">
        <template v-if="nombremodulo" v-slot:append>
          <q-icon name="cancel" @click.stop="nombremodulo = null" class="cursor-pointer" />
        </template>
      </q-input>
      <q-separator />
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
       
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup color="green" />
          <q-btn flat label="Add module" color="blue" v-close-popup @click="EditModule()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
     <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are shure to delete this module  {{mensajeborrar}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click = "BorrarModulo()" v-close-popup />
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
       tab: 'modules',
      //add module
      numeromodulo:'',
      nombremodulo: '',
      descripcion: "",
      prompt:false,
      nota: "",
      modo: "",
      idmodulo: "",
      idmoduloseleccionado: "",
      mensajeborrar: "",
      confirm: false,
        modulos: api.get('/modulo/byidcurso/'+this.$route.params.idcurso,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.modulos = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
    }
       
  },
   methods:{
    
    
      AddModule(){
    this.prompt = true;

  
    
    },
     Delete(modulo){
       
      this.confirm = true;
      this.idmoduloseleccionado = modulo.id;
      this.mensajeborrar = modulo.nombre;

    },
    Edit(modulo){
      this.prompt = true;
      this.idmodulo = modulo.id;
       this.numeromodulo= modulo.numeromodulo;
      this.nombremodulo = modulo.nombre;
      this.descripcion = modulo.descripcion;     
      this.nota = modulo.nota;
      
    
    },
       async BorrarModulo(){
     
      await api.delete('/modulo/'+ this.idmoduloseleccionado,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.mensajeconsulta = response,this.$q.notify({
        type: 'positive',
        message: 'Module was delete'
      }) ))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),

     await  api.get('/modulo/byidcurso/'+this.$route.params.idcurso,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.modulos = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       this.idmoduloseleccionado = "";
      


    },
  async  EditModule(){
      await api.post('/modulo',{id: this.idmodulo,nombre: this.nombremodulo,numeromodulo: this.numeromodulo, descripcion: this.descripcion,nota: this.nota,curso: this.$route.params.idcurso },{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.addmodule = response))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }))
      await api.get('/modulo/byidcurso/'+this.$route.params.idcurso,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.modulos = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));
      this.prompt = false;
       this.numeromodulo= "";
      this.nombremodulo ="";
      this.descripcion = "";     
      this.nota = "";
        this.idmodulo = '';
    },
     IrClases(idmodulo){
       
       if(this.getAdmin == true){
          this.$router.push({

                  path: "/lessons/"+idmodulo,
                 params:{
                 idmodulo: idmodulo,
                }
                })

       }
       else{
          this.$router.push({

                  path: "/Error404"
                })
       }
      
       
      
    },
     IrExamen(idmodulo){
       
       if(this.getAdmin == true){
          this.$router.push({

                  path: "/examenModulo/"+idmodulo,
                 params:{
                 idmodulo: idmodulo,
                }
                })

       }
       else{
          this.$router.push({

                  path: "/Error404"
                })
       }
      
       
      
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