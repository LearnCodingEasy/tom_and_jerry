<template>
  <div class="wrapper_login_page">
    <div class="inner_login_page">
      <div class="container">
        <h1 class="mb-6 text-2xl">Log in</h1>
        <form class="space-y-6" v-on:submit.prevent="submitForm">
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label class="form-label" for="email">E-mail</label><br />
                <input
                  type="email"
                  v-model="form.email"
                  id="email"
                  placeholder="Your e-mail address"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label class="form-label" for="password">E-mail</label><br />
                <input
                  type="password"
                  v-model="form.password"
                  id="password"
                  placeholder="Your e-mail address"
                  class="form-control"
                />
              </div>
              <!-- Errors -->
              <template v-if="errors.length > 0">
                <div class="alert alert-danger" role="alert">
                  <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>
              </template>
            </div>
            <div class="col-12 mt-3">
              <!-- Sign up -->
              <div class="d-grid gap-2">
                <p class="font-bold">
                  Don't have an account?
                  <RouterLink to="/SignupView" class="underline">Click here</RouterLink>
                  to create one!
                </p>
                <button class="btn btn-primary">Log In</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { RouterLink } from 'vue-router'

import { useUserStore } from '@/stores/user'

export default {
  name: 'loginView',
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: []
    }
  },
  methods: {
    async submitForm() {
      this.errors = []
      if (this.form.email === '') {
        this.errors.push('Your e-mail is missing')
      }
      if (this.form.password === '') {
        this.errors.push('Your password is missing')
      }
      if (this.errors.length === 0) {
        await axios
          .post('/api/login/', this.form)
          .then((response) => {
            this.userStore.setToken(response.data)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access
          })
          .catch((error) => {
            console.log('error', error)

            this.errors.push('The email or password is incorrect! Or the user is not activated!')
          })
      }
      if (this.errors.length === 0) {
        await axios
          .get('/api/me/')
          .then((response) => {
            this.userStore.setUserInfo(response.data)

            this.$router.push('/')
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
    }
  }
}
</script>

<!-- 
  Name           = Hossam Rashad
  Personal Phone = 01091642528
  Public Phone   = 01101853042
  Address        = Egypt
  E-mail         = learncodingeasy@yahoo.com
  Password       = zxc123456789
-->
