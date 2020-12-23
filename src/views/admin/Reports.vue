<template>
  <v-container>
    <h2 class="mb-8">Reports</h2>
    <v-row>
      <v-col>
        <div>
          <v-btn @click="changeType(1)"><v-icon>mdi-table</v-icon></v-btn>
          <v-btn class="ml-4" @click="changeType(2)"
            ><v-icon>mdi-calendar-range</v-icon></v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-container>
      <ejs-grid
        v-if="type == 1"
        ref="grid"
        id="Grid"
        :dataSource="orders"
        :allowPaging="true"
        :allowSorting="true"
        :allowFiltering="true"
        :allowGrouping="true"
        :pageSettings="pageSettings"
        :toolbar="toolbarOptions"
        :allowPdfExport="true"
        :toolbarClick="toolbarClick"
      >
        <e-columns>
          <e-column
            field="date"
            headerText="Date"
            textAlign="Left"
            width="90"
          ></e-column>
          <e-column
            field="name"
            headerText="Client"
            textAlign="Left"
            width="90"
          ></e-column>
          <e-column
            field="email"
            headerText="Client's Email"
            width="120"
          ></e-column>
          <e-column
            field="totalSpend"
            headerText="Total Spend"
            textAlign="Left"
            format="C2"
            width="90"
          ></e-column>
        </e-columns>
      </ejs-grid>

      <v-data-table
        v-if="type == 0"
        :headers="headers"
        :items="orders"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.processed="{ item }">
          <v-chip class="green white--text" v-if="item.requestStatus == 1"
            >Processed</v-chip
          >
          <v-chip class="yellow " v-if="item.requestStatus == 0">New</v-chip>
        </template>
      </v-data-table>
    </v-container>
    <div v-for="(order, index) in orders" :key="index">
      <v-flex v-if="type == 2" row wrap>
        <v-card
          width="300"
          class="mx-auto my-4"
          max-width="344"
          v-for="(trip, index) in order.tripDetails"
          :key="index"
        >
          <v-card-title>{{ trip.tdate }}</v-card-title>
          <v-card-text>
            <span
              ><h3>
                Events <v-chip>{{ trip.tevents.length }}</v-chip>
              </h3></span
            >
            <h4 v-for="(event, index) in trip.tevents" :key="index">
              {{ event.name }}
            </h4>
            <v-divider vertical></v-divider>
            <h3>Hotels</h3>
            <h4>{{ trip.thotel.name }}</h4>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4">
              More Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </div>
  </v-container>
</template>

<script>
import Vue from "vue";
import {
  GridPlugin,
  Page,
  Sort,
  Filter,
  Group,
  Toolbar,
  PdfExport,
  Aggregate,
} from "@syncfusion/ej2-vue-grids";

Vue.use(GridPlugin);
import { db } from "@/firebase.js";
export default {
  name: "Admin",
  components: {},
  data() {
    return {
      toolbarOptions: ["PdfExport"],

      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "No of Days", value: "tripDetails.length" },
        { text: "Total Spent ($)", value: "totalSpend" },
        { text: "Status", value: "processed" },
      ],
      orders: [],
      type: 1,
    };
  },
  provide: {
    grid: [Page, Sort, Filter, Group, Toolbar, PdfExport, Aggregate],
  },
  computed: {
    groups() {
      function groupBy(array, key) {
        const result = {};
        array.forEach((item) => {
          if (!result[item[key]]) {
            result[item[key]] = [];
          }
          result[item[key]].push(item);
        });
        return result;
      }
      return groupBy(this.order.tripDetails, "tdate");
    },
  },
  methods: {
    toolbarClick(args) {
      if (args.item.id === "Grid_pdfexport") {
        // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
        this.$refs.grid.pdfExport({
          fileName: "Report.pdf",
          header: {
            fromTop: 0,
            height: 130,
            contents: [
              {
                type: "Text",
                value: "Trouvaille Pvt Ltd",
                position: { x: 50, y: 50 },
                style: { textBrushColor: "#000000", fontSize: 20 },
              },
              {
                type: "Text",
                value: "Contact Report",
                position: { x: 50, y: 80 },
                style: { textBrushColor: "#000000", fontSize: 14 },
              },
            ],
          },
          footer: {
            fromBottom: 160,
            height: 150,
            contents: [
              {
                type: "PageNumber",
                pageNumberType: "English",
                format: "Page {$current} of {$total}",
                position: { x: 0, y: 25 },
                style: { textBrushColor: "#000000", fontSize: 15 },
              },
            ],
          },
        });
      }
    },
    changeType: function(typeR) {
      this.type = typeR;
    },

    initData: function() {
      db.collection("requests")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.orders.push(doc.data());
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateStatue: function() {},
  },
  created() {
    this.initData();
  },
};
</script>
