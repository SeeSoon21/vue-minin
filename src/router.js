import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('./views/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('./views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('./views/register.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('./views/categories.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('./views/history.vue')
  },
  {
    path: '/detail-record',
    name: 'detail-record',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('./views/detail-record.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('./views/profile.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('./views/planning.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main', requiresAuth: true },
    component: () => import('./views/record.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

//глобальный навигационный хук
//проверяем совпадение (не)авторизованного юзера
//и в з-и от результата предоставляет доступ к странице или нет
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log("to(record): " + to.meta.requiresAuth)
    if (await getCurrentUser) {
      console.log('getAuth: ' + getAuth().currentUser)
      next();
    } else {
      //alert("u don't have access")
      next('/login')
    }
  } else {
    next();
  }
})

export default router;