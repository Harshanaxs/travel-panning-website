<template>
    <v-container>
        <h2>Hotels</h2>
          <v-dialog
            width="500px">
             <template v-slot:activator="{ on }">
        <v-btn
          color="green "
          dark
          v-on="on"
          class="ma-2"
        >
          Add New Hotel
        </v-btn>
      </template>
            
            <v-card>
                <v-card-title>
                    Add New Hotel
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Name" v-model="hotel.name"></v-text-field>
                    <v-text-field label="Location" v-model="hotel.location"></v-text-field>
                    <v-text-field label="Average Price $" v-model="hotel.avgPrice"></v-text-field>
                    
                     
                    <v-card-text> Star Rating</v-card-text>
                        <v-rating
                        label="Star Rating"
                        color="yellow darken-3"
                        half-increments
                        hover
                        large
                        ></v-rating>
                      
                   
                    <v-file-input  label="Featured Image"></v-file-input>
                     <v-file-input multiple label="Gallery Images"></v-file-input>

                    
                   
                    <v-btn @click.prevent="addNewHotel">Add</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
        
        <v-data-table
        :headers="headers"
        :items="hotels"
        item-key="id"
        

        >
         <template v-slot:item.id="{ item }">
        <v-dialog
            width="500px">
             <template v-slot:activator="{ on }">
        <v-btn
          color="green lighten-2"
          dark
          v-on="on"
            v-model="item.id" @click="editHotel(item)" class="mx-2 info "
        >
          Edit
        </v-btn>
      </template>
            
            <v-card>
                <v-card-title>
                    Edit Hotel
                </v-card-title>
                <v-card-text>
                    <v-text-field label="User" v-model="hotel.name"></v-text-field>
                    <v-text-field label="User" v-model="hotel.location"></v-text-field>
                   
                    <v-btn @click.prevent="addNewHotel">Add</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>     
             
        <v-btn v-model="item.id" @click="removeHotel(item)" class="mx-2 danger" >Delete</v-btn>

      </template>

        </v-data-table>
    </v-container>
</template>

<script>

import db from '@/firebase.js'
export default {
    name:'locations',
    components:{},
    data () {
        return {
            hotel:{
                name:null,
                location:null
            },
            headers:[
               {
                   text:'Hotel'  ,
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
            hotels:[]

            
        }
    },
    methods:{
        addNewHotel : function(){
            this.hotel = {
                name:null,
                location:null
            };
            this.hotels.push(this.hotel);
        },
        removeHotel : function(hotel){
            this.hotels.splice(this.hotels.indexOf(hotel), 1);
        },
        editHotel : function(hotel){
            this.hotel = hotel
        }
    },
    created () {
    db.collection('hotels').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
          
            this.hotels.push(doc.data()) ;
            console.log(this.hotels);

      })

    }).catch(err =>{
        console.log(err);
    });
    }
    //}
    
}
</script>