<template>
  <div>
    <body>
      <!-- <router-link to='/profile/orders'> -->
      <strong class="orderhead">Orders</strong>
      <div
        v-for="order in order"
        :key="order.order_id"
        class="c_orders1"
      >
        <router-link :to="'/orders/' + order.order_id">
          <div
            class="c_orders2"
          >
            <h11>Ordered on: <strong>{{ order.order_date }}</strong></h11><br>
            <h8>Id: <strong>{{ order.order_id }}</strong></h8><br>
            <h7>Order total: <strong>{{ order.TotalCost }}</strong></h7><br>
            <h9>Shipping Address: <strong>{{ order.shipping_add }}</strong></h9><br>
          </div>
        </router-link>
      </div>
      <!-- </router-link> -->
    </body>
  </div>
</template>

<script>
// import products from '@/assets/data/products.json'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Orders',
  data () {
    return {
      order: []
    }
  },
  mounted () {
    this.getorders()
  },
  methods: {
    async getorders () {
      const response = await AuthenticationService.getorders({
        cust_id: localStorage.getItem('id')
      })
      this.order = response.data
    }
  }
}
</script>

<style>
.orderhead {
  font-size: 25px;
  display: block;
  margin: 2% 1% 1% 2%;
}
.c_orders1 {
  width: 95%;
  margin: 1% 2%;
  height: 100%;
  padding: 1% 5%;
  float: left;
  box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19);
}
.c_orders2 {
  color: black;
  float: left;
  display: block;
  max-height: 100%;
  font-size:20px;
}
@media screen and (max-width:700px) {
  .c_orders2 {
    font-size: 10px;
  }
  .orderhead {
    font-size: 2.5vw;
  }
}
</style>
