<template>
  <div class="q-pa-md">
    <div class="row items-start q-gutter-md">
      <q-card flat bordered class="col">
        <q-item>
         

          <q-item-section>
            <q-item-label>Question</q-item-label>
           
          </q-item-section>
           <q-item-section side top>
           <q-btn  size="12px" flat dense round icon="add" @click="AddQuestion()"/>        
            </q-item-section>
        </q-item>

        <q-separator />

        <q-responsive :ratio="1">
          <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
          <q-card-section class="border-radius-inherit flex flex-center bg-grey-1">
          
          </q-card-section>
        </q-responsive>
      </q-card>
     <q-dialog v-model="promptquestiontype" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are shure to delete this module</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click = "" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> 

    </div>
     
  </div>
     
</template>

<script>
export default {
  data () {
    return {
      slide: 1,
      promptquestiontype: false,

    }
  },
   methods:{
    AddQuestion(){
        this.promptquestiontype = true;

    }   
   }
}
</script>