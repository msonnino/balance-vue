import { ref } from 'vue'
import { defineStore } from 'pinia'
import { PASSWORD } from '@/views/const'
import { delay } from '@/utils'

export const useAuthStore = defineStore('AuthStore', () => {
    const isAuthenticated = ref<boolean>(false)

    const tryAuthentication = async (password: string) => {
        // In reality we would send the password to authenticate in the backend and would get back a response
        await delay(500)
        if (password === PASSWORD) {
            isAuthenticated.value = true
        } else {
            // we can add any error handling we like in here
            isAuthenticated.value = false
        }
    }

    return { isAuthenticated, tryAuthentication }
})
