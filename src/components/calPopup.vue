<template>
    <v-dialog max-width="600px">
        <template v-slot:activator="{ on }">
        <v-btn
          color="success my-4"
          dark
          v-on="on"
        >
        Add New Trip <span v-if="google == null">Ready</span>
        </v-btn>
      </template>
        <v-card>
            <v-card-title> Hi there {{temp}} Total distance : {{this.trip.totalDistance}} </v-card-title>
            <v-card-text >
                <v-form class="px-3">
                    <v-layout column >
                        <v-flex md-4 >
                        <v-select
                        :items="locations"
                        label="Location"
                        outlined
                        v-model="trip.tlocation"
                        @change="loadHotels"
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
                        <v-btn @click="addToDays" class="success">Add</v-btn>
                        </v-flex>
                         <v-flex>
                             <p>Calculate daily travel distance before Add</p>
                        <v-btn @click="dayDistance(trip.thotel,trip.tevents)" class="danger">Calculate</v-btn>
                        </v-flex>
                      </v-layout>

                   </v-layout>
                <v-layout>

                    
                    
                </v-layout>   
               

                </v-form>
                
                   <div class="map"></div>
                
            </v-card-text>
        </v-card>

    </v-dialog>
</template>
<script>
import  {db}  from '@/firebase.js';
import GoogleMapsApiLoader from 'google-maps-api-loader';


export default {
    props:[''],
    data () {
        return {
            locations:[],
            hotels:[],
            events:[],
            apiKey:'AIzaSyB0cs1z8ackoJoX6eEK1F6e8zEoSMTM4oE',
            temp : null,
            totalD: 0 ,
           
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            calc:[],
            calcHotel:[],
            trip : {
                tday:0,
                tlocation:null,
                tdate:null,
                thotel:{},
                thotelRate:null,
                tevents:[],
                totalDistance:null
                
            },
            google :null 
 

        }
    },
     mounted () { 
               GoogleMapsApiLoader({
      apiKey: this.apiKey,
      libraries:['directions']
    }).then((google) => {
      this.google = google;
      console.log(google);
    this.trip.tevents = [] ;

      //this.initializeMap()
    }) 
    
    
  },
    
    
    methods:{

        addToDays:function(){
            this.$store.dispatch("addDate",this.trip);
            this.trip = {} ;
        },
         viewTotal:function(arr){
           if(arr.length > 1){
                let totalTravelDistance = arr.reduce((accumilator,currentValue) => {
                        return accumilator + currentValue ;
                    },0);

            this.trip.totalDistance = totalTravelDistance;        
           }else if(arr.length == 1){
                let totalTravelDistance = arr.reduce((accumilator,currentValue) => {
                        return accumilator + currentValue ;
                    },0);

            this.trip.totalDistance = totalTravelDistance * 2;        
           }else{
               

            this.trip.totalDistance = 0;        
           }
        },

        dayDistance(hotel,events){
                        this.temp = [] ;
                        this.trip.totalDistance = 0; 
                        
 

          //  console.log(events)
            if( events.length == 1){
                var chotel =[hotel.address];
                var cevent = [events[0].address];
                console.log(cevent);
                console.log(chotel);
                var x = this.distanceCalculate(chotel,cevent);
                     //var x = res * 2 ;
                     console.log('done');

                     
                    console.log(x);    

                return  x ;
                   

               
                
            }else if(events.length > 1){
               // this.temp = 0 ;
               // var tempTd = 0 ;
               this.distanceCalculate([hotel.address],[events[0].address]);
                this.distanceCalculate([hotel.address],[events[events.length - 1].address]);

                console.log(events);
                var j ;
                for(j=0 ;  j<events.length ; j++){
                  // var mhotel =[hotel.address];
                //var mevent = [events[0].address];
                //console.log(mevent);
                //console.log(mhotel);
                this.distanceCalculate([events[j].address],[events[j+1].address]); 
                
                
                console.log('hi bba');
               //  tempTd = this.temp + tempTd ;
                //console.log(this.te); 
                }
                

            }else{
                this.trip.totalDistance = 0;
                console.log('else');
            }
        },
      

        
        
        
        distanceCalculate:function(origins,destinations){
            var self = this ;
            

            var service = new this.google.maps.DistanceMatrixService();
            //const final = [] ;
             service.getDistanceMatrix(
            {
                origins: origins,
                destinations: destinations,
                travelMode: 'DRIVING',
                
            }, callback);

            function callback(response, status)  {
                console.log(status)
                var i ;
                var travelDistance = 0  ;
                for(i=0 ; i<response.rows[0].elements.length ; i++){
                  var tempDistance =  response.rows[0].elements[i].distance.value/1000;
                  travelDistance = travelDistance + tempDistance;
                  console.log(i);
                  
                }
                                console.log("function is working" + travelDistance);
                                self.temp.push(travelDistance) ; 
                                self.viewTotal(self.temp);
                                
                                
                                

                               //return travelDistance ;
            }
             
            
        console.log(self.temp);
       // return (self.temp );
                        
           
        },




        loadHotels:function(){
           this.trip.thotel = null ;
           this.trip.tevents = [] ;
 
            
             this.hotels = [];
            db.collection('hotels').where('location','==',this.trip.tlocation).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
      
              this.hotels.push(doc.data()) ;
      })

    }).catch(err =>{
        this.hotels = [];
        console.log(err);
    });
    db.collection('events').where('location','==',this.trip.tlocation).get().then(querySnapshot => {
          this.events = [];
      querySnapshot.forEach(doc => {
      this.events.push(doc.data()) ;
      });
     

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
              this.locations.push(doc.data().location) ;
      })

    })
    }
}
</script>