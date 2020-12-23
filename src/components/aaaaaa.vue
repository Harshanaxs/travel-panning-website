<template>
  <div>
    <v-card>
      <v-card-title>
        <h3>Sign In</h3>
      </v-card-title>
      <v-card-text>
        <v-text-field label="Email" v-model="email"></v-text-field>
        <v-text-field label="Password" v-model="password"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit">Sign In</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          console.log(data.user);
          //  data.user.getIdTokenResult().then(() => {
          this.$router.replace({ name: "tripCalculator" });
          // });
        })
        .catch((err) => {
          this.error = err.message;
          console.log(this.error);
        });
    },
  },
};
</script>