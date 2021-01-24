<template>
  <div class="oneline">
    <div class="e-commerce">
      <strong><router-link to="/"><a>E-commerce</a></router-link></strong>
    </div>
    <div class="searchbar">
      <form
        action="/productsearch"
        method="get"
        style="width:100%;"
      >
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search..."
        >
      </form>
    </div>
    <div class="icons">
      <b-nav style=" height:100%; width:100%;">
        <b-nav-item-dropdown
          text="Account"
          right
          style="height:100%; width:33.33%; display: flex;justify-content:center;align-items: center;"
        >
          <div v-if="si == 'true'">
            <b-dropdown-item>
              <router-link to="/profile">
                <a style="color:black; text-decoration:none;">
                  Profile
                </a>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/profile/addproduct">
                <a style="color:black; text-decoration:none;">
                  Sell
                </a>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <a
                style="color:black"
                @click="logout"
              >
                Sign-Out
              </a>
            </b-dropdown-item>
          </div>
          <div v-else>
            <b-dropdown-item>
              <router-link to="/login">
                <a style="color:black">
                  Sign-In
                </a>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/register">
                <a style="color:black">
                  Create Account
                </a>
              </router-link>
            </b-dropdown-item>
          </div>
        </b-nav-item-dropdown>
        <b-nav-item style="height:100%; width:33.33%;display: flex;justify-content:center;align-items: center;">
          <router-link :to="this.cart">
            Cart
          </router-link>
        </b-nav-item>
        <b-nav-item style="height:100%; width: 33.33%;display: flex;justify-content:center;align-items: center;">
          <router-link :to="this.order">
            Orders
          </router-link>
        </b-nav-item>
      </b-nav>
    </div>
  </div>
  <!-- <div class="oneline">
    <div class="e-commerce">
      <strong><router-link to="/"><a
        style="color:white; text-decoration:none; width:20%"
      >E-commerce</a></router-link></strong>
    </div>
    <form
      action="/productsearch"
      method="get"
    >
      <div class="searchbar">
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search..."
          style="width:600px"
        >
      </div>
    </form>
    <div class="icons">
      <b-nav>
        <b-nav-item-dropdown
          text="Account"
          right
        >
          <div v-if="si == 'true'">
            <b-dropdown-item>
              <router-link to="/profile">
                <a style="color:black; text-decoration:none;">
                  Profile
                </a>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/profile/addproduct">
                <a style="color:black; text-decoration:none;">
                  Sell
                </a>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <a
                style="color:black"
                @click="logout"
              >
                Sign-Out
              </a>
            </b-dropdown-item>
          </div>
          <div v-else>
            <b-dropdown-item>
              <router-link to="/login">
                <a style="color:black">
                  Sign-In
                </a>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/register">
                <a style="color:black">
                  Create Account
                </a>
              </router-link>
            </b-dropdown-item>
          </div>
        </b-nav-item-dropdown>
        <b-nav-item>
          <router-link :to="this.cart">
            <a style="color:white;">Cart</a>
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link :to="this.order">
            <a style="color:white">Orders</a>
          </router-link>
        </b-nav-item>
      </b-nav>
    </div>
  </div> -->
</template>

<script>
// import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Header',
  data () {
    return {
      si: localStorage.getItem('loggedin'),
      cart: '/profile/cart',
      order: '/profile/orders'
    }
  },
  mounted () {
    this.wishl_order()
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
      this.$router.go()
    },
    wishl_order () {
      if (!localStorage.getItem('loggedin')) {
        this.wishl = '/login'
        this.order = '/login'
      }
    }
  }
}
</script>

<style>
.oneline {
  margin: 0px;
  width: 100%;
  background-color: rgb(0, 0, 0);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  float: left;
}
 .e-commerce {
  color: white;
  width: 25%;
  height: 100%;
  text-align: center;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.e-commerce a {
  font-size: 25px;
  color: white;
}
.e-commerce a:hover {
  text-decoration: none;
  color: white;
}
.searchbar {
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
}
.searchbar input[type=text]{
  width: 90%;
  padding: 5px 15px;
  border-radius: 5px;
}
.searchbar:focus {
  min-width: 500px;
  width: auto;
}
.icons{
  color: white;
  width: 25%;
  height: 100%;
  float: left;
  font-size: 17px;
}
.icons a{
  color: white;
}
.icons a:hover{
  color: white;
  text-decoration: none;
}
@media screen and (max-width:700px) {
  .oneline {
    display: flex;
    height: 70px;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .e-commerce{
    order: 1;
    width: 100%;
    height: 60%;
  }
  .e-commerce a {
    font-size: 4vw;
  }
  .searchbar {
    order: 2;
    height: 30%;
    width: 60%;
  }
  .searchbar input[type=text]{
    width: 100%;
    height: 6vw;
    font-size: 2vw;
  }
  .icons {
    order: 3;
    width: 25%;
    height: 30%;
  }
  .icons a {
    font-size: 2.5vw;
  }
}
/* .oneline {
  margin: 0px;
  width: 100%;
  background-color: rgb(0, 0, 0);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  float: left;
}
.e-commerce {
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: auto;
  width: 25%;
  float: left;
  display: flex;
}
.e-commerce a {
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 30px;
  text-decoration: none;
}
.searchbar input[type=text]{
  border: none;
  padding: 7px;
  margin-top: 10px;
  border-radius: 7px;
  align-content: center;
  width: 500px;
  display: inline-block;
}
a{
  color: white;
} */
</style>
