<template>
  
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
            <div>
            Question #: {{pregunta.numeropregunta}}
            </div>
            <div>
            Select the correct answer 
            </div>
          
  <div class="q-pa-md">
    <q-option-group 
      :options="optionschecked"
      type="radio"
      v-model="groupchecked"
    />
  </div>
 <q-btn color="primary" label="Save" />

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

export default {
   data () {
      
  return {  
       slide: "",
        groupchecked: null,
        optionschecked: [],
        
     
        
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
        for(let j = 0; j< this.examen.preguntasModulo[0].preguntachecked.preguntas.length; j++ ){
            this.optionschecked.push({ label: this.examen.preguntasModulo[0].preguntachecked.preguntas[j].pregunta , value: this.examen.preguntasModulo[i].preguntachecked.preguntas[j].id  });
        }
    //  { label: 1, value: 'style' },
   // this.
  },
  Mostrar(slide){
    this.groupchecked = null;
     this.optionschecked = [];
    for(let i = 0; i < this.examen.preguntasModulo.length; i++ ){
      if(this.examen.preguntasModulo[i].id===slide){
      if(this.examen.preguntasModulo[i].preguntachecked){
        for(let j = 0; j< this.examen.preguntasModulo[i].preguntachecked.preguntas.length; j++ ){
            this.optionschecked.push({ label: this.examen.preguntasModulo[i].preguntachecked.preguntas[j].pregunta , value: this.examen.preguntasModulo[i].preguntachecked.preguntas[j].id });
            
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