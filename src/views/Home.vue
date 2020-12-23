<template>
    <div  class="white">
        <banner></banner>
        <mission></mission>
        <about></about>
        
    </div>
    
</template>

<script>
import banner from '@/components/home/Banner.vue'
import about from '@/components/home/subscribe.vue'
import mission from '@/components/home/mission.vue'


export default {
    components:{
        banner,
        about,
        mission,
        
    }
}
</script>