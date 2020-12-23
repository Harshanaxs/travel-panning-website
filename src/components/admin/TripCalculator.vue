<template>
    <div class="planMyTrip" >
        <h2>{{temp}} total {{totalDistanceKm}} | {{viewTotalEventAndHotelDistanceKm}} hotel cost {{totalHotelCost}}</h2>

       
        <v-container>
             <v-img src="@/assets/travel.jpg" height="300px"></v-img>
            <h3 class="">Travel Plan</h3>
            <v-btn @click="viewTotal(temp)">test 2</v-btn>
             <v-btn @click="totalDistance()">Test</v-btn>

            <calPopup ></calPopup>
            <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
         
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Total Cost
        </v-card-title>

        <v-card-text>
           <h3> Total Hotel Cost : {{hotelTotal}} </h3>
           <h3>Total Travel Cost : {{travelTotal}}</h3>
           <v-btn v-for="mode in travelModes" @click="totalTravelCost(mode.rate)" :key="mode.type" ><v-icon>{{mode.icon}}</v-icon></v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
            <v-card  v-for="(date, index) in days" :key="index" class="pa-3">
                <v-btn @click="removeDate(index)">remove</v-btn>
                <v-layout row wrap>
                    <v-flex class=" ml-4" md-2>
                        <div>Date</div>
                        <div >{{date.tdate}}</div>
                    </v-flex>
                    <v-flex md-2>
                        <div>Location</div>
                        <div>{{date.tlocation}}</div>
                    </v-flex>
                    <v-flex md-2>
                        <div>Hotel</div>
                        <div>{{date.thotel.name}} | <v-chip dark>${{date.thotel.averagePrice}}</v-chip> </div>
                    </v-flex>
                    <v-flex md-2>
                        <div>Events</div>
                        <div>
                            <v-chip v-for="eventx in date.tevents" :key="eventx.name">
                                <div>{{eventx.name}}</div>
                            </v-chip>
                        </div>
                    </v-flex>
                    <v-flex>
                        <div>Travel Distance (Km)</div>
                        <div>{{date.totalDistance}}</div>
                    </v-flex>
                </v-layout>

            </v-card>
        </v-container>
    </div>
</template>

<script>
import calPopup from '@/components/calPopup';
import {db} from '@/firebase.js';
import GoogleMapsApiLoader from 'google-maps-api-loader' ;




export default {
    name:'TripCalculator',
    components:{
        calPopup
    },
    data (){
        return{
               dates:[],
               hotelCost:[],
               count:0,
               nana:null,
               adminEmail:null,
               hotelTotal:25,
               travelTotal:null,
               totalDistanceKm:null,
               travelModes:[],
               temp: [],
               google:null,
                apiKey:'AIzaSyB0cs1z8ackoJoX6eEK1F6e8zEoSMTM4oE',
                 totalTripHotel : [] ,
                 totalHotelCost : null,
                 viewTotalEventAndHotelDistanceKm : null 

               

        }
    },
    computed:{
        days(){
            return this.$store.getters.days
        }

       
    },
 
   
    methods:{
          viewTotal:function(arr){
           if(arr.length > 0){
                let totalTravelDistance = arr.reduce((accumilator,currentValue) => {
                        return accumilator + currentValue ;
                    },0);

            this.totalDistanceKm = totalTravelDistance;        
           }else{
               

            this.totalDistanceKm = 0;        
           }
        },
         viewTotalHotelCost:function(arr){
           if(arr.length > 0){
                let totalTravelDistance = arr.reduce((accumilator,currentValue) => {
                        return accumilator + currentValue ;
                    },0);

            this.totalHotelCost = totalTravelDistance;        
           }else{
               

            this.totalHotelCost = 0;        
           }
        },
        viewTotalEventAndHotelDistance : function(arr){
           if(arr.length > 0){
                let totalTravelDistance = arr.reduce((accumilator,currentValue) => {
                        return accumilator + currentValue ;
                    },0);

            this.viewTotalEventAndHotelDistanceKm = totalTravelDistance + this.totalHotelCost ;        
           }else{
               

            this.totalHotelCost = 0;        
           }


        },



        totalTravelCost:function(rate){

            this.viewTotal(this.temp);

             
            this.travelTotal = this.totalDistanceKm * rate ;
        },

        totalDis:function(){
                var i ;
                
                var totalEvents =[] ;
                this.totalTripHotel = [];
                var totalHotelArr = []
                

                for(i = 0 ; i < this.days.length ;i++){
                        totalHotelArr.push(this.days[i].thotel.averagePrice);
                        totalEvents.push(this.days[i].totalDistance);
                        this.totalTripHotel.push(this.days[i].thotel.address);
                        
                        
                }
             


                this.viewTotalHotelCost(totalHotelArr);
                this.viewTotalEventAndHotelDistance(totalEvents);
                console.log(totalEvents);
                console.log(this.temp);

                

               // console.log(this.days[0].totalDistance);
            

        },
        totalDistance:function(){
                        this.temp = [] ;

            var j ;
            this.totalDis();
            
               for(j = 0;j<this.totalTripHotel.length ;  j++ ){


                    this.distanceCalculate([this.totalTripHotel[j]],[this.totalTripHotel[j+1]]);
                                    


                }
                console.log(this.totalDistanceKm);

                this.viewTotal(this.temp);
                console.log(this.totalDistanceKm);

        },
        
      
        removeDate:function(index){
            this.days.splice(index,1);
            this.dates.splice(index,1);
            this.hotelCost.splice(index,1);

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
                                console.log(self.temp);
                                
                                
                                

                               //return travelDistance ;
            }
             
            
        console.log(self.temp);
       // return (self.temp );
                        
           
        },
    
    },
    created(){
        db.collection('travelModes').get().then(querySnapshot => {
          
        querySnapshot.forEach(doc => {
       
             
              this.travelModes.push(doc.data()) ;
        });
        }).catch(err =>{
            this.hotels = [];
            console.log(err);
        }); 
        
        },
    mounted () { // point 3
    
    GoogleMapsApiLoader({
      apiKey: this.apiKey,
      libraries:['directions']
    }).then((google) => {
      this.google = google;
      console.log(google);
        //this.trip.tevents = [] ;

    }) 
  },
}
</script>