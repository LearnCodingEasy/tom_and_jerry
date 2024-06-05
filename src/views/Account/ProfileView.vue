<template>
  <div class="wrapper_signup_page">
    <div class="inner_signup_page">
      <div class="container">
        <h1 class="mb-6 text-center">Edit profile</h1>
        <!-- <img :src="user.get_avatar" class="mb-6 rounded-full" /> -->
        <div class="card mb-3" style="max-width: 940px; margin: auto">
          <div class="row g-0">
            <div class="col-md-4" v-if="user.get_avatar">
              <img :src="user.get_avatar" class="img-fluid rounded-start" alt="" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">
                  <strong>{{ user.name }}</strong>
                </h5>
                <p class="card-text">{{ user.personal_phone }}</p>
                <p class="card-text">{{ user.public_phone }}</p>
                <p class="card-text">{{ user.address }}</p>
                <p class="card-text">
                  <small class="text-muted">
                    <p class="card-text">{{ user.email }}</p>
                  </small>
                </p>
                <div class="mt-6">
                  <RouterLink
                    class="btn btn-primary"
                    v-if="userStore.user.id === user.id"
                    to="EditProfileView"
                  >
                    <!-- :to="{ name: 'EditProfileView', params: { id: userStore.user.id } }" -->
                    Edit profile
                  </RouterLink>
                  <button
                    class="btn btn-danger"
                    @click="logout"
                    v-if="userStore.user.id === user.id"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'

export default {
  name: 'ProfileView',

  setup() {
    const userStore = useUserStore()
    const toastStore = useToastStore()

    return {
      userStore,
      toastStore
    }
  },

  components: {},

  data() {
    return {
      // posts: [],
      user: {
        id: ''
      }
      // can_send_friendship_request: null
    }
  },

  mounted() {
    this.getProfile()
  },

  watch: {
    '$route.params.id': {
      handler: function () {
        this.getProfile()
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    getProfile() {
      axios
        .get(`/api/profile/${this.$route.params.id}/`)
        .then((response) => {
          console.log('data', response.data)

          // this.posts = response.data.posts
          this.user = response.data.user
          // this.can_send_friendship_request = response.data.can_send_friendship_request
        })
        .catch((error) => {
          console.log('error', error)
        })
    },

    logout() {
      console.log('Log out')

      this.userStore.removeToken()

      // this.$router.push('/loginView')

      // إعادة تحميل الصفحة بالكامل بعد التوجيه
      // window.location.reload()
      // توجيه المستخدم إلى صفحة تسجيل الدخول
      this.$router.push('/loginView').then(() => {
        // إعادة تحميل الصفحة بالكامل بعد التوجيه
        window.location.reload()
        this.$router.back()
      })
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
