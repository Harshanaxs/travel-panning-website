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
              Make Inquiry
            </v-card-title>

            <p>
              Find all that you need for a peaceful travel in one place. We at Trouvaille travels offer all services under one roof. All the arrangements are smoother and proper.
            </p>

            <v-row class="pa-2">
              <v-responsive
                class="overflow-visible "
                
              >
                <v-text-field
                  hide-details
                  label="Your Name"
                  solo
                />
              </v-responsive>
               <v-responsive
                class="overflow-visible ml-2"
              >
                <v-text-field
                  hide-details
                  label="Your Email Address"
                  solo
                />
              </v-responsive>
               
            </v-row>
            <v-row>
                <v-responsive
                class="overflow-visible ml-2"
              >
                <v-textarea
                  hide-details
                  label="Message"
                  solo
                  rows="5"
                />
              </v-responsive>

              
            </v-row>
           <v-row>
                <v-btn
                :block="$vuetify.breakpoint.xsOnly"
                class="my-4"
                color="secondary"
                style="height: 48px"
              >
                Subscribe
              </v-btn>
           </v-row>
          </v-col>

          <v-col
            cols="12"
            md="6"
           offset-md="1"
          >
            <v-card-text >Contact</v-card-text>

            <v-list class="transparent">
              <v-list-item>
                <v-list-item-avatar
                  color="primary"
                >
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-email-outline
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-title>EMAIL</v-list-item-title>
                <p class="text-left">
                infomer@trouvaille.com
                </p>                
              </v-list-item>

              <v-list-item>
                <v-list-item-avatar color="primary">
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-map-marker
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-title>ADDRESS</v-list-item-title>

                
                    <p class="text-left">
                                        Trouvaille Travels And  Tours (Pvt) Ltd No.92, Fife Road,Colombo 5,Sri Lanka.

                    </p>
                
              </v-list-item>

              <v-list-item>
                <v-list-item-avatar color="primary">
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-phone
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-title>PHONE</v-list-item-title>

                <p>
            +94 112538288                  
                </p>
              </v-list-item>
            </v-list>
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
