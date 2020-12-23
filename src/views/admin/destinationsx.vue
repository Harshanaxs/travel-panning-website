<template>
    <v-container>
        <h2>Destinations</h2>
        <v-btn color="green" class="right green white--text ma-2">Add Destination</v-btn>
        <v-data-table
        :headers="headers"
        :items="locations"
        item-key="name"
        

        >
         <template v-slot:item.edit="{ item }">
       <v-btn v-model="item.id" @click="addNewLocation" class="mx-2 info ">Edit</v-btn>
        <v-btn v-model="item.id" @click="removeLocation" class="mx-2 danger" >Delete</v-btn>

      </template>

        </v-data-table>
    </v-container>
</template>

<script>
import db from '@/firebase.js'
export default {
    name:'destinations',
    components:{},
    data () {
        return {
            headers:[
               {
                   text:'Destination'  ,
                   value:'location' 
               },
                {
                   text:'Caption'  ,
                   value:'caption' 
               },
                {
                   text:'Description'  ,
                   value:'description' 
               },
                
            ],
            locations:[]   

            
        }
    },
     methods:{
        addNewlocation : function(){
            this.locations.push(this.location);
        },
        removeLocation : function(location){
            this.locations.splice(this.locations.indexOf(location), 1);
        },
        editLocation : function(location){
            this.location = location
        }
    },
        created () {
                   db.collection('locations').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          
              this.locations.push(doc.data()) ;
              console.log(this.locations);

      })

    }).catch(err =>{
        console.log(err);
    });
    }
    
}
</script>