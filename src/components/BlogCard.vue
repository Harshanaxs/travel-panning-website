<template>
  <v-card
    class="mx-auto"
    width="280px"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="src"
    >
      <v-card-title  style="background: rgba(0, 0, 0, 0.3);color:white; ">{{name}}</v-card-title>
    </v-img>


    <v-card-text class="text--primary">
 <v-chip
      class="ma-2"
      color="orange"
      text-color="white"
      v-if="starRating"
    >
     <v-icon left>mdi-star</v-icon>
      <span class="ma-2">{{starRating}} </span>
     

    </v-chip>
     <v-chip
      class="ma-2"
      color="green darken-2"
      text-color="white"
      v-if="price"
    >
     <div v-if="price > 0" >
       <v-icon >mdi-account-cash</v-icon>
      <span  class="ma-2">$ {{price}} </span>
     </div>
      <span v-if="price == 0" >Free</span>
     

    </v-chip>
      <div>{{desc}}</div>
    </v-card-text>

    <v-card-actions>
     

    <explore :description="description" :title="name" :items="items"></explore>
    </v-card-actions>
  </v-card>
</template>

<script>
import explore from '@/components/explore.vue'
export default {
  props:['name','location','src','price','starRating','desc','description','items'],
  components:{
    explore
  }
    
}
</script>