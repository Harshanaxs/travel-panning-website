<template>
  <v-navigation-drawer dark app permanent class="indigo">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Dashboard</v-list-item-title>
        <v-list-item-subtitle>admin</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="link in links" :key="link.title" link router :to="link.route">
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-btn @click="signOut">Sign Out</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      links: [
        { icon: "mdi-shield-account", text: "Admin", route: "/admin" },
        {
          icon: "mdi-map-marker",
          text: "Destinations",
          route: "/admin/destinations",
        },
        { icon: "mdi-bed-king", text: "Hotels", route: "/admin/hotels" },
        { icon: "mdi-map", text: "Events", route: "/admin/events" },
        { icon: "mdi-account", text: "Users", route: "/admin/users" },
        { icon: "mdi-file-chart", text: "Reports", route: "/reports" },
        { icon: "mdi-bus", text: "Travel Modes", route: "/admin/travelModes" },
      ],
      right: null,
    };
  },
  methods: {
    signOut: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Home",
          });
        });
    },
    toLoginPage: function () {
      this.$router.replace({ name: "Auth" });
    },
  },
};
</script>