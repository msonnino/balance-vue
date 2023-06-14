<script setup lang='ts'>
import { ref, watch } from 'vue';
import { CODE_LENGTH, PIN_CODE_BUTTONS_ARRAY } from './const'

interface LockAuthProps {
    correctPassword: string,
}

const props = defineProps<LockAuthProps>()

const emit = defineEmits(['success'])

const currentCode = ref<string>('')

const shouldShowError = ref<boolean>(false)

const onInputClick = (input: string) => {
    shouldShowError.value = false
    if (input === 'X') {
        currentCode.value = currentCode.value.slice(0, -1)
    } else {
        currentCode.value = currentCode.value.concat(input)
    }
}

// watch for the current code and check correctness when it reaches correct length
watch(currentCode, () => {
    if (currentCode.value.length >= 4) {
        if (currentCode.value === props.correctPassword) {
            emit('success')
        } else {
            shouldShowError.value = true
        }
        // in either cases we reset the code
        currentCode.value = ''
    }
})

</script>

<template>
    <div class="pin-code-container">
        <div class="circle-display">
            <div v-for="n in CODE_LENGTH" :key="n" class="code-circle"
                :class="n <= currentCode.length ? 'filled-circle' : ''">
            </div>
        </div>
        <div class="error-container">
            <p v-if="shouldShowError" class="error-message">Incorrect PIN code. Try again.</p>
        </div>
        <div class="buttons-container">
            <button v-for="(inputValue, index) in PIN_CODE_BUTTONS_ARRAY" @click="onInputClick(inputValue)" :key="index"
                class="input-button">{{ inputValue
                }}</button>
        </div>
    </div>
</template>

<style scoped>
.pin-code-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Inter';
    font-style: normal;
}

.circle-display {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
}

.code-circle {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    border: solid black 1px;
}

.filled-circle {
    background-color: #000000;
}

.error-container {
    margin-bottom: 24px;
    height: 56px;
}

.error-message {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #CC0000;
}

.buttons-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 24px;
    width: 266px;
}

.input-button {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    font-weight: 400;
    font-size: 32px;
    line-height: 40px;
    color: #000000;
    background-color: white;
}

.input-button:hover {
    background-color: #F5F5F5;
}

.input-button:active {
    background-color: black;
}
</style>