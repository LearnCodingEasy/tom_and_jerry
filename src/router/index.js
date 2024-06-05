import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// Authentication
import SignupView from '../views/Authentication/SignUpView.vue'
import LoginView from '../views/Authentication/LoginView.vue'

// Account
import ProfileView from '../views/Account/ProfileView.vue'
import EditProfileView from '../views/Account/EditProfileView.vue'
import EditPasswordView from '../views/Account/EditPasswordView.vue'

// ProductList
import ProductsList from '../views/Product/ProductsList.vue'
import ProductId from '../views/Product/ProductId.vue'
import ProductCreate from '../views/Product/ProductCreate.vue'
// 
import { useUserStore } from '@/stores/user';

// 404 Catchall Page Not Found
import PageNotFound from "../components/FolderPageNotFound/PageNotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // Authentication 
    // Signup
    {
      path: '/SignupView',
      name: 'SignupView',
      component: SignupView
    },
    // Login
    {
      path: '/LoginView',
      name: 'LoginView',
      component: LoginView
    },
    // Account
    // Profile View
    {
      path: '/ProfileView/:id',
      name: 'ProfileView',
      component: ProfileView,
      meta: {
        requireLogin: true
      }
    },
    // Edit Profile View
    {
      path: '/ProfileView/EditProfileView/',
      name: 'EditProfileView',
      component: EditProfileView,
      meta: {
        requireLogin: true
      }
    },
    // Edit Profile View
    {
      path: '/EditPasswordView/',
      name: 'EditPasswordView',
      component: EditPasswordView,
      meta: {
        requireLogin: true
      }
    },
    // Product
    // Products List
    {
      path: '/ProductsList',
      name: 'ProductsList',
      component: ProductsList
    },
    // Product Id
    {
      path: '/:id',
      name: 'ProductId',
      component: ProductId
    },
    // Product Create
    {
      path: '/ProductCreate',
      name: 'ProductCreate',
      component: ProductCreate
    },
    // 404 catchall Page Not Found
    {
      path: "/:catchAll(.*)",
      name: "PageNotFound",
      component: PageNotFound
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  // استدعاء initStore عند تحميل التطبيق
  const userStore = useUserStore();
  userStore.initStore();
  if (to.matched.some(record => record.meta.requireLogin) && !userStore.user.isAuthenticated) {
    next('/loginView');
  } else if (to.name === 'ProfileView' && !to.params.id) {
    // إذا كانت الصفحة تتطلب معلمة id وهي غير متوفرة، إعادة التوجيه إلى صفحة تسجيل الدخول
    next('/loginView');
  } else {
    next();
  }
});


export default router
