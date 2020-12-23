import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Events from "../views/Events.vue";
import About from "../views/About.vue";

import Hotels from "../views/Hotels.vue";
import TripCalculator from "../views/TripCalculator.vue";
import Auth from "../views/Auth.vue";
import Admin from "../views/admin/Admin.vue";
import users from "../views/admin/users.vue";
import destinations from "../views/admin/destinations.vue";
import hotels from "../views/admin/hotels.vue";
import events from "../views/admin/events.vue";
import Destinations from "../views/Destinations.vue";
import ContactUs from "../views/ContactUs.vue";
import travelmodes from "../views/admin/TravelModes.vue";
import Reports from "../views/admin/Reports.vue";
import gMap from "../components/calculator/googleApi.vue";
import Mytrips from "../views/Mytrips.vue";
import adminLogin from "../views/adminLogin.vue";
//import store from "../store";
import firebase from "firebase";

//var isAuthenticated = store.state.user.loggedIn;

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/api",
    name: "API",
    component: gMap,
  },
  {
    path: "/destinations",
    name: "Destinations",
    component: Destinations,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/hotels",
    name: "Hotels",
    component: Hotels,
  },
  {
    path: "/events",
    name: "Events",
    component: Events,
  },
  {
    path: "/ContactUs",
    name: "ContactUs",
    component: ContactUs,
  },
  {
    path: "/planMyTrip",
    name: "tripCalculator",
    component: TripCalculator,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/mytrips",
    name: "mytrips",
    component: Mytrips,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      admin: true,
    },
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: {
      admin: true,
    },
  },
  {
    path: "/admin/users",
    name: "Users",
    component: users,
    meta: {
      admin: true,
    },
  },
  {
    path: "/admin/travelModes",
    name: "TravelModes",
    component: travelmodes,
    meta: {
      admin: true,
    },
  },
  {
    path: "/admin/destinations",
    name: "Destinations",
    component: destinations,
    meta: {
      admin: true,
    },
  },
  {
    path: "/admin/hotels",
    name: "Hotels",
    component: hotels,
    meta: {
      admin: true,
    },
  },
  {
    path: "/adminLogin",
    name: "adminLogin",
    component: adminLogin,
  },
  {
    path: "/admin/events",
    name: "Events",
    component: events,
    meta: {
      admin: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next("auth");
  } else {
    next();
  }
});

export default router;
