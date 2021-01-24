<template>
  <div id="ecom">
    <div>
      <h1>E-commerce</h1>
    </div>
    <a id="name">Username</a>
    <div class="nameclass">
      <input
        v-model="user"
        type="text"
        name="name_user"
        required
      >
    </div>
    <a id="emailc">Email-Id</a>
    <div class="email-sign">
      <input
        v-model="email"
        type="text"
        name="email"
        required
      >
    </div>
    <a id="passc">Password</a>
    <div class="pass-sign">
      <input
        v-model="password"
        type="password"
        name="password"
        required
      >
    </div>
    <div id="cbut">
      <button @click="register">
        Create Account
      </button>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'SignUp',
  data () {
    return {
      user: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        user: this.user,
        email: this.email,
        password: this.password
      })
      if (response.data) {
        this.$router.push('/login')
      } else {
        this.error = 'Invalid'
      }
    }
  }
}
</script>

<style>
#ecom {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin: 5% auto;
  width: 50%;
  height: 400px !important;
  border: 2px solid black;
  border-bottom-width:15px;
  border-radius: 2px;
}
input {
  width: 60%;
  height: 35px;
  border: 1px solid black;
  outline: none;
}
#Create {
  margin: 50px 0px 0px 0px
}
#forgot {
  margin: 5px 0px 0px 180px
}
button {
  margin: 10px auto;
  width: 40%;
  height: 40px;
  color: white;
  background-color: black;
}
@media screen and (max-width:700px) {
.nameclass input[type=text]{
  height: 15px;
}
.cbut {
  width: 100%;
  margin-top: 5%;
}
button {
  margin-top: 10%;
  display: block;
  width: 50%;
  height: 20px;
  color: white;
  font-size: 2vw;
  background-color: black;
}
#name, #emailc, #passc {
  display: block;
  margin-bottom: -5px;
  margin-top: 5px;
}
.pass-sign {
  margin-bottom: 10px;
}
}
</style>
