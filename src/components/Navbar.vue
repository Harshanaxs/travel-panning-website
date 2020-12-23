<template>
  <div>
    <v-toolbar flat dark class img src="@/assets/navbar.png">
      <v-toolbar-title class="ml-4">
        <img src="@/assets/logo.png" height="80px" alt />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <Search class="mt-10"></Search>
      <v-spacer></v-spacer>
      <div>
        <v-btn v-on:click="drawer=!drawer" small left class="small">Discover</v-btn>
        <v-btn @click="tripCal" small right class="ml-2">Plan A Trip</v-btn>
      </div>
    </v-toolbar>

    <v-navigation-drawer src="@/assets/navbar.png" app v-model="drawer" right temporary>
      <v-list>
        <v-list-item v-if="xuser.loggedIn">
          <v-list-item-content class="white--text">{{xuser.data.displayName}}</v-list-item-content>
        </v-list-item>
        <v-list-item v-for="link in links" :key="link.route" router :to="link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template>
          <v-list-item v-if="xuser.loggedIn == true">
            <v-list-item-icon>
              <v-icon class="white--text">mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">
                <v-btn @click.prevent="signOut">Sign Out</v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!xuser.loggedIn">
            <v-list-item-icon>
              <v-icon class="white--text">mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">
                <v-btn @click="toLoginPage">Sign In | Sign Up</v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Search from "@/components/Search";
import firebase from "firebase";
export default {
  name: "Navbar",
  components: {
    Search,
    // Vlist
  },
  data() {
    return {
      drawer: false,
      links: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "mdi-anchor", text: "Events", route: "/events" },
        {
          icon: "mdi-map-marker",
          text: "Destinations",
          route: "/destinations",
        },
        { icon: "mdi-bed-king", text: "Hotels", route: "/hotels" },
        { icon: "mdi-information", text: "About Us", route: "/about" },
        { icon: "mdi-account-box", text: "Contact Us", route: "/ContactUs" },
        {
          icon: "mdi-calculator",
          text: "TripCalculator",
          route: "/planmytrip",
        },
        { icon: "mdi-biathlon", text: "My Trips", route: "/mytrips" },
      ],
    };
  },

  methods: {
    showDrawer: function () {
      this.drawer = !this.drawer;
    },
    logUser: function () {
      console.log(this.xuser);
    },
    signOut: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("signOut");

          this.$router.replace({
            name: "Home",
          });
        });
    },
    tripCal: function () {
      this.$router.replace({ name: "tripCalculator" });
    },
    toLoginPage: function () {
      this.$router.replace({ name: "Auth" });
    },
  },
  computed: {
    ...mapGetters(["user"]),
    xuser() {
      if (this.user.loggedIn) {
        //return this.$store.getters.user.data.displayName
        return this.user;
      } else {
        return 0;
      }
    },
  },
};
</script>