<template>
  <div class="wrapper_signup_page">
    <div class="inner_signup_page">
      <div class="container">
        <h1 class="mb-6 text-center">Edit profile</h1>
        <form class="space-y-6" v-on:submit.prevent="submitForm">
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label><br />
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  placeholder="Your full name"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label class="form-label" for="email">E-mail</label><br />
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  placeholder="Your e-mail address"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label class="form-label" for="file">Avatar</label><br />
                <input type="file" class="form-control" ref="file" />
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label class="form-label" for="email">Personal Phone</label><br />
                <input
                  type="number"
                  id="personal_phone"
                  v-model="form.personal_phone"
                  placeholder="Your Personal Phone"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label class="form-label" for="public_phone">Public Phone</label><br />
                <input
                  type="number"
                  id="public_phone"
                  v-model="form.public_phone"
                  placeholder="Your Public Phone"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label class="form-label" for="address">Address</label><br />
                <input
                  type="text"
                  id="address"
                  v-model="form.address"
                  placeholder="Your Address"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <template v-if="errors.length > 0">
            <div class="bg-red-300 text-white rounded-lg p-6">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
          </template>

          <div>
            <button class="btn btn-warning">Save changes</button>
            <RouterLink class="btn btn-primary" to="/EditPasswordView">
              <!-- :to="{ name: 'EditPasswordView', params: { id: userStore.user.id } }" -->
              Edit Password
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'

export default {
  name: 'EditProfileView',

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
        email: this.userStore.user.email,
        name: this.userStore.user.name,
        personal_phone: this.userStore.user.personal_phone,
        public_phone: this.userStore.user.public_phone,
        address: this.userStore.user.address
        // address
      },
      errors: []
    }
  },

  methods: {
    submitForm() {
      this.errors = []

      if (this.form.email === '') {
        this.errors.push('Your e-mail is missing')
      }

      if (this.form.name === '') {
        this.errors.push('Your name is missing')
      }

      if (this.errors.length === 0) {
        let formData = new FormData()
        formData.append('avatar', this.$refs.file.files[0])
        formData.append('name', this.form.name)
        formData.append('email', this.form.email)
        formData.append('personal_phone', this.form.personal_phone)
        formData.append('public_phone', this.form.public_phone)
        formData.append('address', this.form.address)

        axios
          .post('/api/editprofile/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            if (response.data.message === 'information updated') {
              this.toastStore.showToast(5000, 'The information was saved', 'bg-emerald-500')

              this.userStore.setUserInfo({
                id: this.userStore.user.id,
                name: this.form.name,
                email: this.form.email,
                personal_phone: this.form.personal_phone,
                public_phone: this.form.public_phone,
                address: this.form.address,
                avatar: response.data.user.get_avatar
              })

              this.$router.back()
            } else {
              this.toastStore.showToast(
                5000,
                `${response.data.message}. Please try again`,
                'bg-red-300'
              )
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
-->
