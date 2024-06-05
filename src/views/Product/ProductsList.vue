<template>
  <div class="wrapper_add_product_page">
    <div class="inner_add_product_page">
      <div class="container">
        <h1 class="text-center my-5">T&J Products</h1>
        <div class="row">
          <div class="col-md-4 mb-4" v-for="product in products" v-bind:key="product.id">
            <!-- style="width: 18rem" -->
            <div class="card">
              <img
                v-if="product.get_product_image_cover"
                :src="product.get_product_image_cover"
                alt="..."
              />
              <img v-else src="https://picsum.photos/1920/1920" class="card-img-top" alt="..." />

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
    }
  }
}
</script>

<!-- 
  cd tom_and_jerry_vue
  npm run dev
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
