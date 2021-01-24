<template>
  <div>
    <body>
      <div class="slid">
        <Slider />
      </div>
      <div class="ads">
        <div class="containr">
          <div
            v-for="product in watches.slice(0,3)"
            :key="product.prod_id"
            class="containr-box"
            style="width:31%"
          >
            <router-link
              :to="'/productdetails/' + product.prod_id"
              style="color:black"
            >
              <img :src="product.Image">
              <div style="height:20%; padding: 1% 2%">
                <a><b>{{ product.ProductName|truncate }}</b></a>
              </div>
              <div style="height:10%; padding: 1% 2%">
                <a>&#8377; {{ product.Price }}</a>
              </div>
            </router-link>
          </div>
        </div>
        <div><strong><a style="margin-left:1%; font-size:2.5vw;">Furniture</a></strong></div>
        <div class="containr">
          <div
            v-for="product in furniture.slice(1,3)"
            :key="product.prod_id"
            class="containr-box"
            style="width:48%"
          >
            <router-link
              :to="'/productdetails/' + product.prod_id"
              style="color:black"
            >
              <img :src="product.Image">
              <div style="height:20%; padding: 1% 2%">
                <a><b>{{ product.ProductName|truncate }}</b></a>
              </div>
              <div style="height:10%; padding: 1% 2%">
                <a>&#8377; {{ product.Price }}</a>
              </div>
            </router-link>
          </div>
        </div>
        <div><strong><a style="margin-left:1%; font-size:2.5vw;">Mobiles</a></strong></div>
        <div class="containr">
          <div
            v-for="product in mobiles"
            :key="product.prod_id"
            class="containr-box"
            style="width:18%;"
          >
            <router-link
              :to="'/productdetails/' + product.prod_id"
              style="color:black"
            >
              <img :src="product.Image">
              <div style="height:20%; padding: 1% 2%;overflow:hidden;">
                <a><b>{{ product.ProductName|truncate }}</b></a>
              </div>
              <div style="height:10%; padding: 1% 2%">
                <a>&#8377; {{ product.Price }}</a>
              </div>
            </router-link>
          </div>
        </div>
        <div class="column3">
          <div
            v-for="product in watches.slice(3,4)"
            :key="product.id"
          >
            <div style="width:50%;float:left;">
              <img
                :src="product.Image"
                style="border-radius:0px;"
              >
            </div>
            <div
              class="textcol3"
              style="height:100%; width:50%;padding: 1%; float: left;"
            >
              <router-link
                :to="'/productdetails/'+ product.prod_id"
                style="color:black"
              >
                <div><a><b>{{ product.ProductName|truncate }}</b></a></div>
                <div><a>&#8377; {{ product.Price }}</a></div>
              </router-link>
            </div>
          </div>
        </div>
        <div><strong><a style="margin-left:1%; font-size:2.5vw;"> Watches </a></strong></div>
        <div class="scrolling-wrapper">
          <div
            v-for="product in watches"
            :key="product.prod_id"
            class="card"
            style="height:90%;width:20%;margin-top: 1%;margin-right:1.5%;"
          >
            <router-link
              :to="'/productdetails/' + product.prod_id"
              style="color:black;"
            >
              <div style="height:70%;">
                <img
                  :src="product.Image"
                  style="height:100%;width:auto; display:block; margin-right:auto; margin-left:auto;"
                >
              </div>
              <div style="height:15%;overflow:hidden;padding: 0 2%;">
                <a><b>{{ product.ProductName|truncate }}</b></a>
              </div>
              <div style="height:15%;padding:0 2%;">
                <a>&#8377; {{ product.Price }}</a>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import Slider from '@/components/Slider.vue'
// import Carousel from '@/components/carousel.vue'
import products from '@/assets/data/products.json'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'HomePage',
  components: {
    Slider
  },
  filters: {
    truncate: function (value) {
      if (value && value.length > 50) {
        value = value.substring(0, 50) + '...'
      }
      return value
    }
  },
  data () {
    return {
      products: products,
      mobiles: [],
      watches: [],
      furniture: []
    }
  },
  mounted () {
    this.ads()
  },
  methods: {
    async ads () {
      const response = await AuthenticationService.home()
      this.products = response.data
      this.mobiles = response.data.slice(0, 5)
      this.furniture = response.data.slice(16, 19)
      this.products.forEach(element => {
        if (element.Category === 'Watches') {
          if (element.Category === 'Watches') {
            this.watches.push(element)
          }
        }
      })
    }
  }
}
</script>

<style>
 .containr{
  display: flex;
  justify-content: space-around;
  height: 300px;
  width: 100%;
  overflow: hidden;
}
.containr-box {
  box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: 85%;
  margin-top: auto;
  margin-bottom: auto;
}
.containr-box img {
  height: 70%;
  display: block;
  width: auto;
  margin: auto;
}
.scrolling-wrapper::-webkit-scrollbar {
    display: none;
}
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  height:350px;
  width:100%;
  margin-bottom:2%;
  margin-left:1%;
}
.card {
  display: inline-block;
  box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  vertical-align: center;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'montserrat', sans-serif;
  margin: 0px;
}
.ads {
  margin: 0px 5px;
  overflow: hidden;
}
.slid {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
  height: 450px;
  margin-bottom: 50px;
  width: 100%;
}
.column3 {
  width: 97.3% !important;
  box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  margin: 1%;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  height: 300px;
}
.column3 img {
  margin: 0px auto;
  width: auto;
  display: block;
  height: 300px;
}
.column3 a{
  font-size: 30px;
  width: 50%;
  height: 100%;
}
@media screen and (max-width:700px) {
  .slid {
    height: 120px;
    margin-bottom: 5%;
  }
  .containr {
    height: 120px;
    overflow: hidden;
  }
  .containr-box a {
    font-size: 1.8vw;
  }
  .column3 {
    height: 120px;
  }
  .column3 img {
    height: 120px;
  }
  .column3 a {
    font-size: 15px;
  }
  .scrolling-wrapper {
  height:120px;
  width:100%;
  margin-bottom:2%;
  margin-left:1%;
}
.card a {
  font-size: 2vw;
}
}
</style>
