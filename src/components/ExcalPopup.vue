<template>
    <v-dialog max-width="600px">
        <template v-slot:activator="{ on }">
        <v-btn
          color="success my-4"
          dark
          v-on="on"
        >
        Add New Trip
        </v-btn>
      </template>
        <v-card>
            <v-card-title> Hi there </v-card-title>
            <v-card-text >
                <v-form class="px-3">
                    <v-layout column >
                        <v-flex md-4 >
                        <v-select
                        :items="locations"
                        label="Location"
                        outlined
                        v-model="trip.tlocation"
                        @change="loadHotels()"
                        ></v-select>
                    </v-flex>
                    <v-flex md-4 >
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                        :value="date"
                        v-model="trip.tdate"
                        label="Picker in menu"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="trip.tdate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
                </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md-4 class="mr-4" >
                        <v-select
                        
                        :items="hotels"
                        label="Hotel"
                        return-object
                        item-text="name"
                        outlined
                        
                        v-model="trip.thotel"
                        ></v-select>
                    </v-flex>
                    <v-flex md-4 >
                        <v-select
                        :items="events"
                        label="Events"
                        outlined
                        item-text="name"
                        return-object
                        multiple
                        v-model="trip.tevents"
                        ></v-select>
                    </v-flex>
                    </v-layout>    

                   <v-layout>
                      <v-layout>
                           <v-flex>
                        <v-btn @click="logCon()" class="success">Add</v-btn>
                        </v-flex>
                         <v-flex>
                        <v-btn @click="logCon()" class="danger">Cancel</v-btn>
                        </v-flex>
                      </v-layout>
                   <v-flex>
                       <p>Select Travel Mode and Finish Trip</p>
                        <v-btn @click="distanceCalculate()" class="info">Next</v-btn>

                   </v-flex>
                   </v-layout>
                <v-layout>

                    
                    
                </v-layout>   
               

                </v-form>
                
                   
                
            </v-card-text>
        </v-card>

    </v-dialog>
</template>
<script>
import  {db}  from '@/firebase.js'
export default {
    props:[''],
    data () {
        return {
            apiKey:'AIzaSyB0cs1z8ackoJoX6eEK1F6e8zEoSMTM4oE',
            locations:[],
            hotels:[],
            events:[],
            
           
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            calc:[],
            calcHotel:[],
            trip : {
                tday:0,
                tlocation:null,
                tdate:null,
                thotel:null,
                tevents:[],
                totalDistance:null
                
            }
 

        }
    },
    
    methods:{
        
        logCon:function(){

            this.abc().then((res =>{
                console.log(res);
            //console.log(this.selected);
            //this.$emit('logCon',this.trip);
            //const baseURI =  'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+'var1'+'&destinations='+'var2'+'&key=AIzaSyB0cs1z8ackoJoX6eEK1F6e8zEoSMTM4oE'  ;
            //console.log(baseURI);
            let eventDistance = this.calc.reduce((accumilator,currentValue) => {
                return accumilator + currentValue ;
            },0);

            let hotelDistance = this.calcHotel.reduce((accumilator,currentValue) => {
                return accumilator + currentValue ;
            },0);

             

            console.log(this.calcHotel);
            var totalDistance = eventDistance + hotelDistance ;
            this.trip.totalDistance = totalDistance;
           })).then(() =>{
                //console.log(res2);
            
            
            this.$store.dispatch('addDate', this.trip);
            console.log(this.trip.thotel);
            this.trip = {};
            }).catch(err =>{
                console.log(err);
            });
            

        },
        abc: function(){
            let lastIndex = this.trip.tevents.length - 1;
               const baseURIhotel =  'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+this.trip.thotel.address+'&destinations='+this.trip.tevents[0].address+'|'+this.trip.tevents[lastIndex].address+'&key=AIzaSyB0cs1z8ackoJoX6eEK1F6e8zEoSMTM4oE'  ;
                console.log(baseURIhotel);
                 fetch(baseURIhotel,{
                    method:"GET",
                    headers: {
                   'Origin': 'https://maps.googleapis.com'

                    }
                })
                .then(response => response.json())
                .then(
                   (data)  => {
                       console.log(data);
                       this.calcHotel.push(data.rows[0].elements[0].distance.value);
                        
                        console.log(this.calcHotel);

                   }
                    
                    );
             
        },
        distanceCalculate:function(){
                var i;

                for (i = 0; i < this.trip.tevents.length; i++) {

                const baseURI =  'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+this.trip.tevents[i].address+'&destinations='+this.trip.tevents[i+1].address+'&key=AIzaSyB0cs1z8ackoJoX6eEK1F6e8zEoSMTM4oE'  ;
                console.log(baseURI);
                 fetch(baseURI,{
                    method:"GET",
                    headers: {
                   'Origin': 'https://maps.googleapis.com'

  }
                })
                .then(response => response.json())
                .then(
                   (data)  => {
                       console.log(data);
                       this.calc.push(data.rows[0].elements[0].distance.value);

                        console.log(this.calc);

                        

                        

                   }
                    
                    );
                    
                }
            //Calculate Hotel and event distance
        },
        loadHotels:function(){
             this.hotels = [];
            db.collection('hotels').where('location','==',this.trip.tlocation).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
         
        //console.log(doc.data());
              this.hotels.push(doc.data()) ;

        //const data = {}
      })

    }).catch(err =>{
        this.hotels = [];
        console.log(err);
    });
    db.collection('events').where('location','==',this.trip.tlocation).get().then(querySnapshot => {
     // if(querySnapshot.exists){
          this.events = [];
      querySnapshot.forEach(doc => {
          
              //  console.log(doc.data().name);
              this.events.push(doc.data()) ;
      });
      //} else {
           // this.events = [];
            //console.log('no data ');
    //  }

    }).catch(err =>{
        this.hotels = [];
        console.log(err);
    });
            
        }
    },
     
    created () {
        this.trip = {};
        db.collection('locations').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        //console.log(doc.data());
              this.locations.push(doc.data().location) ;

        //const data = {}
      })

    })
    }
}
</script>