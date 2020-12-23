<template>
  <div class="home" >
    <v-container  >
        <h2 class="ma-4">Things To Do </h2>
        <v-layout >
          
          
        
          
              <v-flex row wrap  class="mx-auto">
                  <BlogCard 
                  :name="event.name" 
                  :location="event.location"  
                  :src="event.imgSrc" xs12 md10  
                  class="my-2 mx-4 " 
                  v-for="event in events"
                  :key='event.id' ></BlogCard>

              </v-flex>
      
       
      </v-layout >
       
    </v-container>
    
  </div>
</template>

<script>

import BlogCard from '@/components/BlogCard';
import  db  from '@/firebase.js';


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
  
  methods:{
     logcon : function(){
        console.log(this.events);
      }
 
  },
  created () {
      db.collection('events').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        
              this.events.push(doc.data()) ;

        //const data = {}
      })

    })
     

    
  

  }
  }
  
     
  
 

</script>
<style scoped>
.paka{
  margin: 0px 50px;
}

</style>