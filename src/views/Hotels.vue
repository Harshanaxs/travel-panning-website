<template>

        <v-container  >
        <v-layout class="my-4" v-for="(hotels,location) in groups"  :key="location.id"  >
        <v-card>
          <v-card-title>
            <h3>{{location}}</h3>
          </v-card-title>
          <v-card-text>
             <v-flex row wrap  class="ml-4 mr-4 ">
                  <BlogCard  :name="hotel.name" 
                  :starRating="hotel.starRating" 
                  :desc="hotel.desc"
                  :src="hotel.imgSrc" xs12 md10  
                  :description="hotel.discription"
                  :items="hotel.gallery"
                  :price="hotel.averagePrice"
                  class="my-2 mr-4 ml-4 "  
                  v-for="hotel in hotels" 
                  :key="hotel.id"
                   ></BlogCard>

              </v-flex>
          </v-card-text>
        </v-card>
       
           
        </v-layout >
       
    </v-container>
   
</template>

<script>

import BlogCard from '@/components/BlogCard';
import  {db}  from '@/firebase.js';


export default {
    name:'Hotels',
    components:{BlogCard},

    data () {
        return {
        hotels:[],
      

        }
    },
    computed :{
      xhotels (){
        return  this.$store.getters.loadedH ;
      },
      groups(){
        function groupBy(array, key){
  const result = {}
  array.forEach(item => {
    if (!result[item[key]]){
      result[item[key]] = []
    }
    result[item[key]].push(item)
  })
  return result
}
    return groupBy(this.hotels, 'location')
  }

    },
    methods:{

      

    },

    created (){
    db.collection('hotels').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        //console.log(doc.data());
              this.hotels.push(doc.data()) ;

        //const data = {}
      })

    })
   

    }
}
</script>