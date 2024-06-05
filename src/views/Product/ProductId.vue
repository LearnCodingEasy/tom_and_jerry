<!-- PageProduct -->
<template>
  <div class="page_product">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul class="mt-6">
          <li class="button is-normal">
            <router-link to="/PageDashboard">Dashboard</router-link>
          </li>
          <li class="button is-normal">
            <router-link to="/ProductsList">products</router-link>
          </li>
          <li class="is-active button is-normal">
            <!-- :to="{ name: 'PageProduct', params: { id: product.id } }" -->
            <!-- <router-link
              :to="{ name: 'PageProduct', params: { slug: product.slug } }"
              aria-current="true"
            >
              {{ product.slug }}
            </router-link> -->
          </li>
          <li class="button is-normal">
            <!-- <router-link :to="{ name: 'PageEditIdProduct', params: { id: product.id } }"
              >Edit Id {{ product.id }}</router-link
            > -->
          </li>
          <!-- <li class="button is-normal">
            <router-link :to="{ name: 'PageEditProduct', params: { slug: product.slug } }"
              >Edit Slug</router-link
            >
          </li> -->
        </ul>
      </nav>

      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="product_title">
            <h2 class="title en" dir="aut">{{ product.product_name_en }}</h2>
            <h2 class="title ar" dir="aut">{{ product.product_name_ar }}</h2>
          </div>
          <div class="buttons_helpers">
            <!-- <button @click="getPdf()" class="button button_download_pdf id-dark mt-4">
              Download Pdf
            </button> -->
            <!-- <button @click="download()" class="button id-dark mt-4">Download Pdf download</button> -->
            <!-- <button @click="printBarcode" class="button button_print_barcode is-9by16 mt-4">
              Print Barcode
            </button> -->
          </div>
        </div>
        <!-- card -->
        <div class="column is-12">
          <div class="card">
            <div class="card-image card_image">
              <figure
                class="image is-1by1"
                v-if="selectedPhoto"
                :style="{ 'background-image': selectedPhoto }"
              >
                <template v-if="product.product_image_cover">
                  <img :src="product.get_product_image_cover" :alt="product.product_name_en" />
                </template>
              </figure>

              <!-- مجموعة من الصور -->
              <div class="column is-12">
                <h2 class="title pr-3" dir="auto">مجموعة من الصور</h2>
                <div class="product_images box">
                  <div v-for="image in product.product_image" :key="image.id">
                    <img :src="image.product_image_url" :alt="image.product_image_name" />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-content">
              <div class="media">
                <!-- <div class="media-left">
                  <figure class="image is-48x48">
                    <img
                      src="../../assets/images/tom_and_jerry.png"
                      alt="Placeholder image"
                      class="round"
                    />
                  </figure>
                </div> -->
                <div class="media-content">
                  <p class="title is-4">Tom & Jerry</p>
                  <p class="subtitle is-6">@admin</p>
                </div>
              </div>
              <div class="content">
                <div style="direction: rtl">
                  <span dir="auto" class="subtitle"> {{ product.product_short_description }}</span>
                </div>
                <br />
                <br />
                <a>@TomJerry</a>
                <a href="#">#TomJerry</a>
                <a href="#">#TomJerryStore</a>
                <br />
                <br />
                <time :datetime="product.product_last_modified">{{
                  product.product_last_modified
                }}</time>
              </div>
            </div>
          </div>
        </div>
        <!--  وصف المنتج [البيانات]  -->
        <div class="column is-12">
          <h2 class="title pr-3" dir="auto">وصف المنتج</h2>
          <div class="product_description box">
            <div class="product_text">
              <div v-if="product.product_long_description" dir="auto" class="product_text_data">
                <span class="subtitle">
                  {{ product.product_long_description }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!--  البيانات الشراء [البيانات]  -->
        <!-- v-if="isProductOwner" -->
        <div class="column is-12">
          <h2 class="title pr-3" dir="auto">بيانات الشراء</h2>
          <div class="product_description box">
            <div class="product_text">
              <div v-if="product.product_purchase_price" dir="auto" class="product_text_data">
                <span class="subtitle"> 💵 سعر الشراء </span>
              </div>
            </div>
            <div class="product_text">
              <div
                v-if="product.product_purchase_price_and_expenses"
                dir="auto"
                class="product_text_data"
              >
                <span class="subtitle">
                  {{ product.product_purchase_price_and_expenses }}
                </span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_purchase_price" dir="auto" class="product_text_data">
                <span class="subtitle"> 📅 تاريخ شراء المنتج</span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_purchase_date" dir="auto" class="product_text_data">
                <span class="subtitle">
                  {{ product.product_purchase_date }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!--  قسم المنتج & الالوان المتاحة -->
        <div class="column is-12">
          <h2 class="title pr-3" dir="auto">قسم المنتج & الالوان المتاحة</h2>
          <div class="product_description box">
            <div class="product_text">
              <div v-if="product.product_category" dir="auto" class="product_text_data">
                <span class="subtitle"> 📌 اقسام المنتج </span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_category" dir="auto" class="product_text_data">
                <span class="" v-for="(object, index) in product.product_category" :key="index">
                  <span class="button mr-1 ml-1 data">
                    {{ object.title }}
                  </span>
                  <span class="button mr-1 ml-1 data">
                    {{ object.short_description }}
                  </span>
                </span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_colors" dir="auto" class="product_text_data">
                <span class="subtitle"> 🟠🔘 الالوان المتاحة </span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_colors" dir="auto" class="product_text_data">
                <span class="" v-for="(object, index) in product.product_colors" :key="index">
                  <span
                    class="button mr-1 ml-1 data"
                    :data-color="object.color_hex_code"
                    :style="{ backgroundColor: object.color_hex_code }"
                  >
                    {{ object.color_name }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!--   حالة المنتج [ متاح | محجوز | تم نفاز الكمية  ] -->
        <div class="column is-12">
          <h2 class="title pr-3" dir="auto">حالة المنتج [ متاح | محجوز | نفاز الكمية ]</h2>
          <div class="product_description box">
            <!-- Product Status -->
            <div class="product_text">
              <div v-if="product.product_status" dir="auto" class="product_text_data">
                <span class="subtitle"> حالة المنتج</span>
              </div>
            </div>
            <div class="product_text">
              <!-- <div
                v-for="status in product_status_list"
                v-bind:key="status.id"
                v-bind:value="status"
              >
                {{ status.value }}
              </div> -->
              <div v-if="product.product_status">
                {{ product.product_status }}
              </div>
              <!-- <div v-if="product.product_status" dir="auto" class="product_text_data">
                <span v-if="product.product_status == 'available'" class="button">
                  {{ product.product_status }}</span
                >
                <span v-if="product.product_status == 'sold_out'" class="button is-black data">
                  {{ product.product_status }}</span
                >
                <span v-if="product.product_status == 'reserved'" class="button is-black data">
                  {{ product.product_status }}</span
                >
                <span v-if="product.product_status == 'for_order'" class="button is-black data">
                  {{ product.product_status }}</span
                >
                <span v-if="product.product_status == 'on_order'" class="button is-black data">
                  {{ product.product_status }}</span
                >
              </div> -->
            </div>
            <!-- Product Sizes -->
            <div class="product_text">
              <div v-if="product.product_sizes" dir="auto" class="product_text_data">
                <span class="subtitle"> المقاسات</span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_sizes" dir="auto" class="product_text_data">
                <span class="" v-for="(object, index) in product.product_sizes" :key="index">
                  <span class="product_size_0 button mr-1 ml-1 data">
                    {{ object.sizes_name_year }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!--  بيانات الكود و الكمية -->
        <div class="column is-12">
          <h2 class="title pr-3" dir="auto">بيانات الكود و الكمية</h2>
          <div class="product_description box">
            <div class="product_text">
              <div v-if="product.product_code" dir="auto" class="product_text_data">
                <span class="subtitle">🔢 كود المنتج</span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_code" dir="auto" class="product_text_data">
                <span class="subtitle">
                  {{ product.product_code }}
                </span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_quantity" dir="auto" class="product_text_data">
                <span class="subtitle"> 🔢 الكمية</span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_quantity" dir="auto" class="product_text_data">
                <span class="subtitle">
                  {{ product.product_quantity }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!--  بيانات اسعار البيع -->
        <div class="column is-12">
          <h2 class="title pr-3" dir="auto">بيانات اسعار البيع</h2>
          <div class="product_description box">
            <div class="product_text">
              <div
                v-if="product.product_selling_price_per_piece"
                dir="auto"
                class="product_text_data"
              >
                <span class="subtitle">💰 سعر البيع القطعة</span>
              </div>
            </div>
            <div class="product_text">
              <div
                v-if="product.product_selling_price_per_piece"
                dir="auto"
                class="product_text_data"
              >
                <span class="subtitle">
                  {{ product.product_selling_price_per_piece }}
                </span>
              </div>
            </div>
            <!-- 💰 سعر البيع بالجملة الصغيرة  -->
            <div class="product_text">
              <div
                v-if="product.product_small_wholesale_price"
                dir="auto"
                class="product_text_data"
              >
                <span class="subtitle"> 💰 سعر البيع بالجملة الصغيرة </span>
              </div>
            </div>
            <div class="product_text">
              <div
                v-if="product.product_small_wholesale_price"
                dir="auto"
                class="product_text_data"
              >
                <span class="subtitle">
                  {{ product.product_small_wholesale_price }}
                </span>
              </div>
            </div>
            <!-- 💰 سعر البيع بالجملة  -->
            <div class="product_text">
              <div v-if="product.product_wholesale_price" dir="auto" class="product_text_data">
                <span class="subtitle"> 💰 سعر البيع بالجملة</span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_wholesale_price" dir="auto" class="product_text_data">
                <span class="subtitle">
                  {{ product.product_wholesale_price }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 📅 تاريخ آخر تعديل على المنتج  💰 خصم على المنتج بيانات خامة المنتج -->
        <div class="column is-12">
          <h2 class="title pr-3" dir="auto">بيانات خامة المنتج</h2>
          <div class="product_description box">
            <!-- خامة المنتج -->
            <div class="product_text">
              <div v-if="product.product_material" dir="auto" class="product_text_data">
                <span class="subtitle">خامة المنتج</span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_material" dir="auto" class="product_text_data">
                <span class="subtitle">
                  {{ product.product_material }}
                </span>
              </div>
            </div>
            <!-- 💰 خصم على المنتج  -->
            <div class="product_text">
              <div v-if="product.product_discount" dir="auto" class="product_text_data">
                <span class="subtitle"> 💰 خصم على المنتج </span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_discount" dir="auto" class="product_text_data">
                <span class="subtitle">
                  {{ product.product_discount }}
                </span>
              </div>
            </div>
            <!-- 📅 تاريخ آخر تعديل على المنتج -->
            <div class="product_text">
              <div v-if="product.product_last_modified" dir="auto" class="product_text_data">
                <span class="subtitle"> 📅 تاريخ آخر تعديل على المنتج</span>
              </div>
            </div>
            <div class="product_text">
              <div v-if="product.product_last_modified" dir="auto" class="product_text_data">
                <span class="subtitle">
                  {{ product.product_last_modified }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- SharePage -->
        <div class="column is-12">
          <div class="box">
            <!-- <SharePage :pageTitle="pageTitle" :pageUrl="pageUrl"></SharePage> -->
          </div>
        </div>
      </div>
    </div>
    <!-- SharePage -->
    <div class="wrapper_section_share_product">
      <div
        class="inner"
        v-if="selectedPhoto"
        :style="{ 'background-image': 'url(' + selectedPhoto + ')' }"
      >
        <div class="product_code" v-if="product.product_code">
          <span class="text"> Code </span>
          <span class="code"> {{ product.product_code }} </span>
        </div>
        <div class="product_name" v-if="product.product_name_en">
          {{ product.product_name_en }}
        </div>
        <div class="tom_and_jerry_logo">
          <img src="../../assets/images/tom_and_jerry.png" class="c" alt="" />
        </div>
        <div class="product_colors">
          <span class="title"> Colors </span>
          <span
            class="wrapper_color"
            v-for="(object, index) in product.product_colors"
            :key="index"
          >
            <span
              class="button mr-1 ml-1 color"
              :data-color="object.color_hex_code"
              :style="{ backgroundColor: object.color_hex_code }"
            >
            </span>
          </span>
        </div>
        <div class="product_photo">
          <img :src="product.get_product_image_cover" :alt="product.product_image_cover" />
        </div>
        <div class="product_size">
          <span class="title"> Sizes </span>
          <span
            class="wrapper_sizes_name"
            v-for="(object, index) in product.product_sizes"
            :key="index"
          >
            <span class="size_name button mr-1 ml-1 mb-2 data">
              {{ object.sizes_name_year }}
            </span>
          </span>
        </div>
        <div class="product_status">
          <!-- <span class="status">
            <span v-if="product.product_status == 'available'" class="button has-text-primary">
              {{ product.product_status }}</span
            >
          </span> -->
        </div>
        <div class="product_footer">
          <div class="rate">
            <fa :icon="['fas', 'star']" :class="getStarClass(0)" />
            <fa :icon="['fas', 'star']" :class="getStarClass(1)" />
            <fa :icon="['fas', 'star']" :class="getStarClass(2)" />
            <fa :icon="['fas', 'star']" :class="getStarClass(3)" />
            <fa :icon="['fas', 'star']" :class="getStarClass(4)" />
          </div>
        </div>
        <div class="product_barcode">
          <!-- <img :src="product.product_barcode_image" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
// import { toast } from 'bulma-toast'
// import SharePage from '@/components/SharePage/SharePage.vue'

//
let backgroundPhotos = [
  '../../assets/images/Wrappers/1.jpg',
  '../../assets/images/Wrappers/2.jpg',
  '../../assets/images/Wrappers/3.jpg',
  '../../assets/images/Wrappers/4.jpg',
  '../../assets/images/Wrappers/5.jpg',
  '../../assets/images/Wrappers/6.jpg',
  '../../assets/images/Wrappers/7.jpg',
  '../../assets/images/Wrappers/8.jpg',
  '../../assets/images/Wrappers/9.jpg',
  '../../assets/images/Wrappers/10.jpg',
  '../../assets/images/Wrappers/11.jpg',
  '../../assets/images/Wrappers/12.jpg',
  '../../assets/images/Wrappers/13.jpg',
  '../../assets/images/Wrappers/14.jpg',
  '../../assets/images/Wrappers/15.jpg',
  '../../assets/images/Wrappers/16.jpg',
  '../../assets/images/Wrappers/17.jpg',
  '../../assets/images/Wrappers/18.jpg',
  '../../assets/images/Wrappers/19.jpg',
  '../../assets/images/Wrappers/20.jpg',
  '../../assets/images/Wrappers/21.jpg',
  '../../assets/images/Wrappers/22.jpg',
  '../../assets/images/Wrappers/23.jpg',
  '../../assets/images/Wrappers/24.jpg',
  '../../assets/images/Wrappers/25.jpg',
  '../../assets/images/Wrappers/26.jpg',
  '../../assets/images/Wrappers/27.jpg',
  '../../assets/images/Wrappers/28.jpg',
  '../../assets/images/Wrappers/29.jpg',
  '../../assets/images/Wrappers/30.jpg',
  '../../assets/images/Wrappers/31.jpg',
  '../../assets/images/Wrappers/32.jpg',
  '../../assets/images/Wrappers/33.jpg',
  '../../assets/images/Wrappers/34.jpg',
  '../../assets/images/Wrappers/35.jpg',
  '../../assets/images/Wrappers/36.png',
  '../../assets/images/Wrappers/37.png',
  '../../assets/images/Wrappers/38.jpg',
  '../../assets/images/Wrappers/39.jpg',
  '../../assets/images/Wrappers/40.jpg',
  '../../assets/images/Wrappers/41.png',
  '../../assets/images/Wrappers/42.png',
  '../../assets/images/Wrappers/43.png',
  '../../assets/images/Wrappers/44.png',
  '../../assets/images/Wrappers/45.png',
  '../../assets/images/Wrappers/46.png',
  '../../assets/images/Wrappers/47.png',
  '../../assets/images/Wrappers/48.png',
  '../../assets/images/Wrappers/49.png'
]

export default {
  name: 'ProductId',
  data() {
    return {
      pageUrl: window.location.href,
      pageTitle: '',
      // بيانات المنتج
      product: {},
      // Random Background Photos
      // Select Image Background
      backgroundPhotos: backgroundPhotos,
      selectedPhoto: null,
      // For Star Color
      starColors: [],

      // متغير للتحقق من مالك المنتج
      isProductOwner: false
    }
  },
  mounted() {
    // جلب بيانات المنتج
    this.getProduct()
  },
  methods: {
    getProduct() {
      const productID = this.$route.params.id
      console.log('productID: ', productID)

      axios
        .get(`/api/products/${productID}/`)
        .then((response) => {
          this.product = response.data.product
          console.log('Product Data: ', this.product)
          console.log('Product Data: ', this.product.product.id)
        })
        .catch((error) => {
          console.log('error: ', error)
          console.log(JSON.stringify(error))
        })
    },
    //
    randomBackgroundPhotos(imgs) {
      return imgs[Math.floor(Math.random() * backgroundPhotos.length)]
    },
    generateRandomColors() {
      // Generate random number 4 or 5
      const yellowStars = Math.random() < 0.5 ? 4 : 5
      this.starColors = Array(5).fill('yellow')
      if (yellowStars === 4) {
        // Set the fifth star to be white
        this.starColors[4] = 'white'
      }
    },
    getStarClass(index) {
      return this.starColors[index] === 'yellow' ? 'star-yellow' : 'star-white'
    }
  },
  created() {
    //
    this.selectedPhoto = this.randomBackgroundPhotos(this.backgroundPhotos)
    console.log('Selected Photo From Created: ', this.selectedPhoto)
  }

  // components: { SharePage }
}
</script>

<!--

  getUserProfile() {
      // جلب بيانات المستخدم الحالي عبر API أو أي طريقة أخرى
      axios.get(`/api/v1/userProfile`).then((response) => {
        this.userProfile = response.data
        this.checkProductOwner()
      })
    },
    checkProductOwner() {
      if (this.product && this.userProfile) {
        this.isProductOwner = this.product.created_by === this.userProfile.id
      }
    }
-->
