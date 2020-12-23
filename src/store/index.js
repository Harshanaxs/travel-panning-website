import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: {
        displayName: null,
        email: null,
      },
    },
    days: [],
  },
  getters: {
    xauth(state) {
      state.user.loggedIn;
    },
    user(state) {
      return state.user;
    },
    days(state) {
      return state.days;
    },
  },
  mutations: {
    SET_LOGGED_IN(state) {
      state.user.loggedIn = true;
    },
    SET_LOGGED_OUT(state) {
      state.user.loggedIn = false;
      state.user.data = {
        displayName: null,
        email: null,
      };
      state.days = [];
    },
    SET_USER(state, data) {
      state.user.data.displayName = data.displayName;
      state.user.data.email = data.email;
    },
    SET_HOTELS(state, data) {
      state.hotels.push(data);
    },
    addNewDate: (state, trip) => {
      state.days.push(trip);
      console.log("Added Product:", trip);
      console.log("products", state.days);
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      console.log("Hello Ibba");
      commit("SET_LOGGED_IN");

      commit("SET_USER", user);
      console.log(user);
      // console.log(this.state.user);
    },
    signOut({ commit }) {
      console.log("Washed");
      commit("SET_LOGGED_OUT");
    },

    loadHotels({ commit }, hotels) {
      commit("SET_HOTELS", hotels);
    },
    async addDate({ commit }, trip) {
      commit("addNewDate", trip);
    },
  },
});
