import { createRouter, createWebHistory } from 'vue-router'
import LockScreen from '../views/LockScreen.vue'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: '/lock-screen',
      name: 'lock-screen',
      component: LockScreen
    },
  ]
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  if (
    // make sure the user is authenticated
    !authStore.isAuthenticated &&
    to.name !== 'lock-screen'
  ) {
    // otherwise redirect the user to the lock screen
    return { name: 'lock-screen' }
  }
})

export default router
