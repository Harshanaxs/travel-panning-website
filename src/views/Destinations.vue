<template>
    <v-container>
      <v-layout >
        <v-row>
        <v-card>
          
          <v-card-title>Destinations</v-card-title>
          <v-card-text>
            
         <v-flex
                   row wrap 
                   xs12 md10 
                    class="ml-4 mr-4 " >
            <BlogCard 
                  v-for="destination in destinations" 
                  :key="destination.name"
                  :name="destination.name" 
                  :desc="destination.brief"
                  :src="destination.imgSrc" xs12 md10  
                  :items="destination.gallery"
                  :description="destination.disctiption"
                  class="my-2 mr-4 ml-4 "  
                  
                   ></BlogCard> 
          </v-flex>
        

          </v-card-text>
        </v-card>
        </v-row>
        </v-layout>
    </v-container>
  
</template>

<script>
import BlogCard from '@/components/BlogCard.vue'
import  {db}  from '@/firebase.js';

export default {
  components:{
    BlogCard
  },
  data(){
    return {
      destinations:[]
    }
  },
    created (){
    db.collection('destinations').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        //console.log(doc.data());
              this.destinations.push(doc.data()) ;

        //const data = {}
      })

    })
   

    }
}
</script>