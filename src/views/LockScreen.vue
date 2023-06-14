<script setup lang="ts">
import PinCodeAuth from '@/components/PinCodeAuth/PinCodeAuth.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { PASSWORD, CODE_LENGTH } from './const';

const router = useRouter()
const authStore = useAuthStore()

const onPinSuccess = () => {
  authStore.setAuthentication(true)
  router.push('/')
}

</script>

<template>
  <main class="main-container">
    <!-- I've decided to move the title outside of the PinCode component. Made more sense to me. -->
    <p class="title">Confirm your new PIN</p>
    <!-- We could decide the we want to implement custom behavior for 'onPinFail' as well, but I've decided to leave it as it is -->
    <PinCodeAuth @success="onPinSuccess" :codeLength="CODE_LENGTH" :correctPassword="PASSWORD" />
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
