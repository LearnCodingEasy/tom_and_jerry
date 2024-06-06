<template>
  <div class="wrapper_add_product_page">
    <div class="inner_add_product_page">
      <div class="container">
        <h1 class="text-center my-5">T&J Products</h1>
        <div class="row row-cols-md-3 row-cols-sm-1">
          <div class="col mb-4" v-for="product in products" v-bind:key="product.id">
            <!-- style="width: 18rem" -->
            <div class="card shadow-lg p-3 mb-5 bg-body rounded">
              <img
                v-if="product.product_image_cover_thumbnail"
                alt="If product image cover thumbnail "
                :src="completeImagePath(product.product_image_cover_thumbnail)"
                class="card-img-top rounded img-fluid"
                style="max-height: 250px; height: 250px"
              />
              <img
                v-else
                src="https://picsum.photos/1920/1920"
                class="card-img-top rounded"
                alt="Else"
                style="max-height: 350px; height: 350px"
              />
              <div class="card-body">
                <h5 class="card-title">{{ product.product_name_ar }}</h5>
                <h5 class="card-title">{{ product.product_name_en }}</h5>
                <p class="card-text">
                  {{ product.created_at_formatted }}
                  <br />
                  {{ product.product_status }}
                  <br />
                  {{ product.product_purchase_price_and_expenses }}
                  <br />
                  {{ product.product_purchase_date }}
                  <br />
                  {{ product.created_by.name }}
                </p>
                <RouterLink
                  class="btn btn-primary d-block"
                  :to="{ name: 'ProductId', params: { id: product.id } }"
                  >Details</RouterLink
                >
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

export default {
  name: 'ProductsList',

  components: {},

  data() {
    return {
      products: []
    }
  },

  mounted() {
    this.getProducts()
  },

  methods: {
    getProducts() {
      axios
        .get('/api/products/')
        .then((response) => {
          console.log('data', response.data)

          this.products = response.data
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    completeImagePath(path) {
      if (!path.startsWith('http://') && !path.startsWith('https://')) {
        return `http://127.0.0.1:8000/${path}`
      }
      return path
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
