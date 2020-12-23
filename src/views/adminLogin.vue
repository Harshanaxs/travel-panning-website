<template>
  <div>
    <v-container>
      <v-card flat class="py-4 mx-auto" max-width="600px">
        <v-card-title>
          <h2>Admin</h2>
          <v-chip v-if="isAdmin">This Login only for admin</v-chip>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              :rules="[rules.required]"
              :type="email"
              name="input-10-2"
              label="Email"
              hint="Enter Valid Email or Register"
              value="Pa"
              @click:append="show4 = !show4"
              required
              v-model="form.email"
            ></v-text-field>
            <v-text-field
              :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="show4 ? 'text' : 'password'"
              name="input-10-2"
              label="Password"
              hint="At least 8 characters"
              value="Pa"
              @click:append="show4 = !show4"
              v-model="form.password"
            ></v-text-field>
            <v-btn type="submit" @click.prevent="submit">Log In</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      isAdmin: false,
      show4: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailRules: [(v) => /.+@.+/.test(v) || "Invalid Email address"],
      },
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          console.log(data);
          data.user.getIdTokenResult().then((data) => {
            if (data.claims.admin) {
              this.$router.replace({ name: "Admin" });
              console.log("Hi admin");
            } else {
              this.isAdmin = true;
              //this.$router.replace({ name: "tripCalculator" });
              console.log(data.user.displayName);
            }
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
