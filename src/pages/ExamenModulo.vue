<template>
  <div class="q-pa-md">
    <div class="row items-start q-gutter-md">
      <q-card flat bordered class="col">
        <q-item>
         

          <q-item-section>
            <q-item-label>Questions</q-item-label>
           
          </q-item-section>
          
        </q-item>

        <q-separator />

        <q-responsive :ratio="1">
          <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
          <q-card-section class="border-radius-inherit  bg-grey-1">
            <q-item>
                <q-item-section>
                   <q-item-label class="text-h4">   
                Questions Multiselected:
                 </q-item-label>                  
                  <div v-for="pregunta in mostrarexamen.preguntasModulo" v-bind:key="pregunta.id">
                <div v-if="pregunta.preguntamultiselected">
                   <q-item-label class="text-h6">
                 Question: # {{pregunta.numeropregunta}}
                  </q-item-label>
                <div v-for="preguntas in pregunta.preguntamultiselected.preguntasvaluesVoF" v-bind:key="preguntas.id">
                {{preguntas.pregunta}}
                <div>
                Answer: {{preguntas.respuesta}}
                </div>
                 </div>             

                  </div>
                    </div>
                  </q-item-section>
                   <q-item-section side top>
           <q-btn  size="12px" flat dense round icon="add" @click="AddQuestion()"/>        
            </q-item-section>
              
              </q-item>
               <q-separator />

               <q-item>
                <q-item-section>
                   <q-item-label class="text-h4">   
                Questions Checked:
                 </q-item-label>                  
                  <div v-for="pregunta in mostrarexamen.preguntasModulo" v-bind:key="pregunta.id">
                <div v-if="pregunta.preguntachecked">
                   <q-item-label class="text-h6">
                 Question: # {{pregunta.numeropregunta}}
                  </q-item-label>
                <div v-for="preguntas in pregunta.preguntachecked.preguntas" v-bind:key="preguntas.id">
                {{preguntas.pregunta}}
               
                 </div>             
                <q-item-label> 
                Answer: {{preguntas.respuesta}}
                </q-item-label> 
                  </div>
                    </div>
                  </q-item-section>
                   <q-item-section side top>
           <q-btn  size="12px" flat dense round icon="add" @click="AddQuestion()"/>        
            </q-item-section>
              
              </q-item>
               <q-separator />

               <q-item>
                <q-item-section>
                   <q-item-label class="text-h4">   
                Questions True or False:
                 </q-item-label>                  
                  <div v-for="pregunta in mostrarexamen.preguntasModulo" v-bind:key="pregunta.id">
                <div v-if="pregunta.preguntaVoF">
                   <q-item-label class="text-h6">
                 Question: # {{pregunta.numeropregunta}}
                  </q-item-label>
                <div v-for="preguntas in pregunta.preguntaVoF.preguntasValue" v-bind:key="preguntas.id">
                {{preguntas.pregunta}}
                Answer: {{preguntas.respuesta}}
                 </div>             
               
                  </div>
                    </div>
                  </q-item-section>
                   <q-item-section side top>
           <q-btn  size="12px" flat dense round icon="add" @click="AddQuestion()"/>        
            </q-item-section>
              
              </q-item>
            
            
             
          </q-card-section>
        </q-responsive>
      </q-card>
     <q-dialog v-model="promptquestiontype" persistent>
     <q-card style="width: 300px"> 
        
        <q-card-section class="row items-center">
            
             <q-input style="width: 300px"
        ref="numero"
        filled
        type="number"
        v-model="numero"
        label=" number of the question"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type number of the question',
          val => val > 0 && val < 100 || 'Please type a real  number of the question'
        ]"
      />
      <q-separator />
          <q-input style="width: 300px"
        ref="valorpregunta"
        filled
        type="number"
        v-model="valorpregunta"
        label=" Value of the question"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type Value of the question',
          val => val > 0 && val < 100 || 'Please type a real  Vslue of the question'
        ]"
      />
      <q-separator />
          
      
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Save" color="primary" @click = "EscogerTipo()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> 

 <q-dialog v-model="promptToF" persistent>
     <q-card > 

        <q-card-section>
           <div class="text-h6"  style= "min-width: 300px ">Add Questions</div>
         <q-input
      v-model="preguntatof"
      filled
      type="textarea"  placeholder="Question"
    /> 
         
      <q-separator />
          
        <q-select
        filled
        v-model="answervof"
        label="Answer"
        :options="ToFOptions"
        style="width: 300px"
        behavior="menu"
      />      
        </q-card-section>

        <q-card-actions align="center">
          
          <q-btn flat label="Save" color="primary" @click = "AddQuestionToF()" />
           <q-btn flat label="Finish" color="primary" @click="CargarDatos()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> 
     <q-dialog v-model="promptSelected" persistent>
     <q-card > 

        <q-card-section>
           <div class="text-h6"  style= "min-width: 300px ">Add Questions</div>
         <q-input
      v-model="preguntaselected"
      filled
      type="textarea"  placeholder="Question"
    /> 
         
      <q-separator />
          
       
        </q-card-section>

        <q-card-actions align="center">
         
          <q-btn flat label="Save" color="primary" @click = "AddAllQuestionSelected()" />
           <q-btn flat label="Finish" color="primary" @click = "AddQuestionSelected()"  v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> 

<q-dialog v-model="promptquestionSelected" persistent>
     <q-card > 

        <q-card-section>
            <div class="text-h6"  style= "min-width: 300px ">select true answer</div>
          <div class="q-pa-md q-gutter-sm">
    <div class="q-gutter-sm">
      <div v-for="pregun in todaspreguntasChecked"  v-bind:key="pregun.id">
      <q-radio dense v-model="shape" :val="pregun" :label="pregun.pregunta" />
      </div> 
       </div>
     
    </div> 
        </q-card-section>

        <q-card-actions align="center">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Save" color="primary" @click = "EditQuestionSelected()"  v-close-popup/>
         
        </q-card-actions>
      </q-card>
    </q-dialog> 

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
      promptquestiontype: false,
       promptToF: false,
       promptSelected: false,
        modeltypequestion: null,
        numero: "",
        valorpregunta:"",
        preguntatof: "",
        //Pregunta selected
        preguntaselected: "",
        promptquestionSelected: false,
        answervof: null,
        ToFOptions:["True", "False"],
        SelectedOptions: "",
         shape: '',
      
      stringOptions: api.get('/tipo_pregunta',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.stringOptions = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),  

      examen: null,
      preguntas: null,
      savedpregunta: null,
      savedpreguntaVoF: null,
      savedpreguntaChecked: null,
      todaspreguntasChecked: null,
      savedpreguntaMulti: null,
      modemultiselected: false,
      
      
      
      mostrarexamen: {},

    }
  },
   mounted(){      

     // invocar los métodos
    this.CargarDatos();
     
    },
   methods:{
  async  AddQuestion(){
        this.promptquestiontype = true;   
          this.numero = "";
          this.valorpregunta = "";
          this.modeltypequestion = "";
        

 

    },
    async AddMultiselected(){
        await api.post('/preguntamultiselected/', {idPreguntaModulo: this.savedpregunta.id}, {
     headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.savedpreguntaMulti = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));
      this.modemultiselected = true; 
      this.promptToF = true;
    },
    async CargarDatos(){
   await api.get('/examenModulo/getbyIdModulo/'+this.$route.params.idmodulo,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.mostrarexamen = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }))
    },
   async EscogerTipo(){  
     
      await api.post('/preguntaModulo/'+ this.$route.params.idmodulo,{numeropregunta: this.numero, valorpregunta: this.valorpregunta},{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.savedpregunta = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));     
  if(this.modeltypequestion==="ToF"){  
         await api.post('/preguntavof/', {idpregunta: this.savedpregunta.id}, {
     headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.savedpreguntaVoF = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })); 
     
  
   this.promptToF = true;
  }
  if(this.modeltypequestion ==="Selected"){
     await api.post('/preguntachecked/', {idpregunta: this.savedpregunta.id}, {
     headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.savedpreguntaChecked = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })); 

    this.promptSelected = true;
    }
    if(this.modeltypequestion ==="Multiselected"){
        await api.post('/preguntamultiselected/', {idPreguntaModulo: this.savedpregunta.id}, {
     headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.savedpreguntaMulti = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));
      this.modemultiselected = true; 
      this.promptToF = true;
    }
    },
   async AddQuestionToF(){
  if(this.modemultiselected){
     let answuer = false;
     if(this.answervof==="True"){
       answuer = true;
     }
    
        await api.post('/preguntavalueVoF/preguntamultiselected/'+ this.savedpreguntaMulti.id,{pregunta: this.preguntatof, respuesta: answuer} ,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.preguntas = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));

  }
   
     let answuer = false;
     if(this.answervof==="True"){
       answuer = true;
     }
    
        await api.post('/preguntavalueVoF/'+ this.savedpreguntaVoF.id,{pregunta: this.preguntatof, respuesta: answuer} ,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.preguntas = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));
      
        this.valorpregunta = "";
        this.preguntatof =  "";
        this.answervof = null;
         this.modemultiselected = false; 
          this.savedpreguntaMulti = null;
          this.SelectedOptions = "";
           this.numero = "";
           this.preguntaselected = "";
         
    },
     AddQuestionSelected(){
    
    api.get('/pregunta/'+this.savedpreguntaChecked.id,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.todaspreguntasChecked = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
     this.promptquestionSelected = true;
      this.valorpregunta = "";
        this.preguntatof =  "";
        this.answervof = null;
         this.modemultiselected = false; 
          this.savedpreguntaMulti = null;
          this.SelectedOptions = "";
           this.numero = "";
              this.preguntaselected = "";
            
           
   },
   async AddAllQuestionSelected(){
      await api.post('/pregunta/'+ this.savedpreguntaChecked.id,{pregunta: this.preguntaselected} ,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.preguntas = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));
     
       this.SelectedOptions = "";
        this.numero = "";
     this.valorpregunta = "";
        this.preguntatof =  "";
        this.answervof = null;
         this.modemultiselected = false; 
          this.savedpreguntaMulti = null;
          this.SelectedOptions = "";
          this.numero = "";
          this.preguntaselected = "";
   },
  async EditQuestionSelected(){

    await api.patch('/preguntachecked/', {id: this.savedpreguntaChecked.id, pregunta_correcta: this.shape}, {
     headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.savedpreguntaChecked = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })); 
      this.CargarDatos();
      this.valorpregunta = "";
        this.preguntatof =  "";
        this.answervof = null;
         this.modemultiselected = false; 
        this.savedpreguntaMulti = null;
        this.SelectedOptions = "";
          this.numero = "";
          this.preguntaselected = "";
     
   }
   
   }
  
}
</script>