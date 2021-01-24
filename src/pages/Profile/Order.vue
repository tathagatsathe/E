<template>
  <div>
    <body>
      <strong class="orderhead">Order Id: {{ this.$route.params.orderid }} details</strong>
      <div
        v-for="product in order"
        :key="product.order_det_id"
        class="profrowc1"
      >
        <router-link :to="'/productdetails/' + product.prod_id">
          <div
            class="c_orders11"
            style="overflow: hidden"
          >
            <img :src="product.Prod_Image">
          </div>
          <div
            class="c_orders22"
          >
            <h10><b>{{ product.Prod_Name|truncate }}</b></h10><br>
            <h8 style="float:left">
              Quantiy: {{ product.det_quantity }}
            </h8>
            <!-- <h9>Product Id:{{product.order_id}}</h9><br> -->
            <h7 style="float:right">
              Price: &#8377; {{ product.det_price }}
            </h7><br>
          </div>
        </router-link>
      </div>
    </body>
  </div>
</template>

<script>
// import products from '@/assets/data/products.json'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Order',
  filters: {
    truncate: function (value) {
      if (value && value.length > 30) {
        value = value.substring(0, 30) + '...'
      }
      return value
    }
  },
  data () {
    return {
      order: []
    }
  },
  mounted () {
    this.getorder()
  },
  methods: {
    async getorder () {
      const response = await AuthenticationService.getorder(this.$route.params.orderid)
      this.order = response.data
    }
  }
}
</script>
<style>
.profrowc1 {
  width: 30%;
  height: 300px;
  float: left;
  margin: 1% 1.5%;
  box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
.c_orders11 {
  height: 70%;
  overflow: hidden;
}
.c_orders11 img{
    max-height: 95%;
    display: block;
    margin-top: auto;
    margin-bottom: auto;
    max-width: 95%;
}
.c_orders22 {
  height: 30%;
  font-size: 15px;
  padding: 2%;
  color: black;
}
@media screen and (max-width:700px) {
  .profrowc1 {
    height: 150px;
  }
  .c_orders22 {
    font-size: 1.5vw;
    overflow: hidden;
  }
}
</style>
