<template>
 <q-page-container>   
 <q-page-sticky   position="bottom-right" :offset="[18, 18]">
           <CountDown :seconds="tiempoexamen" />
          </q-page-sticky>
 
  <div class="q-pa-md">
  
    <q-carousel    
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders"
    >
     
       
     
       <q-carousel-slide  v-for="pregunta in examen.preguntasModulo" v-bind:key="pregunta.id" :name="pregunta.id" class="column no-wrap flex-center">
      
        <div class="q-mt-md text-center">
         
          <div v-if="pregunta.preguntachecked">
             <q-item>
              <q-item-section>
              <q-item-label>
            Question #: {{pregunta.numeropregunta}}
           </q-item-label>           
              </q-item-section>
                </q-item>
           <q-item>
              <q-item-section>
              <q-item-label>
            Select the correct answer 
             </q-item-label>           
              </q-item-section>
              </q-item>
     <q-item>
    <q-item-section>      
  <div class="q-pa-md">
    <q-option-group 
      :options="pregunta.preguntachecked.optionschecked"
      type="radio"
      v-model="pregunta.preguntachecked.pregunta_correcta"
    />
  </div>
  </q-item-section>
  </q-item>

 </div>

          <div v-if="pregunta.preguntamultiselected">
             <q-item>
              <q-item-section>
              <q-item-label>
            Question #: {{pregunta.numeropregunta}}
            
           </q-item-label>           
              </q-item-section>
              </q-item>
             <q-item>
              <q-item-section>
              <q-item-label>
            Select the real questions 
             </q-item-label>           
              </q-item-section>
              </q-item>
             
              <q-item>
                <q-item-section>
  <div class="q-pa-md">
    <q-option-group
      :options="pregunta.preguntamultiselected.optionsmultipreguntas"
      label="Notifications"
      type="checkbox"
      v-model="respuesta_multiselected"
    />

  </div>
   </q-item-section>


  </q-item>


  </div>

 <div v-if="pregunta.preguntaVoF">

    <q-item>
              <q-item-section>
              <q-item-label>
            Question #: {{pregunta.numeropregunta}}
            
           </q-item-label>           
              </q-item-section>
              </q-item>
                <q-item>
               <q-item-section>
              <q-item-label>
               
           Check True or False 
            
           </q-item-label>           
              </q-item-section>
              </q-item>
               <div v-for="tof in pregunta.preguntaVoF.preguntasValue" v-bind:key="tof.id" > 
           <q-item>
              

                  
            <div class="row">
              <div class="column" >
                 
           <q-select filled  v-model="tof.respuesta_ToF" :dense="dense" :options-dense="denseOpts" :options="stringOptions" style="max-height: 30px; max-width: 50px" >
            </q-select>
             
             </div>
            <q-separator spaced inset/>

              <div class="column">
                 <q-item-section>
          <q-item-label >               
          {{tof.pregunta}}            
           </q-item-label> 
             </q-item-section> 
        </div>
        
         </div>
        
           
      
              </q-item>
             <q-separator spaced inset/>
            </div>
            </div>
        
         

        </div>
      
      </q-carousel-slide>
    
    </q-carousel>

    <div class="row justify-center">
      <q-btn-toggle @click="Mostrar()"
        glossy
        v-model="slide"
        :options="optionsValues"
      />
      
    </div>
    
  </div>
   <div class="row justify-center">
 <q-btn color="primary" label="End Questionary" @click="EnviarCuestionario()"/>
 </div>
 </q-page-container>   
</template>

<script>
import { api } from 'boot/axios'
import JWT from 'jwt-client'
import authenticate from 'src/logic/authenticate'
import { Notify } from 'quasar'
 import CountDown from 'src/components/CountDown.vue'
export default {
  components: {
    CountDown
  },
   data () {
      
  return {  
       slide: "",
       
       
        respuesta_multiselected: [],
         tiempoexamen: 50,
         modelToF: [],
         stringOptions: ["T","F"],
      dense: false,
      denseOpts: false,
        
      examen: {},
      optionsValues: [],
      respuesta: {},
      posicion: -1,
      result: 0,
   
      
    }
  },
   mounted(){      

     // invocar los métodos
    this.CargarDatos();
     
    },
    
  
   methods:{


     
 async CargarDatos(){
   
     this.optionschecked = [];
   
         await  api.get('/examenModulo/getbyIdModulo/'+this.$route.params.idmodulo,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.examen = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));
      
       for(let i = 0; i < this.examen.preguntasModulo.length; i++ ){
         if( this.examen.preguntasModulo[i].preguntamultiselected){
           this.examen.preguntasModulo[i].preguntamultiselected.respuesta_multiselected = [];
         }
         if( this.examen.preguntasModulo[i].preguntachecked){
           this.examen.preguntasModulo[i].preguntachecked.pregunta_correcta = {};
         }
         this.optionsValues.push({ label: i+1, value: this.examen.preguntasModulo[i].id } );   
     }
     this.slide = this.examen.preguntasModulo[0].id;
       if(this.examen.preguntasModulo[0].preguntachecked){
        for(let j = 0; j< this.examen.preguntasModulo[0].preguntachecked.preguntas.length; j++ ){
            this.optionschecked.push({ label: this.examen.preguntasModulo[0].preguntachecked.preguntas[j].pregunta , value: this.examen.preguntasModulo[0].preguntachecked.preguntas[j].id  });
        }
       }
       if(this.examen.preguntasModulo[0].preguntamultiselected){
        
       for(let j = 0; j< this.examen.preguntasModulo[0].preguntamultiselected.preguntasvaluesVoF.length; j++ ){
            this.optionsmultipreguntas.push({ label: this.examen.preguntasModulo[0].preguntamultiselected.preguntasvaluesVoF[j].pregunta , value:this.examen.preguntasModulo[0].preguntamultiselected.preguntasvaluesVoF[j].id });
            
        }
      }
      
    //  { label: 1, value: 'style' },
   // this.
  },
  Mostrar(){ 
    
    
    if(this.posicion > 0){
     this.examen.preguntasModulo[this.posicion].preguntamultiselected.respuesta_multiselected = this.respuesta_multiselected;
    }  
    
     this.optionschecked = [];    
    for(let i = 0; i < this.examen.preguntasModulo.length; i++ ){
      if(this.examen.preguntasModulo[i].id===this.slide){
      if(this.examen.preguntasModulo[i].preguntachecked){
        this.examen.preguntasModulo[i].preguntachecked.optionschecked = [];
        for(let j = 0; j< this.examen.preguntasModulo[i].preguntachecked.preguntas.length; j++ ){
           this.examen.preguntasModulo[i].preguntachecked.optionschecked.push({ label: this.examen.preguntasModulo[i].preguntachecked.preguntas[j].pregunta , value: this.examen.preguntasModulo[i].preguntachecked.preguntas[j].id });
            
        }
        
      }
      if(this.examen.preguntasModulo[i].preguntamultiselected){   
           this.posicion = i;
         this.examen.preguntasModulo[i].preguntamultiselected.optionsmultipreguntas = [];
       
         this.respuesta_multiselected = this.examen.preguntasModulo[i].preguntamultiselected.respuesta_multiselected;
        

       for(let j = 0; j< this.examen.preguntasModulo[i].preguntamultiselected.preguntasvaluesVoF.length; j++ ){
            this.examen.preguntasModulo[i].preguntamultiselected.optionsmultipreguntas.push({ label: this.examen.preguntasModulo[i].preguntamultiselected.preguntasvaluesVoF[j].pregunta , value:this.examen.preguntasModulo[i].preguntamultiselected.preguntasvaluesVoF[j].id });
           
        }
      
      }
    }
  
  }
  
 
  },
 async EnviarCuestionario(){
    this.Mostrar();

      let allrespuestasVoF = [];
      let allrespuestaMultiselected = [];
    let respuestaMultiselected = {};
    let allpreguntaChecked = [];
    let preguntaChecked = {};
    let enviarexamen = {id: this.examen.id, 
    allrespuestasVoF, 
    allrespuestaMultiselected,
    allpreguntaChecked };
   for(let i = 0; i< this.examen.preguntasModulo.length; i++){
     if(this.examen.preguntasModulo[i].preguntaVoF){
       let respuesta=[];
       for(let j = 0; j < this.examen.preguntasModulo[i].preguntaVoF.preguntasValue.length; j++){
         if( this.examen.preguntasModulo[i].preguntaVoF.preguntasValue[j].respuesta_ToF){
            respuesta.push( {id: this.examen.preguntasModulo[i].preguntaVoF.preguntasValue[j].id, respuesta: this.examen.preguntasModulo[i].preguntaVoF.preguntasValue[j].respuesta_ToF});

         }
         else{
            respuesta.push( {id: this.examen.preguntasModulo[i].preguntaVoF.preguntasValue[j].id, respuesta: "null"});
         }
       }

         allrespuestasVoF.push({id: this.examen.preguntasModulo[i].preguntaVoF.id, respuesta});
     }
   
     if(this.examen.preguntasModulo[i].preguntamultiselected){
      respuestaMultiselected =  {id: this.examen.preguntasModulo[i].preguntamultiselected.id, respuesta: this.examen.preguntasModulo[i].preguntamultiselected.respuesta_multiselected  };
      allrespuestaMultiselected.push(respuestaMultiselected);
    }
    if(this.examen.preguntasModulo[i].preguntachecked){
      
      if(this.examen.preguntasModulo[i].preguntachecked.pregunta_correcta){
        preguntaChecked = {id: this.examen.preguntasModulo[i].preguntachecked.id, respuesta: this.examen.preguntasModulo[i].preguntachecked.pregunta_correcta};
       allpreguntaChecked.push(preguntaChecked);
      }else{
         preguntaChecked = {id: this.examen.preguntasModulo[i].preguntachecked.id, respuesta: "null"};
         allpreguntaChecked.push(preguntaChecked);
      }

    }
 
   }
     await  api.post('/examenModulo',enviarexamen,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.result = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));
 
  }
 
   

   },
      computed: {
    userLogged() {
      return JWT.read( authenticate.getUserLogged()).claim.username;
    },
    
   
  }
}
</script>
