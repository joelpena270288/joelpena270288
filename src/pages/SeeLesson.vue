<template>
  <div class="q-pa-md">
    <div class="row items-start q-gutter-md">
      <q-card flat bordered class="col" style="max-width: 350px">
       <q-circular-progress
      show-value
      font-size="12px"
      :value="CalcularEstado()"
      size="50px"
      :thickness="0.22"
      color="teal"
      track-color="grey-3"
      class="q-ma-md"
    >
      {{CalcularEstado()}}%
    </q-circular-progress>
       {{cursoprogreso.curso.nombre}}
        <q-separator />
          
        
        <q-responsive :ratio="1/8">
          <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
          <q-card-section class="border-radius-inherit flex flex-lefth bg-grey-1">
             <div class="q-pa-md" style="min-width: 350px">
             <div v-if="cursoprogreso.modulospasados.length > 0">


               </div>
               

               <div v-if="cursoprogreso.moduloActual.clasespasadas.length > 0">


               </div>
                <q-item>
                   <q-item-section side top>
                       <q-btn size="12px" flat dense round icon="check_circle" color="blue" @click="PrepararClase(cursoprogreso.moduloActual.ultimaclase.clase)"/>
                      </q-item-section>
                        <q-item-section>
               <q-item-label >{{cursoprogreso.moduloActual.ultimaclase.clase.nombre}}</q-item-label>
                 </q-item-section>
               </q-item>
                <q-item>
                   <q-item-section side top>
                       <q-btn size="12px" flat dense round icon="check_circle" color="purple" @click="RealizarExamen()"/>
                      </q-item-section>
                        <q-item-section>
               <q-item-label >Module Examen</q-item-label>
                 </q-item-section>
               </q-item>
              
              </div>

          </q-card-section>
          
        </q-responsive>

      </q-card>

      <q-card flat bordered class="col">
        <q-item>
         

          <q-item-section>
            <q-item-label v-if="claseseleccionada" >{{claseseleccionada.nombre}}</q-item-label>
           
          </q-item-section>
        </q-item>

        <q-separator />

        <q-responsive :ratio="1/4">
          <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
          <q-card-section class="border-radius-inherit flex flex-right bg-grey-1">
           <div v-if="claseseleccionada">              
             
                <div v-for="activity in claseseleccionada.actividades" v-bind:key="activity.id">
                  <q-item>
                   
              <q-item-section>
              <q-item-label>
                
             Activity #: {{activity.numero}} {{activity.nombre}}              
              </q-item-label>           
              </q-item-section>
                </q-item>
                 <div v-if="activity.contenidos.length > 0">
                 <div v-for="cont in activity.contenidos" v-bind:key="cont.id">
                  {{cont.cuerpo}}
                  </div>                          
               
                 <q-separator spaced inset/>
                 </div>
                 <div v-if="activity.videos.length > 0">
                  <q-item>
              <q-item-section>
              <q-item-label>
              Videos:               
              </q-item-label>                
                 <div v-for="video in activity.videos" v-bind:key="video.id">
                     <div class="q-pa-md" style="min-width: 450px">
                  {{video.nombre}}
                  </div>               
          <template>
            
          <q-video
      :ratio="2/1"
      :src="video.link"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        </template>
                  
                  </div> 
                  
                     </q-item-section>
                  </q-item>                          
              
               <q-separator spaced inset/>
               </div> 
               
                <div v-if="activity.documentos.length > 0">
                  <q-item>
              <q-item-section>
              <q-item-label>
              Documents:              
              </q-item-label>                
                 <div v-for="documento in activity.documentos" v-bind:key="documento.id">
                     <div class="q-pa-md" style="min-width: 450px">
                  {{documento.nombre}}
                  </div>               
        

                  </div> 
                     </q-item-section>
                  </q-item>                          
              
                
               </div> 
                <q-separator spaced inset/>


                
                 
                <div v-if="activity.actividades_extraclases.length > 0">
                   <div class="q-pa-md" style="min-width: 450px">
                 <q-item>
              <q-item-section>
              <q-item-label>
              Homework:              
              </q-item-label>  
               <div v-for="homework in activity.actividades_extraclases" v-bind:key="homework.id">
                     <div class="q-pa-md" style="min-width: 450px">
                  {{homework.orientacion}}
                  </div>               
        

                  </div>          
              </q-item-section>
                </q-item>
                
              

                            
               
              
               </div>
               <q-separator  spaced inset/> 
                </div>
                </div> 
                
                <div v-if="cantidadPreguntasHtml > 0">
                   <div class="q-pa-md" style="min-width: 450px">
                 <q-item>
              <q-item-section>
              <q-item-label>
                
              Check trues answers:              
              </q-item-label>           
              </q-item-section>
                </q-item>
                <q-item>
                <q-item-section>
  <div class="q-pa-md">
    <q-option-group
      :options="optionspreguntas"
      label="Notifications"
      type="checkbox"
      v-model="grouppreguntas"
    />
  </div>
   </q-item-section>


                  </q-item>
                  
                
               
                </div>
                 <q-separator spaced inset/>
                </div>
               
                    
                    <div class="q-pa-md" style="min-width: 450px">
                  <q-btn unelevated size="12px" color="blue-4" class="full-width text-white" label="Next Lesson" @click ="ClaseProxima()" />
                 </div>
              </div>
          </q-card-section>
        </q-responsive>
      </q-card>
    </div>
  </div>
</template>


<script>
import { api } from 'boot/axios'
import JWT from 'jwt-client'
import authenticate from 'src/logic/authenticate'
import { Notify } from 'quasar'
export default {
   data () {
  return {
      slide: 1,
      optionspreguntas: [],
        grouppreguntas: [],
        cantidadPreguntasHtml: 0,
         evaluacionclase: 0,
    
        
       
     claseseleccionada: null, 
      cursoprogreso: api.get('/cursosprogreso/'+this.$route.params.idcurso,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.cursoprogreso = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       
     
      
    }
  },
   methods:{
     
   PrepararClase(clase){
   this.claseseleccionada = clase;
   for(let i = 0; i < clase.actividades.length; i++ ){
     for(let j = 0; j< clase.actividades[i].preguntas_html.length; j++){
       this.cantidadPreguntasHtml ++;
        this.optionspreguntas.push({label: clase.actividades[i].preguntas_html[j].pregunta, value: clase.actividades[i].preguntas_html[j].id  })
     }
    
   }
     
   
   },
  RealizarExamen(){},
   CalcularEstado(){
  
    return 100;
   },
  async ClaseProxima(){
       let respuesta = [];
    for(let i = 0; i < this.optionspreguntas.length; i++){
      let aparece = false;
      for(let j = 0; j < this.grouppreguntas.length; j++ ){
         if(this.optionspreguntas[i].value === this.grouppreguntas[j] ){
           aparece = true;
         }
        
      }
       if(aparece){
           respuesta.push({id: this.optionspreguntas[i].value, respuesta: true} )
         }
         else{
            respuesta.push({id: this.optionspreguntas[i].value, respuesta: false} )
         }
    }
      await api.post('/cursosprogreso/enviarNota',
     { id: this.cursoprogreso.id, preguntas: respuesta,idclase: this.idclase
   
   },
     {
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.evaluacionclase = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));
      if(this.evaluacionclase === 100){
         this.$q.notify({
        type: 'positive',
        message: "Congratulations you pass the lesson"
      })
      }else{
       this.$q.notify({
        type: 'negative',
        message: "Your score is "+ this.evaluacionclase + "%"
      })
      }
   }
   },
      computed: {
    userLogged() {
      return JWT.read( authenticate.getUserLogged()).claim.username;
    },
    
   
  }
}
</script>