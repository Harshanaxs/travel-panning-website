<template>
  <div>
    <v-card flat class="py-4 px-4">
      <v-card-title>
        <h2>Sign Up</h2>
      </v-card-title>
      <v-card-text>
        <ValidationObserver v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider name="Name" rules="required|alpha_spaces" v-slot="{ errors }">
              <div>
                <v-text-field v-model="form.name" label="Name"></v-text-field>
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
              <div>
                <v-text-field type="email" v-model="form.email" label="Email"></v-text-field>
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="Password"
              vid="confirmation"
              rules="required|min:6|max:12"
              v-slot="{ errors }"
            >
              <div>
                <v-text-field type="password" v-model="form.password" label="Password"></v-text-field>
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="Confirm Password"
              rules="required|confirmed:confirmation"
              v-slot="{ errors }"
            >
              <div>
                <v-text-field
                  type="password"
                  v-model="form.passwordConfirm"
                  label="Confirm Password"
                ></v-text-field>
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <v-btn type="submit" @click="submit">Sign Up</v-btn>
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "@/firebase.js";

export default {
  name: "SignUp",
  components: {},

  data() {
    return {
      show4: false,

      form: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      error: "",
      passwordError: "",
    };
  },
  computed: {
    isValid: function () {
      if (this.error) {
        return false;
      } else {
        return true;
      }
    },
  },

  methods: {
    passwordValidation: function () {
      if (this.form.password != this.form.passwordConfirm) {
        this.passwordError = "Password did't match";
      } else {
        this.passwordError = "";
      }
    },
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          //  this.$store.dispatch("fetchUser", data.user);
          console.log(data.user.email);
          this.$router.replace({ name: "tripCalculator" });

          var user = firebase.auth().currentUser;
          var newUser = {
            name: this.form.name,
            email: this.form.email,
          };
          db.collection("users").doc(user.uid).set(newUser);

          data.user
            .updateProfile({
              displayName: this.form.name,
            })
            .then(function () {
              console.log("Name Added");
            })
            .catch(function (error) {
              // An error happened.
              console.log("Erorr" + error);
            });
        })
        .catch((err) => {
          this.error = err.message;
          console.log(this.error);
        });
    },
  },
};
</script>
