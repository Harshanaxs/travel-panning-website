<template>
  <v-data-table
    :headers="headers"
    :items="destinations"
    sort-by="location"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Destinations</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >Add New Destination</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.name" label="Destination Name"></v-text-field>
                  </v-col>
                
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.brief" label="Caption"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.disctiption" label="Description"></v-text-field>
                  </v-col>
                  
                  <v-col v-if="imgField" cols="12" sm="6" md="6">
                      <input type="file" @change="uploadImage">
                  </v-col>
                  <v-col v-if="imgField" cols="12" sm="6" md="6">
                    <input type="file" multiple @change="uploadImageGallery" >
                  </v-col>
                
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    
  </v-data-table>
</template>

<script>

import {db,fb} from '@/firebase.js'

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'data.name',
        },
        
        { text: 'Caption', value: 'data.brief' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      destinations: [],
      tempimgSrc:null,
      tempGallery:[],
      editedIndex: -1,
      editedItem:{},
      defaultItem: {
              id:'',
              data:{
              name:'' ,
              location: '',
              address: '',
              starRating: 0,
              averagePrice: 0,
              discription:'',
              }
       }, 
          
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      imgField(){
        return this.editedIndex === -1 ? true : false
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        db.collection('destinations').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            var destination = {
              id : doc.id,
              data:{
              name: doc.data().name,
              location: doc.data().location,
              brief:doc.data().brief,
              discription:doc.data().discription,
             // gallery:doc.data().imgSrc,
              }

            } ;
            this.destinations.push(destination) ;
            console.log(destination);
             this.tempimgSrc = '' ;
            this.tempGallery=[];


      })

    }).catch(err =>{
        console.log(err);
    });
               
      },

      editItem (item) {
        //console.log(this.hotels.indexOf(item));
        this.editedIndex = this.destinations.indexOf(item);
        this.editedItem =  item.data;
        this.dialog = true;
        console.log(item);
      },
           deleteData:function(item){
            const index = this.destinations.indexOf(item);

            console.log(item);
            this.destinations.splice(index, 1);
            db.collection('destinations').doc(item.id).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });

        },

      deleteItem (item) {

   
        confirm('Are you sure you want to delete this item?') && this.deleteData(item);
      },

      close () {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = {};
          this.editedIndex = -1;
        })
      },

      save () {
        if (this.editedIndex > -1) {
         // Object.assign(this.hotels[this.editedIndex], this.editedItem);
         console.log(this.editedItem);
          db.collection('destinations').doc(this.destinations[this.editedIndex].id).update(this.editedItem).then(function(){
           console.log('Success');
           
          })
        } else {
            this.editedItem.imgSrc = this.tempimgSrc ;
            this.editedItem.gallery = this.tempGallery;
          const data = Object.assign({},this.editedItem);
          const newHotel = Object.assign({id:''},{data:data});
          //this.hotels.push(newHotel);
          console.log(newHotel);

          db.collection('destinations').doc().set(this.editedItem).then(()=>{
            console.log('New Destination Added');
            console.log(this.editedItem);
            this.destinations = [] ;
            this.editedItem = {};
            this.initialize();
            this.tempGallery=[];
            this.tempimgSrc=null;



            

          }).catch(err =>{
            console.log(err);
          })
        }
        this.close();
        console.log(this.destinations)
      },
      uploadImage:function(e){
          if(e.target.files[0]){
        let file = e.target.files[0];
        console.log(file);

        var storageRef = fb.storage().ref('destinations/'+file.name);
        let uploadTask = storageRef.put(file);


        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', () =>{
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          console.log('no state change');
        }, () => {
          // Handle unsuccessful uploads
                    console.log('no state change X');

        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            this.tempimgSrc = downloadURL ;
            console.log(this.tempimgSrc)
          });
        });

          }

      },
      uploadImageGallery:function(e){
        let file = e.target.files[0];
        console.log(file);

        var storageRef = fb.storage().ref('destinations/'+file.name);
        let uploadTask = storageRef.put(file);


        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', () =>{
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          console.log('no state change');
        }, () => {
          // Handle unsuccessful uploads
                    console.log('no state change X');

        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            this.tempGallery.push(downloadURL) ;
            console.log(this.tempGallery);
          });
        });


      }
    },
  }
</script>