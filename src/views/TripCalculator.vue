<template>
  <div class="planMyTrip">
    <v-container>
      <v-img src="@/assets/travel.jpg" height="250px"></v-img>
      <h2 cass>Trip Calculator</h2>
      <!--   <v-btn @click="viewTotal(temp)">test 2</v-btn>
      <v-btn @click="totalDistance()">Test</v-btn>-->

      <!--Col Pop Up -->
      <v-dialog max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="success my-4" dark v-on="on" class="ma-2">
            Plan A Trip
            <span v-if="google == null">Ready</span>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <h2>Real-Time Travel Calculator</h2>
            {{ hotelRoomCount }} | {{ hotelBookings.length }}
            <h3>
              Temp Array : {{ cptemp }} Total distance :
              {{ Math.round(this.trip.totalDistance) }}Km
            </h3>
          </v-card-title>
          <v-card-text>
            <v-form class="px-3">
              <v-layout column>
                <v-flex md-4>
                  <v-select
                    :items="locations"
                    label="Location"
                    outlined
                    v-model="trip.tlocation"
                    @change="loadHotels"
                  ></v-select>
                </v-flex>
                <v-flex md-4>
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
                <v-flex md-4 class="mr-4">
                  <v-select
                    :items="hotels"
                    label="Hotel"
                    return-object
                    item-text="name"
                    outlined
                    v-model="trip.thotel"
                    @change="viewBookingCount"
                  ></v-select>
                </v-flex>
                <v-flex md-4>
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
                  <v-flex v-if="hotelRoomCount > 0">
                    <v-badge
                      :content="hotelRoomCount"
                      :value="hotelRoomCount"
                      color="orange"
                      overlap
                    >
                      <v-icon large>mdi-bed</v-icon>
                    </v-badge>
                    <h3 class="green--text">Rooms are Available</h3>
                    <v-btn @click="addToDays" class="success">Add</v-btn>
                  </v-flex>
                  <v-flex v-if="hotelRoomCount == 0">
                    <v-badge :content="0" :value="0" color="orange" overlap>
                      <v-icon class="red--text" large>mdi-bed</v-icon>
                    </v-badge>
                    <h3 class="red--text">No Rooms are Available</h3>
                  </v-flex>
                  <v-flex>
                    <p>Calculate daily travel distance before Add</p>
                    <v-btn @click="dayDistance(trip.thotel, trip.tevents)" class="danger">Calculate</v-btn>
                  </v-flex>
                </v-layout>
              </v-layout>
              <v-layout></v-layout>
            </v-form>

            <div class="map"></div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!--/Coll pop up-->
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color dark @click="finalOutput()" v-bind="attrs" v-on="on">Get Total Cost</v-btn>
        </template>

        <v-card class="mx-auto" width="400" color="#26c6da" dark>
          <v-card-title dark class="mb-4">Total Cost</v-card-title>

          <v-card-text>
            <h2 class="ma-2 white--text">Total Hotel Cost : $ {{ totalHotelCost }}</h2>
            <h2 class="ma-2 white--text">Total Event Cost : $ {{ totalEventCost }}</h2>
            <h2 class="ma-2 white--text">
              Total Travel Cost : {{ totalDistanceKm }} Km |
              {{ Math.round(finalTravelCost / totalDistanceKm) }} $/Km | Total $
              {{ finalTravelCost }}
            </h2>
            <h1 class="ma-4 white--text">
              Total Cost For Your Trip
              <h2 class="white--text ma-4">${{ finalTravelCost + totalEventCost + totalHotelCost }}</h2>
            </h1>
            <v-btn
              class="ma-4"
              v-for="mode in travelModes"
              @click="totalTravelCost(mode.rate)"
              :key="mode.type"
            >
              <v-icon>{{ mode.icon }}</v-icon>
            </v-btn>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text outlined @click="addRequest()">
              Make An Offer
              <!-- dialog = false-->
            </v-btn>
            <v-btn color="black" text @click="closeDialog()">
              Close
              <!-- dialog = false-->
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex row wrap>
        <v-card
          class="mx-auto ma-2"
          width="360px"
          outlined
          v-for="(date, index) in days"
          :key="index"
        >
          <v-row>
            <v-col>
              <v-btn @click="removeDate(index)" class="mx-2" dark color="black" fab x-small>x</v-btn>
            </v-col>
          </v-row>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ date.tdate }}</div>
              <v-list-item-title class="headline mb-1">
                {{
                date.tlocation
                }}
              </v-list-item-title>
              <v-list-item-title>
                {{ date.thotel.name }} |
                <v-chip dark>${{ date.thotel.averagePrice }}</v-chip>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile size="120" color="grey">
              <img v-bind:src="date.thotel.imgSrc" alt="John" />
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              Distance :
              {{ Math.round(date.totalDistance) }} Km
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Event Cost : ${{ date.totalEventCost }}</v-list-item-title>
          </v-list-item>

          <v-card-actions v-for="eventx in date.tevents" :key="eventx.name">
            <v-chip
              v-if="eventx.averagePrice > 0"
              small
              dark
            >{{ eventx.name }} | $ {{ eventx.averagePrice }}</v-chip>
            <div v-else>
              <v-chip small dark>{{ eventx.name }}</v-chip>|
              <v-chip small>
                <span class="green--text">Free</span>
              </v-chip>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
//import calPopup from '@/components/calPopup';
import { db } from "@/firebase.js";
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  name: "TripCalculator",
  components: {
    //calPopup
  },
  data() {
    return {
      roomCount: 0,
      hotelBookings: [],
      finalTravelCost: 0,
      dialog: false,
      dates: [],
      hotelCost: [],
      count: 0,
      nana: null,
      adminEmail: null,
      hotelTotal: 25,
      travelTotal: null,
      totalDistanceKm: null,
      travelModes: [],
      temp: [],
      google: null,
      totalTripHotel: [],
      totalHotelCost: null,
      viewTotalEventAndHotelDistanceKm: null,
      locations: [],
      hotels: [],
      events: [],
      apiKey: "AIzaSyDAbapqUJTCcJ2gWvXHdk6hUKXuE4p--HI",
      cptemp: null,
      totalD: 0,

      date: new Date().toISOString().substr(0, 10),
      menu: false,
      calc: [],
      calcHotel: [],
      totalEventCostTemp: [],
      totalEventCostArr: [],
      totalEventCost: null,
      trip: {
        tday: 0,
        tlocation: null,
        tdate: null,
        thotel: {},
        thotelRate: null,
        tevents: [],
        totalDistance: null,
        totalEventCost: null,
      },
    };
  },
  computed: {
    days() {
      return this.$store.getters.days;
    },
    cuser() {
      return this.$store.getters.user;
    },
    hotelRoomCount() {
      var val = this.roomCount - this.hotelBookings.length;
      return val;
    },
  },

  methods: {
    viewBookingCount: function () {
      this.hotelBookings = [];
      this.roomCount = this.trip.thotel.roomCount;

      db.collection("hotelBookings")
        .where("date", "==", this.trip.tdate)
        .where("hotel", "==", this.trip.thotel.name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.hotelBookings.push(doc.data());
          });
        })
        .catch((err) => {
          this.hotelBookings = [];
          console.log(err);
        });
    },
    closeDialog: function () {
      this.dialog = false;
    },
    eventCostSumTemp: function () {
      let i;
      for (i = 0; i < this.trip.tevents.length; i++) {
        this.totalEventCostTemp.push(Number(this.trip.tevents[i].averagePrice));
      }
      this.eventCostSumCal(this.totalEventCostTemp);

      console.log(this.trip.totalEventCost);
      this.totalEventCostTemp = [];
    },
    eventCostSumArr: function () {
      let i;
      for (i = 0; i < this.days.length; i++) {
        this.totalEventCostArr.push(this.days[i].totalEventCost);
      }
      this.eventCostSum(this.totalEventCostArr);

      console.log(this.totalEventCostArr);
      this.totalEventCostArr = [];
    },

    eventCostSumCal: function (arr) {
      if (arr.length > 1) {
        let totalTravelDistance = arr.reduce((accumilator, currentValue) => {
          return accumilator + currentValue;
        }, 0);

        this.trip.totalEventCost = totalTravelDistance;
      } else {
        this.trip.totalEventCost = 0;
      }
    },

    eventCostSum: function (arr) {
      if (arr.length > 1) {
        let totalTravelDistance = arr.reduce((accumilator, currentValue) => {
          return accumilator + currentValue;
        }, 0);

        this.totalEventCost = totalTravelDistance;
      } else {
        this.totalEventCost = 0;
      }
    },

    addRequest: function () {
      var request = {
        name: this.cuser.data.displayName,
        email: this.cuser.data.email,
        tripDetails: this.days,
        totalSpend:
          this.finalTravelCost + this.totalEventCost + this.totalHotelCost,
        requestStatus: 0,
        date: this.days[0].tdate,
      };

      var x;
      for (x = 0; x < this.days.length; x++) {
        var hotelBooking = {
          date: this.days[x].tdate,
          hotel: this.days[x].thotel.name,
        };
        db.collection("hotelBookings")
          .doc()
          .set(hotelBooking)
          .then(() => {
            console.log(hotelBooking + "Added");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      db.collection("requests")
        .doc()
        .set(request)
        .then(() => {
          console.log("We contact You Soon");
        });
    },

    // coll pop ups

    addToDays: function () {
      console.log(Number(this.trip.tevents[0].averagePrice));
      this.eventCostSumTemp();

      this.$store.dispatch("addDate", this.trip);
      this.trip = {};
      this.roomCount = 0;
      this.hotelBookings = [];
    },
    cpviewTotal: function (arr) {
      if (arr.length > 1) {
        let totalTravelDistance = arr.reduce((accumilator, currentValue) => {
          return accumilator + currentValue;
        }, 0);

        this.trip.totalDistance = totalTravelDistance;
      } else if (arr.length == 1) {
        let totalTravelDistance = arr.reduce((accumilator, currentValue) => {
          return accumilator + currentValue;
        }, 0);

        this.trip.totalDistance = totalTravelDistance * 2;
      } else {
        this.trip.totalDistance = 0;
      }
    },

    dayDistance(hotel, events) {
      this.cptemp = [];
      this.trip.totalDistance = 0;

      //  console.log(events)
      if (events.length == 1) {
        var chotel = [hotel.address];
        var cevent = [events[0].address];
        console.log(cevent);
        console.log(chotel);
        var x = this.cpdistanceCalculate(chotel, cevent);
        //var x = res * 2 ;
        console.log("done");

        console.log(x);

        return x;
      } else if (events.length > 1) {
        // this.cptemp = 0 ;
        // var tempTd = 0 ;
        this.cpdistanceCalculate([hotel.address], [events[0].address]);
        this.cpdistanceCalculate(
          [hotel.address],
          [events[events.length - 1].address]
        );

        console.log(events);
        var j;
        for (j = 0; j < events.length; j++) {
          // var mhotel =[hotel.address];
          //var mevent = [events[0].address];
          //console.log(mevent);
          //console.log(mhotel);
          this.cpdistanceCalculate(
            [events[j].address],
            [events[j + 1].address]
          );

          console.log("hi bba");
          //  tempTd = this.cptemp + tempTd ;
          //console.log(this.te);
        }
      } else {
        this.trip.totalDistance = 0;
        console.log("else");
      }
    },

    cpdistanceCalculate: function (origins, destinations) {
      var self = this;

      var service = new this.google.maps.DistanceMatrixService();
      //const final = [] ;
      service.getDistanceMatrix(
        {
          origins: origins,
          destinations: destinations,
          travelMode: "DRIVING",
        },
        callback
      );

      function callback(response, status) {
        console.log(status);
        var i;
        var travelDistance = 0;
        for (i = 0; i < response.rows[0].elements.length; i++) {
          var tempDistance = response.rows[0].elements[i].distance.value / 1000;
          travelDistance = travelDistance + tempDistance;
          console.log(i);
        }
        console.log("function is working" + travelDistance);
        self.cptemp.push(travelDistance);
        self.cpviewTotal(self.cptemp);

        //return travelDistance ;
      }

      console.log(self.cptemp);
      // return (self.cptemp );
    },

    loadHotels: function () {
      this.trip.thotel = null;
      this.trip.tevents = [];
      console.log("run me");

      this.hotels = [];
      db.collection("hotels")
        .where("location", "==", this.trip.tlocation)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.hotels.push(doc.data());
          });
        })
        .catch((err) => {
          this.hotels = [];
          console.log(err);
        });
      db.collection("events")
        .where("location", "==", this.trip.tlocation)
        .get()
        .then((querySnapshot) => {
          this.events = [];
          querySnapshot.forEach((doc) => {
            this.events.push(doc.data());
          });
        })
        .catch((err) => {
          this.hotels = [];
          console.log(err);
        });
    },

    // col pop ups
    viewTotal: function (arr) {
      if (arr.length > 0) {
        let totalTravelDistance = arr.reduce((accumilator, currentValue) => {
          return accumilator + currentValue;
        }, 0);

        this.totalDistanceKm = totalTravelDistance;
      } else {
        this.totalDistanceKm = 0;
      }
    },
    viewTotalEventCost: function (arr) {
      if (arr.length > 0) {
        let totalTravelDistance = arr.reduce((accumilator, currentValue) => {
          return accumilator + currentValue;
        }, 0);

        this.totalEventCost = totalTravelDistance;
      } else {
        this.totalEventCost = 0;
      }
    },
    viewTotalHotelCost: function (arr) {
      if (arr.length > 0) {
        let totalTravelDistance = arr.reduce((accumilator, currentValue) => {
          return accumilator + currentValue;
        }, 0);

        this.totalHotelCost = totalTravelDistance;
      } else {
        this.totalHotelCost = 0;
      }
    },
    viewTotalEventAndHotelDistance: function (arr) {
      if (arr.length > 0) {
        let totalTravelDistance = arr.reduce((accumilator, currentValue) => {
          return accumilator + currentValue;
        }, 0);

        this.viewTotalEventAndHotelDistanceKm =
          totalTravelDistance + this.totalDistanceKm;
      } else {
        this.totalHotelCost = 0;
      }
    },
    finalOutput() {
      console.log(this.totalEventCost);
      //this.viewTotalEventCost(this.totalEventCostTemp);
      this.eventCostSumArr();
      this.totalDistance();

      this.viewTotal(this.temp);
    },

    totalTravelCost: function (rate) {
      this.viewTotal(this.temp);
      this.finalTravelCost = Math.round(this.totalDistanceKm) * rate;
      //this.travelTotal = this.totalDistanceKm * rate ;
    },

    totalDis: function () {
      var i;
      //var totalEventCost = [] ;
      var totalEvents = [];
      this.totalTripHotel = [];
      var totalHotelArr = [];

      for (i = 0; i < this.days.length; i++) {
        // totalEvents.push(this.days[i].tevents);
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
    totalDistance: function () {
      this.temp = [];

      var j;
      this.totalDis();

      for (j = 0; j < this.totalTripHotel.length; j++) {
        this.distanceCalculate(
          [this.totalTripHotel[j]],
          [this.totalTripHotel[j + 1]]
        );
      }
      console.log(this.totalDistanceKm);

      this.viewTotal(this.temp);
      console.log(this.totalDistanceKm);
    },

    removeDate: function (index) {
      this.days.splice(index, 1);
      this.dates.splice(index, 1);
      this.hotelCost.splice(index, 1);
    },
    distanceCalculate: function (origins, destinations) {
      var self = this;

      var service = new this.google.maps.DistanceMatrixService();
      //const final = [] ;
      service.getDistanceMatrix(
        {
          origins: origins,
          destinations: destinations,
          travelMode: "DRIVING",
        },
        callback
      );

      function callback(response, status) {
        console.log(status);
        var i;
        var travelDistance = 0;
        for (i = 0; i < response.rows[0].elements.length; i++) {
          var tempDistance = response.rows[0].elements[i].distance.value / 1000;
          travelDistance = travelDistance + tempDistance;
          console.log(i);
        }

        console.log("function is working" + travelDistance);
        self.temp.push(travelDistance);
        console.log(self.temp);

        //return travelDistance ;
      }

      console.log(self.temp);
      // return (self.temp );
    },
  },
  created() {
    db.collection("travelModes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.travelModes.push(doc.data());
        });
      })
      .catch((err) => {
        this.hotels = [];
        console.log(err);
      });
    this.trip = {};
    db.collection("destinations")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.locations.push(doc.data().name);
        });
      });
  },
  mounted() {
    // point 3

    GoogleMapsApiLoader({
      apiKey: this.apiKey,
      libraries: ["directions"],
    }).then((google) => {
      this.google = google;
      console.log(google);
      //this.trip.tevents = [] ;
    });
  },
};
</script>
