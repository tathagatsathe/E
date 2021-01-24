<template>
  <div id="ecom">
    <div>
      <h1>E-commerce</h1>
    </div>
    <a id="email">Email-Id</a>
    <div class="email-sign">
      <input
        v-model="email"
        type="text"
        name="emailid"
        required
      >
    </div>
    <a id="pass">Password</a>
    <div class="pass-sign">
      <input
        v-model="password"
        type="password"
        name="password"
        required
      >
    </div>
    <div id="forgot">
      <a
        href="#"
        style="color:black; text-decoration:none;display:block;"
      > Forgot Password? </a>
    </div>
    {{ error }}
    <div id="but">
      <button @click="login">
        Sign-In
      </button>
    </div>
    <div id="Create">
      <router-link to="/register">
        <a style="color:black; text-decoration:none; display:block; margin-top: 10%;">Create an Account</a>
      </router-link>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login () {
      const response = await AuthenticationService.login({
        email: this.email,
        password: this.password
      })
      if (response.data.id === 'Email does not exist') {
        this.error = 'Email does not exist'
      } else if (response.data.id) {
        localStorage.setItem('loggedin', true)
        localStorage.setItem('email', this.email)
        localStorage.setItem('id', response.data.id)
        localStorage.setItem('FirstName', response.data.FirstName)
        localStorage.setItem('LastName', response.data.LastName)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('Phone', response.data.Phone)
        localStorage.setItem('address', response.data.address)
        localStorage.setItem('City', response.data.City)
        this.$router.push('/')
        this.$router.go()
      } else {
        this.error = 'Incorrect Password'
      }
    }
  }
}
</script>

<style lang="scss">
#ecom {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  border: 2px solid black;
  margin: 5% auto;
  width: 50%;
  height: 370px;
  border-radius: 2px;
  border-bottom-width: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.email-sign input[type=text]{
  width: 60%;
  height: 35px;
  outline: none;
}
.pass-sign input[type=password]{
  width: 60%;
  height: 35px;
  outline: none;
}
#Create {
  margin: 50px 0px 0px 0px
}
#forgot {
  margin: 1px 0px 0px 180px
}
button {
  margin: 20px auto;
  width: 25%;
  height: 40px;
  color: white;
  background-color: black;
}
h1 {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
}
#Create a {
  text-decoration: none;
}
@media screen and (max-width:700px) {
#ecom {
  height: 200px !important;
  border-bottom-width: 5px;
}
#email, #pass {
  display: block;
  margin-bottom: -5px;
  margin-top: 5px;
}
#ecom h1 {
  font-size: 4.5vw;
}
#ecom a {
  font-size: 2.5vw;
}
.email-sign {
  height: 15px;
}
.pass-sign {
  height: 15px;
}
#email {
  margin-top: 1px !important;
}
.email-sign input[type=text]{
  height: 15px;
}
.pass-sign input[type=password]{
  height: 15px;
}
button {
  margin: 0 auto;
  width: 25%;
  height: 20px;
  color: white;
  font-size: 2vw;
  background-color: black;
}
#but {
  height: 20%;
}
#forgot {
  font-size: 1.6vw;
  width: 50%;
  float: right;
}

}
</style>
