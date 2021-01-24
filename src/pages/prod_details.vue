<template>
  <div>
    <body>
      <div class="Det">
        <div
          class="row"
          v-bind="product"
        >
          <div class="col_image">
            <img
              class="pr_image"
              :src="product.Image"
            >
          </div>
          <div class="col_text">
            <h2
              class="productname"
              style="height:30%;overflow:hidden;"
            >
              <strong>{{ product.ProductName }}</strong>
            </h2>
            <a
              v-if="Number(product.MRP)"
            ><a style="text-decoration:line-through">&#8377; {{ product.MRP }}</a></a>
            <h3> &#8377; {{ product.Price }}</h3>
            <a>Rating: {{ product.Rating }}</a><br>
            <button
              class="Buy_Now"
              style="color:white; background-color:black;float:left;"
              @click="addtocart"
            >
              Add to Cart
            </button>
            <div style="float:left; width: 10%;">
              <input
                v-model="counter"
                class="counter"
                type="number"
                style="width:100%;margin-top:20%;"
              >
            </div>
            <a v-if="this.addedtocart === 'Added to Cart'">Added to Cart</a>
          </div>
        </div>
        <div class="details">
          <strong>About this Item</strong><br>
          {{ product.Description }}
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'PrDetails',
  data () {
    return {
      product: [],
      producttt: {},
      addedtocart: '',
      counter: 1,
      a: ''
    }
  },
  mounted () {
    this.proddetails()
  },
  methods: {
    async proddetails () {
      const response = await AuthenticationService.proddetails(this.$route.params.id)
      this.product = response.data
      this.addedtocart = ''
    },
    async addtocart () {
      this.addedtocart = 'Added to Cart'
      const cartresponse = await AuthenticationService.addtocart(this.$route.params.id, {
        cust_id: localStorage.getItem('id'),
        Price: this.product.Price,
        prodname: this.product.ProductName,
        image: this.product.Image,
        quantity: this.counter
      })
      this.a = cartresponse.data
    },
    increment () {
      this.counter++
    },
    decrement () {
      this.counter--
    }
  }
}
</script>
<style>
.row {
  width:100%;
}
.productname {
    border-bottom: 1px solid rgb(116, 114, 114);
    width: 100%;
    padding-bottom: 1%;
}
.col_image {
  width: 30%;
  float: left;
  border-radius: 2px;
  margin: 2.5%;
  height: 325px;
  max-height: 10%;
  box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
  overflow: hidden;
}
.pr_image {
  width: auto;
  height: 100%;
  display: block;
  margin:auto;
}
.col_text {
    width: 60%;
    float: left;
    height: 325px;
    margin: 2.5%;
    padding: 2%;
    box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: white;
}
.Buy_Now {
    width: 20%;
    margin-inline: 5%;
    height: 15%;
    border-radius: 2px;
    color: white;
    font-size:15px;
}
.details {
  border-top: 1px solid rgb(7, 7, 7);
  width: 94%;
  margin: 2.5%;
  border-top-width: 0.5vw ;
  box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 1% 2%;
  background-color: white;
}
@media screen and (max-width:700px) {
  .col_image {
    height: 200px;
  }
  .col_text {
    height: 200px;
    font-size: 2.5vw;
  }
  .col_text h2 {
    font-size: 4vw;
    vertical-align: baseline;
  }
  .col_text h3 {
    font-size: 3vw;
  }
  .Buy_Now {
    font-size: 2vw;
  }
  .counter {
    height: 5vw;
  }
  .details {
    font-size: 1.8vw;
  }
}
</style>
