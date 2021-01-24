<template>
  <div>
    <body>
      <div
        v-if="this.si"
        class="profrow"
      >
        <div class="profcol1">
          <img
            src="https://e7.pngegg.com/pngimages/304/275/png-clipart-user-profile-computer-icons-profile-miscellaneous-logo.png"
            alt="Profile"
            style="height:30%; width:55%;"
            class="profilepic"
          >
          <div
            v-bind="userinfo[0]"
            class="profinfo"
          >
            <div class="profinfalist">
              {{ userinfo[0].FirstName }} {{ userinfo[0].LastName }}
            </div>
            <br>
            <div class="profinfalist">
              {{ userinfo[0].username }}
            </div>
            <br>
            <div class="profinfalist">
              {{ userinfo[0].Phone }}
            </div>
            <br>
            <div class="profinfalist">
              {{ userinfo[0].address }}
            </div>
            <br>
            <div class="profinfalist">
              {{ userinfo[0].City }}
            </div>
            <router-link to="/profile/editprofile">
              <a style="color:black;">Edit Profile</a>
            </router-link>
          </div>
        </div>
        <div class="profcol2">
          <router-view />
        </div>
      </div>
      <div v-else>
        <router-link to="/login">
          <a style="color:black; font-size:50px">Login to View </a>
        </router-link>
      </div>
    </body>
  </div>
</template>

<script>
import products from '@/assets/data/products.json'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Profile',
  data () {
    return {
      products: products,
      userinfo: [ {
        'FirstName': localStorage.getItem('FirstName'),
        'LastName': localStorage.getItem('LastName'),
        'Phone': localStorage.getItem('Phone'),
        'address': localStorage.getItem('address'),
        'City': localStorage.getItem('City'),
        'username': localStorage.getItem('username')
      }],
      si: ''
    }
  },
  mounted () {
    this.si = localStorage.getItem('loggedin')
    this.info()
  },
  methods: {
    async info () {
      AuthenticationService.info({
        id: localStorage.getItem('id')
      })
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
.profrow{
  font-size: 0;
  margin-top: 2%;
}
.profcol1 {
  border: 2px solid rgb(139, 135, 135);
  width: 30%;
  height: 650px;
  font-size: 20px;
  margin: 2%;
  padding: 1% 0;
  float: left;
}
.profcol2 {
  border: 2px solid rgb(139, 135, 135);
  width: 60%;
  height: 650px;
  background-color:  rgb(255, 251, 251);
  margin: 2%;
  float: left;
  overflow: auto;
}
.profptext {
  padding-left: 10px;
}
.profinfo {
  margin-top: 20px;
  text-align: center;
}
.profinfo a {
  padding-top: 10px;
}
.profinfalist {
  border-bottom: 0.5px solid rgb(114, 113, 113);
  margin: 10px 25px 0px 25px;
}
.profilepic {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
@media screen and (max-width:700px) {
  .profcol1 {
    font-size: 2.3vw;
    height: 400px;
  }
  .profcol2 {
    font-size: 2.3vw;
    height: 400px;
    overflow: hidden;
  }
}
</style>
