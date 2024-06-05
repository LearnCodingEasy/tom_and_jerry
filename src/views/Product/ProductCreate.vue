<template>
  <div class="wrapper_add_product_page">
    <div class="inner_add_product_page">
      <div class="container" dir="rtl">
        <h1 class="mb-6 text-center">add product</h1>
        <form v-on:submit.prevent="submitForm" method="post">
          <div class="row">
            <div class="col-lg-6">
              <!-- 🏷️ اسم المحل -->
              <div class="mb-3">
                <label class="form-label" for="stor_name">🏷️ اسم المحل</label>
                <input
                  type="text"
                  name="stor_name"
                  id="stor_name"
                  class="form-control"
                  v-model="product.stor_name"
                />
              </div>
              <!-- 🏷️ اسم المنتج (العربية) -->
              <div class="mb-3">
                <label class="form-label" for="product_name_ar">🏷️ اسم المنتج (العربية)</label>
                <input
                  type="text"
                  name="product_name_ar"
                  id="product_name_ar"
                  class="form-control"
                  v-model="product.product_name_ar"
                />
              </div>
              <!-- 🏷️ اسم المنتج (الإنجليزية) -->
              <div class="mb-3">
                <label class="form-label" for="product_name_en">🏷️ اسم المنتج (الإنجليزية)</label>
                <input
                  type="text"
                  name="product_name_en"
                  id="product_name_en"
                  class="form-control"
                  v-model="product.product_name_en"
                />
              </div>
              <!-- 🏷️ Slug  -->
              <div class="mb-3">
                <label class="form-label" for="slug">🏷️ Slug</label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  class="form-control"
                  v-model="product.slug"
                />
              </div>
              <!-- 🏷️ حالة المنتج -->
              <div class="mb-3">
                <label class="form-label" for="stor_name">🏷️ حالة المنتج</label>
                <div class="">
                  <select class="form-select" v-model="product.product_status">
                    <option disabled value="">Select Status</option>
                    <option
                      v-for="status in statusChoices"
                      :key="status.value"
                      :value="status.value"
                    >
                      {{ status.text }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- 📝 تفاصيل المنتج (نص قصير) -->
              <div class="mb-3">
                <label class="form-label" for="product_short_description"
                  >📝 تفاصيل المنتج (نص قصير)</label
                >
                <div class="control">
                  <input
                    type="text"
                    id="product_short_description"
                    name="product_short_description"
                    class="form-control"
                    v-model="product.product_short_description"
                  />
                </div>
              </div>
              <!-- 📝 تفاصيل المنتج (نص طويل)  -->
              <div class="mb-3">
                <label dir="auto" class="form-label">📝 تفاصيل المنتج (نص طويل) </label>
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    v-model="product.product_long_description"
                  ></textarea>
                </div>
              </div>
              <!-- 🖼️ صورة المنتج -->
              <div class="mb-3">
                <label class="form-label" for="product_image_cover">🖼️ صورة المنتج</label>
                <div class="control">
                  <input
                    type="file"
                    class="form-control"
                    name="product_image_cover"
                    id="product_image_cover"
                    @change="handleFileUpload"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <!-- 💵 سعر الشراء -->
              <div class="mb-3">
                <label class="form-label" for="product_purchase_price">💵 سعر الشراء</label>
                <div class="control">
                  <input
                    type="number"
                    id="product_purchase_price"
                    name="product_purchase_price"
                    class="form-control"
                    v-model="product.product_purchase_price"
                  />
                </div>
              </div>
              <!-- 💸 مصاريف المنتج -->
              <div class="mb-3">
                <label class="form-label" for="product_expenses">💸 مصاريف المنتج</label>
                <div class="control">
                  <input
                    type="number"
                    id="product_expenses"
                    name="product_expenses"
                    class="form-control"
                    v-model="product.product_expenses"
                  />
                </div>
              </div>
              <!-- سعر الشراء والمصاريف -->
              <div class="mb-3">
                <label class="form-label" for="product_purchase_price_and_expenses"
                  >💵 سعر الشراء والمصاريف</label
                >
                <div class="control">
                  <input
                    type="number"
                    name="product_purchase_price_and_expenses"
                    id="product_purchase_price_and_expenses"
                    class="form-control"
                    v-model="product.product_purchase_price_and_expenses"
                  />
                </div>
              </div>
              <!-- 📅 تاريخ شراء المنتج -->
              <div class="mb-3">
                <label class="form-label" for="product_purchase_date">📅 تاريخ شراء المنتج</label>
                <div class="control">
                  <input
                    type="date"
                    name="product_purchase_date"
                    id="product_purchase_date"
                    class="form-control"
                    v-model="product.product_purchase_date"
                  />
                </div>
              </div>
              <!-- 🔢 كود المنتج -->
              <div class="mb-3">
                <label class="form-label" for="product_code">🔢 كود المنتج</label>
                <div class="control">
                  <input
                    type="number"
                    name="product_code"
                    id="product_code"
                    class="form-control"
                    v-model="product.product_code"
                  />
                </div>
              </div>
              <!--  🔢 الكمية  -->
              <div class="mb-3">
                <label class="form-label" for="product_quantity">🔢 الكمية </label>
                <div class="control">
                  <input
                    type="number"
                    name="product_quantity"
                    id="product_quantity"
                    v-model="product.product_quantity"
                    class="form-control"
                  />
                </div>
              </div>
              <!--  💰 سعر البيع القطعة -->
              <div class="mb-3">
                <label class="form-label" for="product_selling_price_per_piece"
                  >💰 سعر البيع القطعة
                </label>
                <div class="control">
                  <input
                    type="number"
                    name="product_selling_price_per_piece"
                    id="product_selling_price_per_piece"
                    v-model="product.product_selling_price_per_piece"
                    class="form-control"
                  />
                </div>
              </div>
              <!--  💰 سعر البيع بالجملة الصغيرة  -->
              <div class="mb-3">
                <label class="form-label" for="product_small_wholesale_price"
                  >💰 سعر البيع بالجملة الصغيرة
                </label>
                <div class="control">
                  <input
                    type="number"
                    name="product_small_wholesale_price"
                    id="product_small_wholesale_price"
                    v-model="product.product_small_wholesale_price"
                    class="form-control"
                  />
                </div>
              </div>
              <!--  💰 سعر البيع بالجملة -->
              <div class="mb-3">
                <label class="form-label" for="product_wholesale_price">💰 سعر البيع بالجملة</label>
                <div class="control">
                  <input
                    type="number"
                    name="product_wholesale_price"
                    id="product_wholesale_price"
                    v-model="product.product_wholesale_price"
                    class="form-control"
                  />
                </div>
              </div>
              <!--  💰 خصم على المنتج -->
              <div class="mb-3">
                <label class="form-label" for="product_discount">💰 خصم على المنتج </label>
                <div class="control">
                  <input
                    type="number"
                    name="product_discount"
                    id="product_discount"
                    v-model="product.product_discount"
                    class="form-control"
                  />
                </div>
              </div>
              <!--  خامة المنتج -->
              <div class="mb-3">
                <label class="form-label" for="product_material"> خامة المنتج </label>
                <div class="control">
                  <input
                    type="text"
                    name="product_material"
                    id="product_material"
                    v-model="product.product_material"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button class="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'
export default {
  name: 'ProductCreate',
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  data() {
    return {
      product: {
        stor_name: 'Tom And Jerry',
        product_name_ar: '',
        product_name_en: '',
        slug: '',
        product_status: '',
        product_short_description: '',
        product_long_description: '',
        product_purchase_price: null,
        product_expenses: null,
        product_purchase_price_and_expenses: null,
        product_purchase_date: '',
        product_code: 0,
        product_quantity: null,
        product_selling_price_per_piece: null,
        product_wholesale_price: null,
        product_small_wholesale_price: null,
        product_discount: null,
        product_material: ''
      },
      statusChoices: [
        { value: 'available', text: 'متاح' },
        { value: 'reserved', text: 'محجوز' },
        { value: 'out_of_stock', text: 'تم نفاذ الكمية' },
        { value: 'sold_out_in_store', text: 'تم نفاذ الكمية فى المحل' },
        { value: 'suppliers_out_of_stock', text: 'تم نفاذ الكمية من الموردين' },
        { value: 'offered_by_suppliers', text: 'معروض من قبل الموردين' },
        { value: 'not_yet_booked_by_customers', text: 'لم يتم الحجز بعد من قبل العملاء' },
        { value: 'on_the_way_to_store', text: 'في الطريق إلى المحل' },
        { value: 'please_order_from_supplier', text: 'يرجى طلبه من المورد' },
        {
          value: 'reserved_in_the_next_order_for_a_customer',
          text: 'محجوز فى الطلبية الاتية الى عميل'
        }
      ],
      // product image cover
      selectedFile: null
    }
  },
  watch: {
    'product.product_name_en': 'updateSlug',
    'product.stor_name': 'setStorName',
    'product.product_status': 'setStatus',

    // حساب سعر شراء المنتج + مصاريف المنتج
    // Calculated product_purchase_price + product_expenses
    'product.product_purchase_price': 'updatePurchasePriceAndExpenses',
    'product.product_expenses': 'updatePurchasePriceAndExpenses'
  },
  mounted() {
    this.setStatus()
  },
  methods: {
    updateSlug() {
      // Convert To Slug
      let productName = this.product.product_name_en.trim() // Trim whitespace from the beginning and end of the product name
      let slug = productName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
      this.product.slug = slug
    },
    setStorName() {
      let text = 'Tom And Jerry'
      this.product.stor_name = text
    },
    setStatus() {
      let val = this.statusChoices.value
      console.log('val: ', val)
    },
    // حساب سعر شراء المنتج + مصاريف المنتج
    // Calculated product_purchase_price + product_expenses
    updatePurchasePriceAndExpenses() {
      this.product.product_purchase_price_and_expenses =
        (this.product.product_purchase_price || 0) + (this.product.product_expenses || 0)
    },
    // For Upload Image to Product Store and for Product
    handleFileUpload(event) {
      console.log('event: ', event)
      // const file = event.target.files[0]
      this.selectedFile = event.target.files[0]
      // Handle file upload...
    },
    submitForm() {
      // حساب سعر شراء المنتج + مصاريف المنتج
      // Calculated product_purchase_price + product_expenses
      this.updatePurchasePriceAndExpenses()
      const formData = new FormData()
      for (const key in this.product) {
        if (Array.isArray(this.product[key])) {
          this.product[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item)
          })
        } else {
          formData.append(key, this.product[key])
        }
      }
      // Add Image [ product_image_cover ]
      if (this.selectedFile) {
        formData.append('product_image_cover', this.selectedFile)
      }
      // Sand Data To Django
      axios
        .post('/api/products/create_product/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.userStore.user.access}`
          }
        })
        .then((response) => {
          console.log('response: ', response)
          this.$router.push('/ProductsList')
        })
        .catch((error) => {
          console.log(JSON.stringify(error))
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
