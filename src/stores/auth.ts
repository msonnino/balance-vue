import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('AuthStore', () => {
    const isAuthenticated = ref<boolean>(false)

    const setAuthentication = (newState: boolean) => {
        isAuthenticated.value = newState
    }

    return { isAuthenticated, setAuthentication }
})
