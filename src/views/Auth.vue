<template>
    <v-container >
            <h3 class="text-center"> 
                Loged In For Plan Your Journey
            </h3>
        
            <v-flex justify-center row wrap class="mt-4">
            <Login class="md4 mr-4 pa-4 tile"></Login>
            <SignUp class="md4 ml-4 pa-4 tile "></SignUp>
        
            </v-flex>

    
    </v-container>
</template>


<script>
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';

export default {
    name:'Auth',
    components:{
        Login,
        SignUp
    }
}
</script>