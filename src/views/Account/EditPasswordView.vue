<template>
  <div class="wrapper_signup_page">
    <div class="inner_signup_page">
      <div class="container">
        <h1 class="mb-6 text-center">Edit password</h1>
        <div class="row">
          <div class="col">
            <form class="space-y-6" v-on:submit.prevent="submitForm">
              <div class="mb-3">
                <label class="form-label" for="old_password">Old password</label>
                <input
                  type="password"
                  v-model="form.old_password"
                  id="old_password"
                  placeholder="Your old password"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label class="form-label" for="new_password1">New password</label>
                <input
                  type="password"
                  v-model="form.new_password1"
                  id="new_password1"
                  placeholder="Your new password"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label class="form-label" for="new_password2">Repeat password</label>
                <input
                  type="password"
                  v-model="form.new_password2"
                  placeholder="Repeat password"
                  id="new_password2"
                  class="form-control"
                />
              </div>

              <template v-if="errors.length > 0">
                <div class="bg-red-300 text-white rounded-lg p-6">
                  <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>
              </template>

              <div>
                <button class="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'

export default {
  name: 'EditPasswordView',

  setup() {
    const toastStore = useToastStore()
    const userStore = useUserStore()

    return {
      toastStore,
      userStore
    }
  },

  data() {
    return {
      form: {
        old_password: '',
        new_password1: '',
        new_password2: ''
      },
      errors: []
    }
  },

  methods: {
    submitForm() {
      this.errors = []

      if (this.form.password1 !== this.form.password2) {
        this.errors.push('The password does not match')
      }

      if (this.errors.length === 0) {
        let formData = new FormData()
        formData.append('old_password', this.form.old_password)
        formData.append('new_password1', this.form.new_password1)
        formData.append('new_password2', this.form.new_password2)

        axios
          .post('/api/editpassword/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            if (response.data.message === 'success') {
              this.toastStore.showToast(5000, 'The information was saved', 'bg-emerald-500')

              this.$router.push(`/ProfileView/${this.userStore.user.id}`)
            } else {
              const data = JSON.parse(response.data.message)

              for (const key in data) {
                this.errors.push(data[key][0].message)
              }
            }
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
  YTJ4TY4-TMPN-TLK9-N4PT-MN66
-->
