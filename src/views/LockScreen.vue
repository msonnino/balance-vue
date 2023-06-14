<script setup lang="ts">
import PinCodeAuth from '@/components/PinCodeAuth/PinCodeAuth.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { CODE_LENGTH } from './const';
import { ref } from 'vue';

// TOOLS AND UTILS:
const router = useRouter()
const authStore = useAuthStore()

// DATA:
const shouldShowError = ref(false)
const isAuthLoading = ref(false)

// METHODS:
const onInput = () => {
  shouldShowError.value = false
}

const onCodeComplete = async (currentCode: string) => {

  // we show a loader while authenticating 
  isAuthLoading.value = true
  await authStore.tryAuthentication(currentCode)
  isAuthLoading.value = false

  if (authStore.isAuthenticated) {
    onPinSuccess()
  } else {
    onPinFail()
  }
}

const onPinSuccess = () => {
  router.push('/')
}

const onPinFail = () => {
  // we can add any logic we'd like here
  shouldShowError.value = true
}

</script>

<template>
  <main class="main-container">
    <!-- I've decided to move the title outside of the PinCode component. Made more sense to me. -->
    <p class="title">Confirm your new PIN</p>
    <!-- We could decide the we want to implement custom behavior for 'onPinFail' as well, but I've decided to leave it as it is -->
    <PinCodeAuth @input="onInput" @codeComplete="onCodeComplete" :codeLength="CODE_LENGTH"
      :shouldShowError="shouldShowError" :isLoading="isAuthLoading" />
  </main>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: 'Inter';
  font-style: normal;
}

.title {
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
  margin-bottom: 24px;
}
</style>
