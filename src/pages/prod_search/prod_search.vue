<template>
  <div>
    <body>
      <div
        class="psearchcol"
        style="overflow-x: hidden;"
      >
        <div class="psearchcol1">
          <div class="searchbykey">
            <strong>Search</strong>
            <br>
            <input
              v-model="brand"
              type="text"
              placeholder="search by keyword"
            ><br>
          </div>
          <div class="sortbyprice">
            <strong>Sort By Price</strong><br>
            <input
              type="radio"
              name="sort"
              @click="ascending"
            >
            <label for="Ascending">Low to High</label><br>
            <input
              type="radio"
              name="sort"
              @click="descending"
            >
            <label for="Descending">High to Low</label><br>
          </div>
        </div>
        <div style="text-decoration:none;color:black">
          <div class="psearchcol2">
            <div
              v-for="product in brandfilter"
              :key="product.prod_id"
              class="psearchrows"
            >
              <router-link
                :to="'/productdetails/'+ product.prod_id"
                style="color:black"
              >
                <div class="searchimage">
                  <img :src="product.Image">
                </div>
                <div class="psearchtext">
                  <h2 class="psprodname">
                    <strong>{{ product.ProductName|truncate }}</strong>
                  </h2>
                  <br>
                  <a
                    v-if="Number(product.MRP)"
                  ><a style="text-decoration:line-through">&#8377; {{ product.MRP }}<br></a></a>
                  <a>&#8377; {{ product.Price }}</a>
                  <br>
                  Rating: {{ product.Rating }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
// import products from '@/assets/data/products.json'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'PrSearch',
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
      products: [],
      brand: ''
    }
  },
  computed: {
    brandfilter: function () {
      return this.products.filter((product) => {
        return product.ProductName.toUpperCase().match(this.brand.toUpperCase())
      })
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    async search () {
      const response = await AuthenticationService.prodsearch(this.$route.query.search)
      this.products = response.data
    },
    ascending () {
      this.products.sort((a, b) => (a.Price > b.Price) ? 1 : -1)
    },
    descending () {
      this.products.sort((a, b) => (a.Price < b.Price) ? 1 : -1)
    }
  }
}
</script>

<style>
.psearchcol1 {
  width: 20%;
  height: 600px;
  background-color: rgb(253, 253, 253);
  border-radius: 2px;
  margin: 3.5% 2%;
  float: left;
  padding: auto;
  box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
.searchbykey {
  margin: 0px auto;
  /* border-bottom: 1px solid rgb(168, 168, 168); */
  width: 100%;
  padding: 5%;
}
.searchbykey input[type=text] {
  width: 100%;
  border: none;
  border-bottom: 1px solid rgb(158, 158, 158);
  background-color: rgb(240, 240, 240);
  outline: none;
  padding: 2%;
  padding-bottom: 0px;
}
.sortbyprice {
  width: 100%;
  /* border-bottom: 1px solid rgb(168, 168, 168); */
  padding: 5%;
}
.sortbyprice input[type= radio] {
  height: 15px;
  width: 15px;
}
.sortbyprice label {
  margin-left: 5%;
}
.psearchcol2 {
  width: 75%;
  height: 80%;
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  margin: 3.5% 0.5%;
  float: left;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serifS;
}
.psearchrows {
    border-radius: 2x;
    margin-bottom: 2.5% ;
    box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;
    height: 300px;
    width:97%;
}
.psearchrows img {
    max-height: 100%;
    width: auto;
    height: auto;
    display: block;
    margin: auto !important;
    border-radius: 2x;
    max-width: 100%;
}
.searchimage {
  width: 30%;
  height: 100%;
  float: left;
}
.psearchtext {
  float: right;
  height: 100%;
  width: 70%;
  text-align: left;
  font-size: 20px;
  padding: 2%;
}
.psprodname {
    border-bottom: 1px solid rgb(146, 146, 146);
    padding-bottom: 2%;
    font-size: 30px;
    display: block;
    max-height: 40%;
    overflow: hidden;
}
@media screen and (max-width:700px) {
  .psearchcol1 {
    font-size: 1.8vw;
    height: 300px;
  }
  .searchbykey input[type=text] {
    height: 20px;
  }
  .sortbyprice input[type= radio] {
    height: 7.5px;
    width: 7.5px;
  }
  .psearchrows {
    height: 135px;
  }
  .psearchtext {
    font-size: 2vw;
  }
  .psprodname {
    font-size: 3vw;
  }
}
</style>
