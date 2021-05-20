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
          <div v-for="modulo in cursoprogreso.moduloActual" v-bind:key="modulo.id">           
        <q-list>
         <q-item>
        <q-item-section>
          <q-item-label> {{modulo.modulo.nombre}}</q-item-label>  
               <div v-for="clase in modulo.clases" v-bind:key="clase.id">  
                  <q-list>
                  <q-item>
            
             <q-item-section side top>
           
              <q-btn v-if="ClasePasada(clase)" size="12px" flat dense round icon="check_circle" color="green" @click="PrepararClase(modulo.id,clase.id)"/>
          
             <q-btn v-if="UltimaClase(clase) && !ClasePasada(clase)" size="12px" flat dense round icon="check_circle" color="blue" @click="PrepararClase(modulo.id,clase.id)"/>
               <q-btn  v-if="!ClasePasada(clase) && !UltimaClase(clase)" size="12px"  color="red" flat dense round icon="check_circle" />
         </q-item-section>
                  <q-item-section>
                   
                    <q-item-label> {{clase.nombre}}</q-item-label>
                   
                    </q-item-section>
                   
          
                    </q-item>
                     </q-list>
                 </div>
        </q-item-section>
         

       
      </q-item>
      </q-list>
      <q-item>
       <q-item-section v-if="modulo.examen.id" side top>
        
        <q-btn  size="12px"  color="red" flat dense round icon="check_circle" />
         </q-item-section>
         <q-item-section>
           
         <q-item-label> Examen</q-item-label>
        </q-item-section>
       </q-item>
      <q-separator spaced inset />
    
      </div>
              </div>
          </q-card-section>
          
        </q-responsive>

      </q-card>

      <q-card flat bordered class="col">
        <q-item>
         

          <q-item-section>
            <q-item-label  v-if="claselista">{{claselista.nombre}}</q-item-label>
           
          </q-item-section>
        </q-item>

        <q-separator />

        <q-responsive :ratio="1/4">
          <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
          <q-card-section class="border-radius-inherit flex flex-right bg-grey-1">
            <div v-if="claselista">              
             
                <div v-for="activity in actividades" v-bind:key="activity.id">
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
          
          <q-video
      :ratio="2/1"
      :src="video.link"
        />
        
                  
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
                </div> 
                
                <div v-if="cantidadpreguntahtml > 0">
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
                
                <div v-if="cantidadhomework > 0">
                   <div class="q-pa-md" style="min-width: 450px">
                 <q-item>
              <q-item-section>
              <q-item-label>
              Homework:              
              </q-item-label>           
              </q-item-section>
                </q-item>
                <div v-for="activity in actividades" v-bind:key="activity.id">
                 <div v-for="homework in activity.actividades_extraclases" v-bind:key="homework.id">
                  {{homework.orientacion}}
                  </div>                          
               </div>
              
               </div>
               <q-separator  spaced inset/> 
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
    
       loadactividades: null,
       videos: null,
        documentos: null,
        contenidos: null,
        preguntashtml:null,
        actividadesextraclase:null,
        claselista: null,
        actividades: null,
        contenidos: null,
        videos: null,
        cantidadvideos: 0,
        cantidadpreguntahtml: 0,
        cantidadhomework: 0,
        grouppreguntas: [],
        optionspreguntas: [],
        evaluacionclase: 0,
        idclase:null,
       

      cursoprogreso: api.get('/cursosprogreso/'+this.$route.params.idcurso,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.cursoprogreso = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       group: [],
      options: [],
       value: 0,
      
    }
  },
   methods:{
     
   PrepararClase(idmodulo,idclase){
     
     this.idclase=null;
     this.cantidadvideos = 0;
     this.cantidadpreguntahtml = 0;
     this.cantidadhomework = 0;
       this.grouppreguntas= [];
        this.optionspreguntas= [];
        this.idclase=idclase;

     let clase;
     for(let i =0; i< this.cursoprogreso.curso.modulos.length; i++){
       if(this.cursoprogreso.curso.modulos[i].id === idmodulo){
         for(let j = 0; j<this.cursoprogreso.curso.modulos[i].clases.length; j++){
           if(this.cursoprogreso.curso.modulos[i].clases[j].id===idclase){
           clase= this.cursoprogreso.curso.modulos[i].clases[j];
          
           }
         }
       }
     }
      for(let k = 0; k < clase.actividades.length; k++){
        if(clase.actividades[k].videos.length > 0){
          this.cantidadvideos ++;
        }
        if(clase.actividades[k].preguntas_html.length > 0){
          for(let l = 0; l< clase.actividades[k].preguntas_html.length; l++){
              this.optionspreguntas.push({label: clase.actividades[k].preguntas_html[l].pregunta, value: clase.actividades[k].preguntas_html[l].id  })
          }
         
          this.cantidadpreguntahtml ++;
        }
        if(clase.actividades[k].actividades_extraclases.length){
          this.cantidadhomework ++;

        }
      } 
    this.claselista = clase;
    this.actividades = clase.actividades;
    
   
   },
   UltimaClase(clase){
     if(clase.id === this.cursoprogreso.ultimaclase.clase.id){
       return true;
     }

   },
   ClasePasada(clase){
     for(let i = 0; i< this.cursoprogreso.clasespasadas.length; i++){
       if(clase.id === this.cursoprogreso.clasespasadas[i].clase.id){
         return true;
       }
     }

   }, 
   CalcularEstado(){
     let totalClase = 0;
    /* for(let i =0; i< this.cursoprogreso.moduloActual.length; i++){
       totalClase +=  this.cursoprogreso.moduloActual[i].clases.length;
     }
    return parseInt(((this.cursoprogreso.clasespasadas.length)*100) / totalClase ); */
    return 100; 
   },
 
  async ClaseProxima(){
   
    this.optionspreguntas;
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

     

    
     await  api.get('/cursosprogreso/'+this.$route.params.idcurso,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.cursoprogreso = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }))
       this.idclase=null;
   }
    
   }
}
</script>