<template>
  <div>
    <body>
      <div class="pcartcol">
        <a
          class="carthead"
          style="color:black;"
        >Your Cart's Total: <strong>&#8377;{{ total }}</strong></a>
        <div
          v-for="product in product"
          :key="product.cart_id"
          class="pcartrows"
        >
          <router-link
            :to="'/productdetails/'+ product.prod_id"
            style="color:black"
          >
            <div class="pcartimage">
              <img :src="product.Prod_Image">
            </div>
            <div class="pcarttext">
              <div style="overflow:hidden;">
                <a
                  class="cartprodname"
                  style="color: black;"
                >
                  <b>{{ product.Prod_Name|truncate }}</b>
                </a>
              </div>
              &#8377; {{ product.price }}<br>
            </div>
          </router-link>
          <div class="q_andr">
            <a style="float:left;">Quantity: {{ product.quantity }}</a><a
              style="float:right;"
              @click="removefromcart(product.cart_id)"
            >Remove from Cart</a>
          </div>
          <br>
        </div>
        <button @click="buy">
          Place Order
        </button>
      </div>
    </body>
  </div>
</template>
<script>
// import product from '@/assets/data/products.json'
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Cart',
  filters: {
    truncate: function (value) {
      if (value && value.length > 25) {
        value = value.substring(0, 25) + '...'
      }
      return value
    }
  },
  data () {
    return {
      product: [],
      price: 1,
      cart: '',
      total: 0,
      ordered: 0
    }
  },
  mounted () {
    this.getcart()
  },
  methods: {
    async buy () {
      var dateObj = new Date()
      var date = dateObj.getDate() + '/' + dateObj.getMonth() + 1 + '/' + dateObj.getFullYear()
      const response = await AuthenticationService.buy({
        cust_id: localStorage.getItem('id'),
        order_date: date,
        shipping_add: localStorage.getItem('address'),
        cust_email: localStorage.getItem('email'),
        totalcost: this.total,
        product: this.product,
        det_quantity: 1
      })
      if (Number(response.data)) {
        this.$router.push('/profile/checkout')
      }
    },
    async getcart () {
      const response = await AuthenticationService.getcart({
        id: localStorage.getItem('id')
      })
      this.product = response.data
      this.total = 0
      var x = 0
      this.product.forEach(function (Item) {
        x = x + Number(Item.price)
      })
      this.total = x
    },
    async removefromcart (cart) {
      const response = await AuthenticationService.removefromcart({
        cart_id: cart
      })
      if (response.data.affectedRows) {
        this.$router.go()
      }
    }
  }
}
</script>

<style>
.pcartrows {
    width: 30%;
    height: 260px;
    float: left;
    border-radius: 0;
    margin: 1% 1.5%;
    padding: 0% 0% 0.5% 0%;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    box-shadow:0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19);
}
.pcartimage {
    height: 70%;
    display: block;
    margin: 0px auto;
    overflow: hidden;
}
.pcartimage img {
    display: block;
    height: 100%;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    border-radius: 0;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
}
.pcarttext {
    height: 25%;
    width: 100%;
    font-size:15px;
    overflow: hidden;
    padding: 2%;
}
.cartprodname a {
    font-size:15px;
    font-weight: bold;
    overflow: hidden;
}
.q_andr {
  font-size: 12px;
}
.pcartcol button {
    margin-left: 70%;
}
.pcartrows a {
    cursor: pointer;
}
.carthead {
  font-size: 25px;
  margin: 1% 2%;
  display: block;
}
@media screen and (max-width:700px) {
  .pcartrows {
    height: 120px;
  }
  .pcarttext, .cartprodname {
    font-size: 1.5vw;
  }
  .q_andr {
    font-size: 1.2vw;
  }
}
</style>
