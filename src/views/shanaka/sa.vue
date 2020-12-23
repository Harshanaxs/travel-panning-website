<template>
    <v-container>
        <h2>Order Status</h2>
        <h4>Last Update @ {{updatedAt}}</h4>
        <v-divider></v-divider>
        <v-data-table
    :headers="headers"
    :items="orders"
    class="elevation-1"
  >
   <template v-slot:item.orderCount="{ item }">
      <v-chip  dark>{{item.orderCount}}</v-chip>
    </template>
     <template v-slot:item.toBeConfirm="{ item }">
      <v-chip v-if="item.toBeConfirm != 0"  :color="toBeConfirmColor(item)" dark><v-icon>mdi-ticket-confirmation</v-icon></v-chip>
    </template>
    <template v-slot:item.toBeShip="{ item }">
      <v-chip v-if="item.toBeShip!= 0"  :color="toBeShipColor(item)" dark><v-icon>mdi-truck</v-icon></v-chip>
    </template>
    <template v-slot:item.toBeInvoiced="{ item }">
      <v-chip v-if="item.toBeInvoiced != 0"  :color="toInvoicedColor(item)" dark><v-icon>mdi-receipt</v-icon></v-chip>
    </template>
    <template v-slot:item.toBePosted="{ item }">
      <v-chip v-if="item.toBePosted != 0"  :color="toBePostedColor(item)" dark><v-icon>mdi-email</v-icon></v-chip>
    </template>
    
    
  </v-data-table>
    </v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Order reference',
            align: 'start',
            sortable: false,
            value: 'orderNo',
          },
          { text: 'Order Count', value: 'orderCount' },
          { text: 'To Be Confirm', value: 'toBeConfirm' },
          { text: 'To BE Ship', value: 'toBeShip' },
          { text: 'To BE Invoiced', value: 'toBeInvoiced' },
          { text: 'To Be Posted', value: 'toBePosted' },
        ],
        orders: [
            {
                orderNo:'56702',
                orderCount:1 ,
                toBeConfirm:25,
                toBeShip:0,
                toBeInvoiced:0,
                toBePosted:0
            },
             {
                orderNo:'56703',
                orderCount:0 ,
                toBeConfirm:1,
                toBeShip:30,
                toBeInvoiced:55,
                toBePosted:0
            },
             {
                orderNo:'56704',
                orderCount:0 ,
                toBeConfirm:22,
                toBeShip:1,
                toBeInvoiced:0,
                toBePosted:0
            },
             {
                orderNo:'56705',
                orderCount:0 ,
                toBeConfirm:0,
                toBeShip:0,
                toBeInvoiced:1,
                toBePosted:0
            },
             {
                orderNo:'56706',
                orderCount:0 ,
                toBeConfirm:20,
                toBeShip:30,
                toBeInvoiced:20,
                toBePosted:1
            }
        ],
      }
    },
    computed:{
        
    },
    methods: {
      getColor (item) {
        if (item.orderCount != 0) return 'green' ;
        else if (item.toBeConfirm != 0) return 'orange';
        else if (item.toBeShip != 0) return 'purple ';
        else if (item.toBeInvoiced != 0) return 'blue';
        else if (item.toBePosted != 0) return 'red lighten--2';
        else return 'red';
      },
      toBeConfirmColor (item){
            if(item.toBeConfirm !=0 ){
                return 'orange';
            }else{
                return ''
            }
      },
      toBeShipColor (item){
            if(item.toBeShip !=0 ){
                return 'red lighten--2';
            }else{
                return ''
            }
      },
       toBePostedColor (item){
            if(item.toBePosted !=0 ){
                return 'purple lighten--2';
            }else{
                return ''
            }
      },
       toInvoicedColor (item){
            if(item.toBeInvoiced !=0 ){
                return 'blue lighten--2';
            }else{
                return ''
            }
      }
      
      
    },
  }
</script>