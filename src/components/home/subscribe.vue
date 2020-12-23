<template>

    <v-card
      color="rgba(203, 170, 92, 0.51)"
      class="pa-3"
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
          >
            <v-card-title class="mb-3">
              Subscribe
            </v-card-title>

            <p>
              Enter your email address to subscribe to this blog
              and receive notifications of new posts by email.
            </p>

            <v-row class="pa-2">
              <v-responsive
                class="overflow-visible mr-2"
                max-width="400"
              >
                <v-text-field
                  hide-details
                  label="Your Email Address"
                  solo
                />
              </v-responsive>

              <v-btn
                :block="$vuetify.breakpoint.xsOnly"
                class="ma-0"
                color="secondary"
                style="height: 48px"
              >
                Subscribe
              </v-btn>
            </v-row>
          </v-col>
          <v-col>
              <v-card
              width="150px"
              class="mx-auto"
              
              >
                  
                      <v-img src="@/assets/book.jpg"  max-width="150px" alt="Sri lanka Guide"> </v-img>
                  
              </v-card>
          </v-col>

                 </v-row>
      </v-container>
    </v-card>
</template>

<script>
  export default {
    name: 'HomeSubscribe',
  }
</script>
