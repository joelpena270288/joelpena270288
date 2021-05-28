<template>
 
  <div class="q-pa-md">
    <div  class="row justify-center">
        <CountDown :seconds="tiempoexamen" />
    </div>
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
      :options="optionschecked"
      type="radio"
      v-model="groupchecked"
    />
  </div>
  </q-item-section>
  </q-item>
   <q-item>
<q-item-section>
 <q-btn color="primary" label="Save" />
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
      :options="optionsmultipreguntas"
      label="Notifications"
      type="checkbox"
      v-model="groupmultipreguntas"
    />

  </div>
   </q-item-section>


  </q-item>
<div v-if="tiempoexamen > 0">
 <q-item>
<q-item-section>
 <q-btn color="primary" label="Save" />
</q-item-section>
  </q-item>
  </div>


            </div>  
        


        </div>
      
      </q-carousel-slide>
    
    </q-carousel>

    <div class="row justify-center">
      <q-btn-toggle @click="Mostrar(slide)"
        glossy
        v-model="slide"
        :options="optionsValues"
      />
      
    </div>
    
  </div>

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
        groupchecked: null,
        optionschecked: [],
         optionsmultipreguntas: [],
         groupmultipreguntas: [],
         tiempoexamen: 50,
      
        
      examen: {},
      optionsValues: [],
   
      
    }
  },
   mounted(){      

     // invocar los métodos
    this.CargarDatos();
     
    },
    
   /* created: function(){
        this.CargarDatos();
    },*/
   methods:{


     
 async CargarDatos(){
     this.groupchecked = null;
     this.optionschecked = [];
     this.optionsmultipreguntas = [];
       this.groupmultipreguntas = [];
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
  Mostrar(slide){
    this.groupchecked = null;
     this.optionschecked = [];
     this.optionsmultipreguntas = [];
       this.groupmultipreguntas = [];
    for(let i = 0; i < this.examen.preguntasModulo.length; i++ ){
      if(this.examen.preguntasModulo[i].id===slide){
      if(this.examen.preguntasModulo[i].preguntachecked){
        for(let j = 0; j< this.examen.preguntasModulo[i].preguntachecked.preguntas.length; j++ ){
            this.optionschecked.push({ label: this.examen.preguntasModulo[i].preguntachecked.preguntas[j].pregunta , value: this.examen.preguntasModulo[i].preguntachecked.preguntas[j].id });
            
        }
        
      }
      if(this.examen.preguntasModulo[i].preguntamultiselected){
       for(let j = 0; j< this.examen.preguntasModulo[i].preguntamultiselected.preguntasvaluesVoF.length; j++ ){
            this.optionsmultipreguntas.push({ label: this.examen.preguntasModulo[i].preguntamultiselected.preguntasvaluesVoF[j].pregunta , value:this.examen.preguntasModulo[i].preguntamultiselected.preguntasvaluesVoF[j].id });
            
        }
      }
    }
  
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
