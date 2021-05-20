<template>
  <div class="q-pa-md">
    <div class="row items-start q-gutter-md">
      <q-card flat bordered class="col" style="max-width: 350px">
         <q-item>
         

          <q-item-section>
            <q-item-label >Activities</q-item-label>
           
          </q-item-section>
           <q-item-section side top>
           <q-btn  size="12px" flat dense round icon="add" @click="AddActivity()"/>        
            </q-item-section>
        </q-item>
      

         <q-separator />
          <q-dialog v-model="promptdateactivity" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          
          <div class="text-h6">Add Activity</div>
        </q-card-section>
       
        <q-card-section class="q-pt-none">
           <q-input color="blue" filled v-model="numeroactividad" placeholder="# Activity">
        <template v-if="numeroactividad" v-slot:append>
          <q-icon name="cancel" @click.stop="numeroactividad = null" class="cursor-pointer" />
        </template>
      </q-input>
          <q-input color="blue" filled v-model="nombreactivity" placeholder="Topic">
        <template v-if="nombreactivity" v-slot:append>
          <q-icon name="cancel" @click.stop="nombreactivity = null" class="cursor-pointer" />
        </template>
      </q-input>   
     
    

       <q-input v-model="editoractivity"
      filled
      type="textarea"  placeholder="Description"
    /> 
   
      
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          
           <q-btn v-if="editaractividad" flat label="Edit Activity" v-close-popup @click="EditActivity(mostraractividad)" />
          <q-btn v-else flat label="Add Activity" v-close-popup @click="AddActividad()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

      <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are shure to delete this Activity {{mensajeborrar}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click = "BorrarActividad()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> 

        <q-responsive :ratio="1/3">
        
          <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
          <q-card-section class="border-radius-inherit flex flex-lefth bg-grey-1">
          <div class="q-pt-none" style= "max-width: 350px "> 
             <div v-for="activity in activities" v-bind:key="activity.id">
             <q-card class="my-card">      
                <q-card-section class="bg-primary text-white">
                    <div class="text-subtitle1">#: {{activity.numero}}</div> 
                   <div class="text-subtitle2">Name: {{activity.nombre}}</div>   
                    <div class="text-subtitle3">Description: {{activity.descripcion}}</div>  
                     
                  </q-card-section>
                   <q-separator/>  
                     <q-card-actions align="right">
               <q-btn flat color="blue" @click="VerActividad(activity)">View Activity</q-btn>
               <q-btn flat color="red" @click="Delete(activity)">Delete</q-btn>
          
      </q-card-actions>
                  
                  </q-card>
             </div>


          </div>
          </q-card-section>
          
        </q-responsive>
      </q-card>

      <q-card flat bordered class="col">   

        <q-item>
             <q-item-section>
             <q-item-label  v-if="mostraractividad" >{{mostraractividad.nombre}}</q-item-label>       
             </q-item-section>
           

         </q-item>

        <q-separator />

        <q-responsive :ratio="1/4">
          <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
          <q-card-section class="border-radius-inherit flex flex-right bg-grey-1">
            <div class="q-pa-md" style="max-width: 450px"  v-if="mostraractividad">
             <q-list>
             <q-item>
             <q-item-section>
             <q-item-label> Activity Name: {{mostraractividad.nombre}}</q-item-label>
             <q-item-label caption lines="2" >Description: {{mostraractividad.descripcion}}</q-item-label>
             </q-item-section>
             <q-item-section side top>
             <q-btn size="12px" flat dense round icon="edit" @click="ModificarActividad(mostraractividad)" />        
             </q-item-section>
             </q-item>
             </q-list>
                   <q-separator spaced inset />
              <div class="q-pa-md" style="max-width: 400px">
   <q-item>
        <q-item-section>
          <q-item-label>Activity Content </q-item-label>
         
        </q-item-section>

        <q-item-section side top>
           <q-btn size="12px" flat dense round icon="add" @click="promptcontenido = true"/>
        
         </q-item-section>
      </q-item>
              </div>

   <div div v-for="contenido in mostraractividad.contenidos" v-bind:key="contenido.id">
  <div class="q-pa-md" style="max-width: 400px">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label> {{contenido.cuerpo}}</q-item-label>
          </q-item-section>

        <q-item-section side top>
           <q-btn size="12px" flat dense round icon="edit" @click= "EditContent(contenido)" />
         <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="DeleteConten(contenido)" />
        </q-item-section>
      </q-item>
      </q-list>
     
      </div>
              </div>
               <q-separator spaced inset />
    <div class="q-pa-md" style="max-width: 400px">
   <q-item>
        <q-item-section>
          <q-item-label>Videos</q-item-label>
         
        </q-item-section>

        <q-item-section side top>
           <q-btn size="12px" flat dense round icon="add" @click="promptvideo = true"/>
        
         </q-item-section>
      </q-item>
              </div>
               <div div v-for="vid in mostraractividad.videos" v-bind:key="vid.id">
            <div class="q-pa-md" style="max-width: 400px">
             <q-list>
             <q-item>
           <q-item-section>
          <q-item-label>Name : {{vid.nombre}}</q-item-label>
          <q-item-label caption lines="2" >Link:  {{vid.link}}</q-item-label>
          
        </q-item-section>

        <q-item-section side top>
           <q-btn size="12px" flat dense round icon="edit" @click="EditVideo(vid)" />
         <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="DeleteVideo(vid)" />
        </q-item-section>
      </q-item>
      </q-list>
      
      </div>
              </div>
              <q-separator/>
              <div class="q-pa-md" style="max-width: 400px">
   <q-item>
        <q-item-section>
          <q-item-label >Documents</q-item-label>
         
        </q-item-section>

        <q-item-section side top>
           <q-btn size="12px" flat dense round icon="add" @click="promptdocumento = true"/>
        
         </q-item-section>
      </q-item>
              </div>
              <div div v-for="doc in mostraractividad.documentos" v-bind:key="doc.id">
         <div class="q-pa-md" style="max-width: 400px">
          <q-list>
         <q-item>
          <q-item-section>
          <q-item-label>Name : {{doc.nombre}}</q-item-label>
          <q-item-label caption lines="2" >Link: {{doc.link}}</q-item-label>
        </q-item-section>

        <q-item-section side top>
           <q-btn size="12px" flat dense round icon="edit" @click="EditDocumento(doc)" />
         <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="DeleteDocumento(doc)"/>
        </q-item-section>
      </q-item>
      </q-list>
     
      </div>

       </div>
 <q-separator spaced inset />
              <div class="q-pa-md" style="max-width: 400px">
          <q-item>
        <q-item-section>
          <q-item-label>Test</q-item-label>
         
        </q-item-section>

        <q-item-section side top>
         
        
         </q-item-section>
      </q-item>
              </div>
              <div class="q-pa-md" style="max-width: 400px">
   <q-item>
        <q-item-section>
          <q-item-label>Questionary</q-item-label>
         
        </q-item-section>

        <q-item-section side top>
           <q-btn size="12px" flat dense round icon="add" @click='promptprueba=true'/>
        
         </q-item-section>
      </q-item>
              </div>
              <div div v-for="preghtm in mostraractividad.preguntas_html" v-bind:key="preghtm.id">
  <div class="q-pa-md" style="max-width: 400px">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Question : {{preghtm.pregunta}}</q-item-label>
          <q-item-label caption lines="2" >Answer:  {{preghtm.respuesta}}</q-item-label>
           <q-item-label caption lines="2" >Value:  {{preghtm.punto}}</q-item-label>
        </q-item-section>

        <q-item-section side top>
           <q-btn size="12px" flat dense round icon="edit" @click="EditQuestion(preghtm)" />
         <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="DeleteQuestion(preghtm)"/>
        </q-item-section>
      </q-item>
      </q-list>
    
      </div>
             </div>
               <q-separator spaced inset />
             <div class="q-pa-md" style="max-width: 400px">
   <q-item>
        <q-item-section>
          <q-item-label>Homework</q-item-label>
         
        </q-item-section>

        <q-item-section side top>
           <q-btn size="12px" flat dense round icon="add" @click= 'promphomework=true' />
        
         </q-item-section>
      </q-item>
      </div>
  <div div v-for="actext in mostraractividad.actividades_extraclases" v-bind:key="actext.id">
  <div class="q-pa-md" style="max-width: 400px">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label >Training : {{actext.orientacion}}</q-item-label>
          <q-item-label caption lines="2" >Document Url:  {{actext.documentos}}</q-item-label>
           <q-item-label caption lines="2" >Question value:  {{actext.punto}}</q-item-label>
           <q-item-label caption lines="2" >Delivery date:  {{actext.fecha_entrega}}</q-item-label>
        </q-item-section>

        <q-item-section side top>
           <q-btn size="12px" flat dense round icon="edit" @click="EditHomework(actext)" />
         <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="DeleteHomework(actext)"  />
        </q-item-section>
      </q-item>
      </q-list>
     
      </div>
      </div>
       <q-separator spaced inset />

<q-dialog v-model="promptvideo" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Video</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input color="blue" filled v-model="nombrevideo" placeholder="Video Name">
        <template v-if="nombrevideo" v-slot:append>
          <q-icon name="cancel" @click.stop="nombrevideo = null" class="cursor-pointer" />
        </template>
      </q-input>
      
     <q-input color="blue" filled v-model="linkvideo" placeholder="Video Link">
        <template v-if="linkvideo" v-slot:append>
          <q-icon name="cancel" @click.stop="linkvideo = null " class="cursor-pointer" />
        </template>
      </q-input>
     
       
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn flat label="Add video" color="blue" v-close-popup @click="EditActivity(mostraractividad)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="prompteditvideo" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Edit Video</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input color="blue" filled v-model="nombrevideo" placeholder="Video Name">
        <template v-if="nombrevideo" v-slot:append>
          <q-icon name="cancel" @click.stop="nombrevideo = null" class="cursor-pointer" />
        </template>
      </q-input>
      
     <q-input color="blue" filled v-model="linkvideo" placeholder="Video Link">
        <template v-if="linkvideo" v-slot:append>
          <q-icon name="cancel" @click.stop="linkvideo = null " class="cursor-pointer" />
        </template>
      </q-input>
     
       
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn flat label="Save" color="blue" v-close-popup @click="EditarVideo()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="promptcontenido" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
           <div class="text-h6">Add Contect</div>    
             <q-input v-model="editorcontenido"
      filled
      type="textarea"  placeholder="Contect"
    />       
                 
        </q-card-section>
      
          <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn flat label="Add Content" color="blue" v-close-popup @click="EditActivity(mostraractividad)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="prompteditcontenido" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
           <div class="text-h6">Edit Contect</div>    
             <q-input v-model="editorcontenidoedit"
      filled
      type="textarea"  placeholder="Contect"
    />       
                 
        </q-card-section>
      
          <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn flat label="Edit Content" color="blue" v-close-popup @click="EditarContent()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  
 <q-dialog v-model="promptdocumento" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Document</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input color="blue" filled v-model="nombredocumento" placeholder="Document Name">
        <template v-if="nombredocumento" v-slot:append>
          <q-icon name="cancel" @click.stop="nombredocumento = null" class="cursor-pointer" />
        </template>
      </q-input>
      
     <q-input color="blue" filled v-model="linkdocumento" placeholder="Document link">
        <template v-if="linkdocumento" v-slot:append>
          <q-icon name="cancel" @click.stop="linkdocumento = null" class="cursor-pointer" />
        </template>
      </q-input>
       
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn flat label="Add Document" v-close-popup color="blue" @click="EditActivity(mostraractividad)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="prompteditdocumento" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Edit Document</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input color="blue" filled v-model="nombredocumento" placeholder="Document Name">
        <template v-if="nombredocumento" v-slot:append>
          <q-icon name="cancel" @click.stop="nombredocumento = null" class="cursor-pointer" />
        </template>
      </q-input>
      
     <q-input color="blue" filled v-model="linkdocumento" placeholder="Document link">
        <template v-if="linkdocumento" v-slot:append>
          <q-icon name="cancel" @click.stop="linkdocumento = null" class="cursor-pointer" />
        </template>
      </q-input>
       
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn flat label="Save" v-close-popup color="blue" @click="EditarDocumento()" />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="promptprueba" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Question</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input color="blue" filled v-model="nombrepregunta" placeholder="Question">
        <template v-if="nombrepregunta" v-slot:append>
          <q-icon name="cancel" @click.stop="nombrepregunta = null" class="cursor-pointer" />
        </template>
        </q-input>    
      

    <div class="q-gutter-sm">
      <q-radio v-model="shape" val="true" label="True" />
      <q-radio v-model="shape" val="false" label="False" />
       <q-input color="blue" filled v-model="valuequestion" placeholder="Question Value">
        <template v-if="valuequestion" v-slot:append>
          <q-icon name="cancel" @click.stop="valuequestion = null" class="cursor-pointer" />
        </template>
      </q-input>
      
    </div>    
       
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn flat label="Add Question" color="blue" v-close-popup @click="EditActivity(mostraractividad)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="prompteditquestion" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Edit Question</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input color="blue" filled v-model="nombrepregunta" placeholder="Question">
        <template v-if="nombrepregunta" v-slot:append>
          <q-icon name="cancel" @click.stop="nombrepregunta = null" class="cursor-pointer" />
        </template>
        </q-input>    
      

    <div class="q-gutter-sm">
      <q-radio v-model="shape" val="true" label="True" />
      <q-radio v-model="shape" val="false" label="False" />
       <q-input color="blue" filled v-model="valuequestion" placeholder="Question Value">
        <template v-if="valuequestion" v-slot:append>
          <q-icon name="cancel" @click.stop="valuequestion = null" class="cursor-pointer" />
        </template>
      </q-input>
      
    </div>    
       
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn flat label="Save" color="blue" v-close-popup @click="EditarHomework()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

   <q-dialog v-model="promphomework" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Homework</div>
            <q-input
      v-model="editortarea"
      filled
      type="textarea"  placeholder="Trainig"
    />         
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input color="blue" filled v-model="homeworkdoc" placeholder="Dir url of the document">
         <template v-if="homeworkdoc" v-slot:append>
          <q-icon name="cancel" @click.stop="homeworkdoc = null" class="cursor-pointer" />
        </template>
       
        </q-input>  
         <q-input color="blue" filled v-model="homeworknota" placeholder="Question Value">
         <template v-if="homeworknota" v-slot:append>
          <q-icon name="cancel" @click.stop="homeworknota = null" class="cursor-pointer" />
        </template>
       
        </q-input>  
         <p>Delivery Date </p> 
           <div class="q-gutter-md row items-start">
     <q-date
        v-model="date"
        minimal
      />
    </div>     
       
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn flat label="Add Homework" color="blue" v-close-popup @click="EditActivity(mostraractividad)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    
   <q-dialog v-model="promptedithomework" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Edit Homework</div>
            <q-input
      v-model="editortarea"
      filled
      type="textarea"  placeholder="Trainig"
    />         
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input color="blue" filled v-model="homeworkdoc" placeholder="Dir url of the document">
         <template v-if="homeworkdoc" v-slot:append>
          <q-icon name="cancel" @click.stop="homeworkdoc = null" class="cursor-pointer" />
        </template>
       
        </q-input>  
         <q-input color="blue" filled v-model="homeworknota" placeholder="Question Value">
         <template v-if="homeworknota" v-slot:append>
          <q-icon name="cancel" @click.stop="homeworknota = null" class="cursor-pointer" />
        </template>
       
        </q-input>  
         <p>Delivery Date </p> 
           <div class="q-gutter-md row items-start">
     <q-date
        v-model="date"
        minimal
      />
    </div>     
       
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="green" v-close-popup />
          <q-btn flat label="Save" color="blue" v-close-popup @click="EditarHomework()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="confirmcontent" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are shure to delete this Content {{mensajeborrar}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click = "BorrarContenido()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> 

      <q-dialog v-model="confirmvideo" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are shure to delete this Video {{mensajeborrar}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click = "BorrarVideo()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> 

     <q-dialog v-model="confirmdocumento" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are shure to delete this Document {{mensajeborrar}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click = "BorrarDocumento()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> 
     <q-dialog v-model="confirmquestion" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are shure to delete this Question {{mensajeborrar}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click = "BorrarQuestion()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> 
     
     <q-dialog v-model="confirmhomework" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are shure to delete this Homework {{mensajeborrar}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click = "BorrarHomework()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> 

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
       editor: '',
      editortarea: "",
       editorcontenido:"",
       nivelcontenido:"",
      promptvideo:false,
      promptdocumento:false,
      promptprueba: false,
      promphomework:false,
      promptoptionprueba: false,
      promptcontenido: false,
      //Edit Content
      prompteditcontenido: false,
      editorcontenidoedit: "",
      contenidoeditar: null,
      ////
      promptdateactivity: false,
      nombrepregunta:'',
      nombrevideo:'',
      linkvideo:'',
      nombredocumento:'',
      linkdocumento:'',
      homeworkdoc:'',
      shape:'true',
      optiontest: 'true',
      nombreactividad:'',
      unvideo: null, 
      undocumento:null, 
      unaevaluacion:null, 
      unapreguntahtml:null,
      unaactividadextraclase:null,
      uncontenido: null,
      valuequestion: 0, 
      date:"", 
      levelvideo:'', 
      homeworknota:'',
      slide: 1,
      description: "",
      dateedit:'',
      //Actividad
      nombreactivity: "",
      notaactivity: '',
      numeroactividad:'',
      editoractivity: "",
      editaractividad: false,
      actividadsalvada: false,
       mostraractividad: null,
      //Delete Activity
       confirm: false,
       mensajeborrar: "",
       idactivityseleccionada: 0,
       mensajeeditar: false,
       //Delete Content
       confirmcontent: false,
       iddeletecontenido: 0,
       //Edit Video
       prompteditvideo: false,
       videoeditar: null,
       //Delete video
       confirmvideo: false,
       idborrarvideo: 0,
       //Edit Documento
       prompteditdocumento: false,
       documentoeditar: null,
       //Borrar documento
       confirmdocumento: false,
       idborrardocumento: 0,
       //Edit Question 
       prompteditquestion: false,
       questioneditar: null,
       // Borrar Question
        confirmquestion: false,
       idborrarquestion: 0,
       //Edit Homework
        promptedithomework: false,
        homeworkeditar: null,
        // Borrar Homework
        confirmhomework: false,
        idborrarhomework: 0,


      
      activities: api.get('/actividad/allbyIdClase/'+ this.$route.params.clasid,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.activities = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
     
      
     
      
    }
  },
   methods:{
     AddActivity(){
        this.numeroactividad = "";
       this.nombreactivity = "";
       this.editoractivity = "";
       this.promptdateactivity = true;
      

     },
    async AddActividad(){
       await api.post('actividad',
       {
         numero: this.numeroactividad,
         nombre: this.nombreactivity,
        
         descripcion: this.editoractivity,
         clase: this.$route.params.clasid,
         
       },{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}
       ).then(response => (this.activities = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
    await api.get('/actividad/allbyIdClase/'+this.$route.params.clasid,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.activities = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }))
       
         
         this.clase= 0;
          this.numeroactividad = "";
       this.nombreactivity = "";
       this.editoractivity = "";
     },
     ModificarActividad(mostraractividad){
      
        this.numeroactividad = mostraractividad.numero;
        this.nombreactivity = mostraractividad.nombre;
       
        this.editoractivity = mostraractividad.descripcion;
        this.editaractividad=true;
        this.promptdateactivity= true;
       

         

     },
     Delete(activity){
       
      this.confirm = true;
      this.idactivityseleccionada = activity.id;
      this.mensajeborrar = activity.nombre;

    },
    DeleteConten(contenido){     
       this.iddeletecontenido= contenido.id;
       this.mensajeborrar = contenido.id;
        this.confirmcontent= true;

    },
    async BorrarContenido(){
       await api.delete('/contenido/'+ this.iddeletecontenido,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.mensajeconsulta = response,this.$q.notify({
        type: 'positive',
        message: 'Content was delete'
      }) ))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),

     await  api.get('/actividad/allbyIdClase/'+ this.$route.params.clasid,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.activities = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       this.idactivityseleccionada = 0;
       this.mostraractividad = null;
       this.mensajeborrar = ""; 
      
    },
       async BorrarActividad(){
     
      await api.delete('/actividad/'+ this.idactivityseleccionada,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.mensajeconsulta = response,this.$q.notify({
        type: 'positive',
        message: 'Activity was delete'
      }) ))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),

     await  api.get('/actividad/allbyIdClase/'+ this.$route.params.clasid,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.activities = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       this.idactivityseleccionada = 0;
      


    },
    async VerActividad(activity){       
       this.mostraractividad  = null;
      await api.get('/actividad/allbyIdClase/'+ this.$route.params.clasid,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.activities = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      }));
       for(let i = 0; i< this.activities.length; i++ ){
         if(this.activities[i].id === activity.id){
            this.mostraractividad = activity;
          
         }
       }
      
     },
   async  EditActivity(mostraractividad){
   let valrespuesta = false;
   if(this.shape ==="true"){
     valrespuesta = true;
   }
 
    await api.patch('/actividad/'+mostraractividad.id,{
       nombre: this.nombreactivity,
       nota: this.notaactivity,
       numero: this.numeroactividad,
       descripcion: this.editoractivity,
       videos:[{nombre:this.nombrevideo,link: this.linkvideo, actividad: mostraractividad.id }],
       documentos:[{nombre: this.nombredocumento,link: this.linkdocumento, actividad: mostraractividad.id}],
       contenidos:[{cuerpo: this.editorcontenido,  actividad: mostraractividad.id}],
       preguntas_html:[{punto: this.valuequestion, pregunta: this.nombrepregunta,respuesta: valrespuesta, actividad: mostraractividad.id }],
       actividades_extraclases: [{orientacion: this.editortarea,documentos: this.homeworkdoc,punto: this.homeworknota,fecha_entrega: this.date,  actividad: mostraractividad.id}],

          }, {
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.mostraractividad = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
        await  api.get('/actividad/allbyIdClase/'+ this.$route.params.clasid,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.activities = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
      this.editor= '';
      this.editortarea= "";
       this.editorcontenido= "";
      
      this.nombrevideo='';
      this.linkvideo='';
       this.valuequestion= 0; 
      this.date=""; 
     
      this.homeworknota='';  
         
      this.editaractividad=false;
       this.shape = "true";

       this.nombredocumento= "";
       this.linkdocumento= "";
      
     
       this.nombrepregunta = ""; 
      this.numeroactividad= "";
      this.nombreactivity = "";
        
        this.editoractivity = "";
        
 },
 EditContent(contenido){
   this.editorcontenidoedit = contenido.cuerpo;
   this.prompteditcontenido = true;
   this.contenidoeditar = contenido;
   
 },
 async EditarContent(){
    this.contenidoeditar.cuerpo =  this.editorcontenidoedit;
  await api.patch('/contenido/'+ this.contenidoeditar.id, this.contenidoeditar,  {
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
} ).then(response => (this.mensajeeditar = response.data))
 .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
    this.mensajeeditar = false;
    this.contenidoeditar  = null;
    this.editorcontenidoedit = "";
     this.mostraractividad = null;


 },
 EditVideo(video){
    this.nombrevideo = video.nombre;
      this.linkvideo= video.link;
      this.videoeditar = video;
   this.prompteditvideo = true;
 },
  async EditarVideo(){

    this.videoeditar.link = this.linkvideo;
    this.videoeditar.nombre = this.nombrevideo;
    
  await api.patch('/video/'+ this.videoeditar.id, this.videoeditar,  {
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
} ).then(response => (this.mensajeeditar = response.data))
 .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
     this.nombrevideo = "";
      this.linkvideo= "";
      this.videoeditar = null;
   this.prompteditvideo = false;


 }, 
  DeleteVideo(video){
     
       this.idborrarvideo= video.id;

       this.mensajeborrar = video.nombre;
        this.confirmvideo= true;      

    },
        async BorrarVideo(){
       await api.delete('/video/'+ this.idborrarvideo,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.mensajeconsulta = response,this.$q.notify({
        type: 'positive',
        message: 'Video was delete'
      }) ))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),

     await  api.get('/actividad/allbyIdClase/'+ this.$route.params.clasid,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.activities = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       this.idborrarvideo= 0;

       this.mensajeborrar = "";
        this.confirmvideo= false; 
         this.mostraractividad = null;     

      
    },
    EditDocumento(documento){
    this.nombredocumento = documento.nombre;
      this.linkdocumento= documento.link;
      this. documentoeditar = documento;
   this. prompteditdocumento = true;

  
 },
 async EditarDocumento(){

    this.documentoeditar.link = this.linkdocumento;
    this.documentoeditar.nombre = this.nombredocumento;
    
  await api.patch('/documento/'+ this.documentoeditar.id, this.documentoeditar,  {
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
} ).then(response => (this.mensajeeditar = response.data))
 .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
      this.nombredocumento = "";
      this.linkdocumento= "";
      this. documentoeditar = null;
   this. prompteditdocumento = false;


 },
 DeleteDocumento(documento){
        
       this.idborrardocumento= documento.id;

       this.mensajeborrar = documento.nombre;
        this.confirmdocumento= true;      

    },
        async BorrarDocumento(){
       await api.delete('/documento/'+ this.idborrardocumento,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.mensajeconsulta = response,this.$q.notify({
        type: 'positive',
        message: 'Document was delete'
      }) ))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),

     await  api.get('/actividad/allbyIdClase/'+ this.$route.params.clasid,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.activities = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       this.idborrardocumento= 0;

       this.mensajeborrar = "";
        this.confirmdocumento = false; 
             

      
    },
    // Questions
     EditQuestion(question){
       debugger
      this.nombrepregunta = question.pregunta;
      if(question.respuesta==="true"){
         this.shape= "true";
      }
      else {
        this.shape = "false";
      }
      this.valuequestion = question.punto;
   this. prompteditquestion = true;
   this.questioneditar = question;

  
 },
 async EditarQuestion(){

    this.questioneditar.pregunta = this.nombrepregunta ;
    this.questioneditar.respuesta = this.shape;
    this.questioneditar.punto =  this.valuequestion;
  await api.patch('/pregunta-html/'+ this.questioneditar.id, this.questioneditar,  {
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
} ).then(response => (this.mensajeeditar = response.data))
 .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       this.nombrepregunta = "";
      this.shape= true;
      this.valuequestion =0;
   this. prompteditquestion = false;



 },
 DeleteQuestion(question){
        
       this.idborrarquestion= question.id;

       this.mensajeborrar = question.pregunta;
        this.confirmquestion = true;      

    },
        async BorrarQuestion(){
       await api.delete('/pregunta-html/'+ this.idborrarquestion,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.mensajeconsulta = response,this.$q.notify({
        type: 'positive',
        message: 'Question was delete'
      }) ))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),

     await  api.get('/actividad/allbyIdClase/'+ this.$route.params.clasid,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.activities = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       this.idborrardocumento= 0;

       this.mensajeborrar = "";
        this.confirmquestion = false; 
             

      
    },

    // Homework
      EditHomework(homework){

      this.editortarea =  homework.orientacion;
    this.homeworkdoc =  homework.documentos ;
      this.homeworknota=  homework.punto ;
      this.date= homework.fecha_entrega;    
     
   this. promptedithomework = true;
   this.homeworkeditar = homework;

  
 },
 async EditarHomework(){

    this.homeworkeditar.orientacion = this.editortarea;
    this.homeworkeditar.documentos = this.homeworkdoc;
    this.homeworkeditar.punto =  this.homeworknota;
    this.homeworkeditar.fecha_entrega =  this.date;
  await api.patch('/actividad-extraclase/'+ this.homeworkeditar.id, this.homeworkeditar,  {
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
} ).then(response => (this.mensajeeditar = response.data))
 .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
      this.editortarea = "";
     this.homeworkdoc = "";
     this.homeworknota = 0;
      this.date = new Date();
   this. promptedithomework = false;



 },
 DeleteHomework(homework){
        
       this.idborrarhomework= homework.id;

       this.mensajeborrar = homework.orientacion;
        this.confirmhomework = true;      

    },
        async BorrarHomework(){
       await api.delete('/actividad-extraclase/'+ this.idborrarhomework,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.mensajeconsulta = response,this.$q.notify({
        type: 'positive',
        message: 'Question was delete'
      }) ))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),

     await  api.get('/actividad/allbyIdClase/'+ this.$route.params.clasid,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
  }
}).then(response => (this.activities = response.data))
      .catch(error =>  this.$q.notify({
        type: 'negative',
        message: error.response.data.message
      })),
       this.idborrarhomework= 0;

       this.mensajeborrar = "";
        this.confirmhomework = false; 
             

      
    }
   
   
    
}
}
</script>