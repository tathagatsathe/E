<template>
  <div>
    <body>
      <div class="profrowc11">
        <router-link to="/profile/orders">
          <div class="wish">
            <strong>Orders</strong>
          </div>
        </router-link>
        <div
          v-for="order in products.slice(3,6)"
          :key="order.order_id"
          class="orderrows"
        >
          <router-link :to="'/orders/' + order.order_id">
            <div
              class="ordertextarea"
              style="color:black; height:80%; width:100%;"
            >
              <h11>Ordered on: <strong>{{ order.order_date }}</strong></h11><br>
              <h8>Id: <strong>{{ order.order_id }}</strong></h8><br>
              <h7>Order total: <strong>{{ order.TotalCost }}</strong></h7><br>
              <h9>Shipping Address: <strong>{{ order.shipping_add }}</strong></h9><br>
            </div>
          </router-link>
        </div>
      </div>
      <div class="profrowc22">
        <router-link to="/profile/cart">
          <div class="wish">
            <strong>Cart</strong>
          </div>
        </router-link>
        <div
          v-for="product in products.slice(0,3)"
          :key="product.prod_id"
          class="profprows"
        >
          <router-link
            :to="'/productdetails/' + product.prod_id"
            style="color:black;"
          >
            <img :src="product.Prod_Image">
            <div class="profptext">
              <strong>{{ product.Prod_Name|truncate }}</strong><br>
              <a>&#8377; {{ product.price }}</a>
            </div>
          </router-link>
        </div>
      </div>
    </body>
  </div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'ProfileHome',
  filters: {
    truncate: function (value) {
      if (value && value.length > 40) {
        value = value.substring(0, 40) + '...'
      }
      return value
    }
  },
  data () {
    return {
      products: [],
      userinfo: [ {
        'FirstName': localStorage.getItem('FirstName'),
        'LastName': localStorage.getItem('LastName'),
        'Phone': localStorage.getItem('Phone'),
        'address': localStorage.getItem('address'),
        'City': localStorage.getItem('City'),
        'username': localStorage.getItem('username')
      }]
    }
  },
  mounted () {
    this.si = localStorage.getItem('loggedin')
    this.info()
  },
  methods: {
    async info () {
      const response = await AuthenticationService.info({
        id: localStorage.getItem('id')
      })
      this.products = response.data
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: 'montserrat', sans-serif;
  margin: 0px;
}
.wish{
  color: black;
  font-size: 20px;
  margin: 1% 2%;
}
/* .profcol1 {
  border: 2px solid rgb(139, 135, 135);
  width: 30%;
  height: 650px;
  background-color: rgb(255, 251, 251);
  margin: 0px 0px 30px 30px;
  color: black;
  padding-top: 20px;
  float: left;
} */
/* .profcol2 {
  border: 2px solid rgb(139, 135, 135);
  width: 60%;
  height: 650px;
  background-color:  rgb(255, 251, 251);
  float: left;
  margin-left: 40px;
  padding: 10px;
  padding-right: 20px;
} */
.profrowc11 {
  border: 1px solid rgb(139, 135, 135);
  width: 95%;
  height: 295px;
  margin: 2%;
}
.profrowc22 {
  width: 95%;
  height: 295px;
  margin: 2%;
  border: 1px solid rgb(139, 135, 135);
}
.orderrows {
  height: 70%;
  padding: 2%;
  width:30%;
  float:left;
  margin: 1% 1.5%;
  overflow:hidden;
  box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
.ordertextarea {
  font-size:15px;
}
.profprows{
  width: 30%;
  height: 80%;
  float: left;
  margin: 1% 1.5%;
  box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
.profprows img {
  height: 70%;
  width: auto;
  margin: auto;
  display: block;
  border-radius: 0px;
}
@media screen and (max-width:700px) {
  .wish{
    font-size: 2vw;
  }
  .profrowc11 {
    height: 180px;
    font-size: 1vw;
  }
  .ordertextarea {
    font-size: 1.5vw;
  }
  .profrowc22 {
    height: 180px;
    font-size: 1vw;
  }
}
</style>
