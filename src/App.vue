<template>
  <v-app>
    <Navbar v-if="$route.meta.admin !== true"></Navbar>
    <adminNav v-if="$route.meta.admin == true"></adminNav>
    <v-content class="blue-grey lighten-5">
      <router-view></router-view>
    </v-content>
    <Footer v-if="$route.meta.admin !== true"></Footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import adminNav from "@/components/admin/Navigation";
import Footer from "@/components/Footer";

export default {
  name: "App",

  components: {
    Navbar,
    adminNav,
    Footer,
  },

  data: () => ({}),
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
</style>
