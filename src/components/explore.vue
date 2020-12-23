<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          
          v-bind="attrs"
          v-on="on"
        color="orange"
        text
        >
          Explore
        </v-btn>
      </template>
      
        <v-card width="800px">
            <v-card-title>{{title}}</v-card-title>
  
        <v-card-text class="dark">
            <v-carousel
            cycle
            height="400px"
           
            >
            <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item"
                reverse-transition="fade-transition"
                transition="fade-transition"
            >
            </v-carousel-item>

            </v-carousel>
            <v-container>
                <h3>{{description}}</h3>
            </v-container>
        </v-card-text>
    
            </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
      props:['title','description','items'],
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>
