<template>
    <v-container>
        <v-alert
      outlined
      v-bind:type="mtype"
      text
      :value="alert"
    >
    {{message}}
    </v-alert>
    
        <h2>Users</h2>
        <v-dialog
        v-model="dialog"
            width="500px">
             <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
          class="ma-4"
        >
          Add New Admin
        </v-btn>
      </template>
            
            <v-card>
                <v-card-title>
                    Make an Admin
                </v-card-title>
                <v-card-text>
                    <v-text-field label="User" v-model="email"></v-text-field>
                    <v-btn @click.prevent="addAdminRole" @click.stop="dialog = false">Add</v-btn>
                    <v-btn @click.prevent="dialog = false">Close</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
         <v-data-table
                        :headers="headers"
                        :items="users"
                        :items-per-page="5"
                        class="elevation-1"
                    >
                    
                    </v-data-table>
    </v-container>
</template>

<script>
import firebase from 'firebase';
import {db} from '@/firebase.js';
const functions = firebase.functions();
export default {

    components:{},
     data () {
        return {
            dialog:false,
            mtype:null,
            message:'',
            alert:false,
            email:null,
            headers:[
                {text:'Name', value:'name' },
                {text:'Email', value:'email' },
               
                
            ],
            users:[]
        }
    },
    methods:{
            initData:function(){
            
        db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
           
            this.users.push(doc.data()) ;
            
         
      })

    }).catch(err =>{
        console.log(err);
    });
    },
         
         addAdminRole: function(){
           const addAdminRole = functions.httpsCallable('addAdminRole');
           addAdminRole({email : this.email.email}).then( result => {
               console.log(result);
               if(result.data.message){
                   this.message = result.data.message;
                    this.alert = true ;
                    this.mtype = 'success'
                    var self = this;
                    setTimeout(function(){ self.alert = false; }, 3000);
               }else{
                   var self1 = this;
                   this.message = result.data.errorInfo.message;
                    this.alert = true ;
                    this.mtype = 'warning'
                    
                    setTimeout(function(){ self1.alert = false; }, 3000);

                   
               }
           })
           
        }

    },
    created(){
        this.initData();
    }
}
</script>