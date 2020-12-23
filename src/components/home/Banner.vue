<template>
    <v-container  >
      <v-carousel
    
    >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade"
        transition="fade"
      ></v-carousel-item>
    </v-carousel>
    </v-container>
</template>

<script>
export default {
  data(){
    return {
    items: [
        {
          src:  require('@/assets/home/img1.jpg')
        },
        {
          src: require('@/assets/home/img2.jpg')
        },
        {
          src: require('@/assets/home/img3.jpg')
        },
        {
          src: require('@/assets/home/img4.jpg')
        }
      ]
    }
  }
}
</script>