<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <RouterLink class="navbar-brand" to="/">T&J</RouterLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <template v-if="userStore.user.isAuthenticated">
                <!-- <li class="nav-item">
                <RouterLink class="nav-link active" to="/">T&J</RouterLink>
              </li> -->
                <li class="nav-item">
                  <RouterLink class="nav-link active" to="/about">About</RouterLink>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled">Disabled</a>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Products
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <RouterLink class="dropdown-item" to="/ProductsList">Products</RouterLink>
                    </li>

                    <li><hr class="dropdown-divider" /></li>
                    <!-- <li v-if="canCreateProduct"> -->
                    <li>
                      <RouterLink class="dropdown-item" to="/ProductCreate"
                        >Create Product</RouterLink
                      >
                    </li>
                  </ul>
                </li>
              </template>
              <template v-else>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/SignUpView">Sign Up</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/LogInView">Log In</RouterLink>
                </li>
              </template>
            </ul>
            <form class="d-flex" v-if="userStore.user.isAuthenticated">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul class="navbar-nav mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink
                  class="mx-2 btn btn-primary"
                  v-if="userStore.user.id"
                  :to="{ name: 'ProfileView', params: { id: userStore.user.id } }"
                  >Profile</RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <RouterView />
    <Toast />
  </div>
</template>

<script>
import axios from 'axios'
import Toast from '@/components/Toast/Toast.vue'
import { useUserStore } from '@/stores/user'
export default {
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  data() {
    return {
      canCreateProduct: false
    }
  },
  components: {
    Toast
  },
  mounted() {
    /**
    const email = localStorage.getItem('user.email')
    if (email === 'learncodingeasy@yahoo.com') {
      console.log('email: ', email)
      console.log('email: ', 'Is Owner')
      this.canCreateProduct = true
    } else {
      console.log('email: ', 'Is Client')
    }
     */
  },
  beforeCreate() {
    console.log(`Yes`)
    this.userStore.initStore()
    const token = this.userStore.user.access
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  }
}
</script>

<!-- 
  cd tom_and_jerry_vue
  npm run dev
  json-server --watch src\data\products.json
  __________________________________________
  Name           = Hossam Rashad
  Personal Phone = 01091642528
  Public Phone   = 01101853042
  Address        = Egypt
  E-mail         = learncodingeasy@yahoo.com
  Password       = zxc123456789
  __________________________________________
  Name           = Hossam Rashad
  Personal Phone = 01091642528
  Public Phone   = 01101853042
  Address        = Egypt
  E-mail         = bibo2010508@yahoo.com
  Password       = zxc123456789
-->
