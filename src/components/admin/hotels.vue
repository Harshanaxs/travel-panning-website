<template>
  <v-data-table
    :headers="headers"
    :items="hotels"
    sort-by="location"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Hotels</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >Add New Hotel</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.name" label="Hotel Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.location" label="Location"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.discription" label="Disctiption"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-rating
                        label="Star Rating"
                        color="yellow darken-3"
                        half-increments
                        hover
                        large
                        v-model="editedItem.starRating"
                        ></v-rating>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.averagePrice" label="Average Price"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-file-input v-model="editedItem.images.main"  label="Featured Image"></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-file-input v-model="editedItem.images.gallery" multiple label="Gallery Images"></v-file-input>
                  </v-col>
                
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    
  </v-data-table>
</template>

<script>

import db from '@/firebase.js'

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Location', value: 'location' },
        { text: 'Address', value: 'address' },
        { text: 'Star Rating', value: 'starRating' },
        { text: 'Average Price', value: 'averagePrice' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      hotels: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        location: '',
        address: '',
        starRating: 0,
        averagePrice: 0,
        discription:'',
        images:{
            main:'',
            gallery:{}
        }
      },
      defaultItem: {
         name: '',
        location: '',
        address: '',
        starRating: 0,
        averagePrice: 0,
        discription:'',
        images:{
            main:'',
            gallery:{}
        }
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        db.collection('hotels').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          
            this.hotels.push(doc.data()) ;
            console.log(this.hotels);

      })

    }).catch(err =>{
        console.log(err);
    });
               
      },

      editItem (item) {
        this.editedIndex = this.hotels.indexOf(item);
        this.editedItem =  item;
        this.dialog = true;
      },

      deleteItem (item) {
        const index = this.hotels.indexOf(item);
        confirm('Are you sure you want to delete this item?') && this.hotels.splice(index, 1);
      },

      close () {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.hotels[this.editedIndex], this.editedItem);
        } else {
          this.hotels.push(this.editedItem);
        }
        this.close();
      },
    },
  }
</script>