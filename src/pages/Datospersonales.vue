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
          <q-tab name="personal" label="Personal Information" />          
          <q-tab name="education" label="Education" />
           <q-tab name="interesting" label="Interesting" />
           
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="personal">
         
           

 <q-responsive :ratio="4/1">
          <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
   <q-card-section class="border-radius-inherit flex flex-right bg-grey-1">  
     <q-item> 
        <q-item-section>     
   <div class="row items-start q-gutter-md">
    <q-avatar size="150px">
      <img :src="datosmios.details.photo">
    </q-avatar>
      <div class="colunm items-start q-gutter-md">
    <div class="text-subtitle2">Name: {{datosmios.details.name}} </div> 

    <div class="text-subtitle2">Last Name: {{datosmios.details.lastname}} </div>
    
    <div class="text-subtitle2">Age: {{datosmios.details.age}}</div>
   
    <div class="text-subtitle2">Sex: {{datosmios.details.sex}} </div>
    </div>
        <q-item-section side top>
           <div class="colunm items-start q-gutter-md">
           <q-btn size="12px" flat dense round icon="edit" @click= 'EditUser()' />
           </div>
         </q-item-section>
        </div>
  </q-item-section>
     
</q-item>


            </q-card-section>
           </q-responsive>
             <q-dialog v-model="prompbasicinfo" persistent>
      <q-card style="min-width: 350px">       

        <q-card-section class="text-primary">
           <q-avatar size="150px">
      <img :src= "foto"/>
    </q-avatar>
         
   <div>
     
     <span class="material-icons" style="width: 40px">
             photo_camera
              </span>
      <input type="file"   accept="image/jpeg" @change="uploadImage">
       
   </div>
        <q-input
        ref="name"
        filled
        v-model="nombre"
        label="Your name "
       
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
          <q-input
        ref="lastname"
        filled
        v-model="lastname"
        label="Your Last Name "
       
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
               
              
               <q-input
        ref="age"
        filled
        type="number"
        v-model="age"
        label="Your age *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 18 && val < 100 || 'Please type a real age'
        ]"
      />
          <q-select clearable filled  v-model="sexo" :options="optionssexo" label="Sex" />
       </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat color="green" label="Cancel" v-close-popup />
          <q-btn flat color="blue" label="Save" v-close-popup @click="EditarUsuario()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
          </q-tab-panel>

          <q-tab-panel name="education">
      
 <q-responsive :ratio="4/1">
          <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
   <q-card-section class="border-radius-inherit flex flex-right bg-grey-1">  
     <q-item> 
        <q-item-section side top>     
   <div class="row items-start q-gutter-md">
    
      <div class="row items-start q-gutter-md">
    <div class="text-subtitle2">{{datosmios.details.education}} </div> 

      <q-btn size="12px" flat dense round icon="edit" @click= 'EditEducation()' /> 
   
    </div>
     </div>
  </q-item-section>
     
</q-item>


    </q-card-section>
           </q-responsive>
              <q-dialog v-model="promptpersonaleducation" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit Education</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
             
        <q-select
        filled
        v-model="modeleducation"
        label="Education Level"
        :options="stringOptions"
        style="width: 350px"
        behavior="menu"
      />
      
       
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" v-close-popup @click="EditarUsuario()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
           
          </q-tab-panel>

          <q-tab-panel name="interesting">
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
import authenticate from 'src/logic/authenticate'
import { Notify } from 'quasar'

export default {
   
  data () {
    return {
      tab: 'personal',
      nombre: '',
      lastname: '',
      age: '',
      sex: '',
     
      sexo: 'Male',
      modeleducation: null,
        intereses: '',
      
       optionssexo: [
        'Male', 'Famele'
      ],
      stringOptions: [
  'High school degree', 'College degree', 'Masters degree', 'Doctoral degree', 'Postgraduate degree'
],

     
     foto: "",
     datosmios : api.get('users/mi',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }}).then(response => (this.datosmios = response.data )).catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })) ,
      
prompbasicinfo: false,
  previewImage:null,
  promptpersonaleducation: false,
    }
  },
  methods:{
     checkFileSize (files) {
      return files.filter(file => file.size < 2048)
    },

    checkFileType (files) {
      return files.filter(file => file.type === 'image/png')
    },

    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    onSubmit(){},
    EditUser(){
       this.nombre = this.datosmios.details.name;
      this.lastname = this.datosmios.details.lastname;
      this.age= this.datosmios.details.age;
      this.sexo= this.datosmios.details.sex;
      this.foto= this.datosmios.details.photo;
      this.prompbasicinfo= true;
    },
   async EditEducation(){
      this.modeleducation = this.datosmios.details.education;
    this.promptpersonaleducation =true;
   await api.get('users/mi',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }}).then(response => (this.datosmios = response.data )).catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }))

    },
     uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.foto = e.target.result;
                    
                };
            }, async EditarUsuario(){
      
  const updateuser=  await  api.post('/users/adddetail',
    {
      
       
         name: this.nombre,
         lastname: this.lastname,
         sex: this.sexo,
         age: this.age,
         photo: this.foto,
         education:this.modeleducation,
        intereses: this.interesting
        },
        {
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }}
    )
    await api.get('users/mi',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }}).then(response => (this.datosmios = response.data )).catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })) 

     }

   
  },

   computed: {
    userLogged() {
      return JWT.read( authenticate.getUserLogged()).claim.username;

    },
    Inicio(){
  api.get('users/mi',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }}).then(response => (this.datosmios = response.data, this.foto = response.data.photo)).catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));
}
   
   
  }
  
}
</script>