<template>
  <div>
    <v-container>
      <h2>My Trips</h2>
      <v-row>
        <v-col cols="3">
          <h3>Starting Date</h3>
          <v-list-item link @click="loadTrip(x)" v-for="(day,x) in trips" :key="x">
            <v-list-item-content>
              <v-list-item-title class="title">{{day.data.tripDetails[0].tdate}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="8">
          <v-col>
            <v-btn @click="removeTrip(selected)" class="mx-2" dark color="black">Remove</v-btn>
          </v-col>
          <v-flex row wrap>
            <v-card
              class="mx-auto ma-2"
              width="360px"
              outlined
              v-for="(date, index) in trip"
              :key="index"
            >
              <v-row></v-row>
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from "@/firebase.js";
import { mapGetters } from "vuex";
export default {
  data: function () {
    return {
      trips: [],
      trip: [],
      selected: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    xuser: function () {
      return this.user;
    },
  },
  methods: {
    loadTrip: function (x) {
      this.selected = this.trips[x].id;
      this.trip = this.trips[x].data.tripDetails;
    },
    fetchTrips: function () {
      this.trips = [];
      db.collection("requests")
        .where("email", "==", this.xuser.data.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var id = doc.id;
            var obj = {
              id: id,
              data: doc.data(),
            };
            console.log(obj);

            this.trips.push(obj);
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    },
    removeTrip(id) {
      db.collection("requests")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.fetchTrips();
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },
  },
  created: function () {
    this.fetchTrips();
  },
};
</script>