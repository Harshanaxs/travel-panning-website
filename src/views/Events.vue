<template>
  <div class="home" >
    <v-container  >
        <v-layout  v-for="(events, location) in groups" :key="location.id" class="my-4">
       <v-row>
          <v-card>
          <v-card-title>
                        <h3>{{location}}</h3>

          </v-card-title>
          <v-card-text>
            
            <v-flex row wrap  class="mx-4">
                  <BlogCard 
                  :name="event.name" 
                  :location="event.location"  
                  :src="event.imgSrc" xs12 md10  
                  class="ml-4 mr-4 my-4 " 
                  v-for="event in events"
                  :items="event.gallery"
                  :description="event.discription"
                  :price="event.averagePrice"
                  
                  :key='event.id' ></BlogCard>

              </v-flex>
          </v-card-text>
             
        
       
      
        </v-card>
        
       </v-row>
          
              
       
      </v-layout >
       
    </v-container>
    
  </div>
</template>

<script>

import BlogCard from '@/components/BlogCard';
import  {db}  from '@/firebase.js';


export default {
  name: 'Destinations',

  components: {
    BlogCard
   // Dashboard
    
  },
 

  data: ()=>{
    return{

      events:[],
      locations:[]
           }

  },
  computed:{
   groups(){ function groupBy(array, key){
  const result = {}
  array.forEach(item => {
    if (!result[item[key]]){
      result[item[key]] = []
    }
    result[item[key]].push(item)
  })
  return result
}

    return groupBy(this.events, 'location')
  
}
  },
  
  methods:{
     logcon : function(){
        console.log(this.events);
      }
 
  },
  created () {
      db.collection('events').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        
              this.events.push(doc.data()) ;
              console.log(this.events);

        //const data = {}
      })

    })
     

    
  

  }
  }
  
     
  
 

</script>
<style scoped>


</style>