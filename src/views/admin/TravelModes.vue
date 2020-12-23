<template>
    <v-container >
                <v-container>
                   <h2 class="mb-8">Travel Modes</h2>
                   <v-btn
                   class="green white--text ma-2"
                   >Add Travel Mode</v-btn>
                    
                   <v-data-table
                        :headers="headers"
                        :items="modes"
                        :items-per-page="5"
                        class="elevation-1"
                    >
                     <template v-slot:item.ctr="{ item }">
                        <v-btn class=" blue  white--text" v-if="item" >Update</v-btn>
                         <v-btn class="red lighten-2  white--text ml-4" v-if="item" >Delete</v-btn>
                    </template>
                     
                    </v-data-table>
                </v-container>



    </v-container>

    
</template>


<script>
export default {
    name : 'TravelModes',
    components :{  } ,
    data (){
        return {
            headers:[
                {
                    text:'Mode',
                    value:'name'
                },
                {
                    text:'Rate',
                    value:'rate'
                },
                 {
                    text:'Controllers',
                    value:'ctr'
                }
            ],
            modes:[
                {
                name:'Bus',
                rate:0.5,
                ctr:null
                },
                 {
                name:'Car',
                rate:1.5,
                ctr:''
                },
                 {
                name:'Jeeo',
                rate:2.5
                }
            ]
        }
    }
    
}
</script>