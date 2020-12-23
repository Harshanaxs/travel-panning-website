<template>
    <v-container>
        <h2>Events</h2>
        <v-btn class="right green ma-2">Add Event</v-btn>
        <v-data-table
        :headers="headers"
        :items="destinations"
        item-key="id"
        

        >
         <template v-slot:item.id="{ item }">
       <v-btn v-model="item.id" class="mx-2 info ">Edit</v-btn>
        <v-btn v-model="item.id" class="mx-2 danger" >Delete</v-btn>

      </template>

        </v-data-table>
    </v-container>
</template>

<script>

import db from '@/firebase.js'
export default {
    name:'events',
    components:{},
    data () {
        return {
            headers:[
               {
                   text:'Event'  ,
                   value:'name' 
               },
               {
                   text:'Location',
                   value:'location',
                   //value:'controllers.delete'
               },
                {
                   text:'',
                   value:'id',
                   //value:'controllers.delete'
               }
            ],
            destinations:[]

            
        }
    },
    created () {
                   db.collection('events').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          
              this.destinations.push(doc.data()) ;
              console.log(this.destinations);

      })

    }).catch(err =>{
        console.log(err);
    });
    }
    //}
    
}
</script>