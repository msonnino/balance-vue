<script setup lang='ts'>
import { ref, watch } from 'vue';
import { PIN_CODE_BUTTONS_ARRAY } from './const'
import SimpleSpinner from "@/components/SimpleSpinner.vue"
/*
The props interface could be exported to a separate types.ts file,
but I like to leave it in the component file
so it is clearly visible for anyone working on the component
*/

// PROPS:
interface LockAuthProps {
    codeLength: number,
    shouldShowError?: boolean
    isLoading?: boolean
}

const props = withDefaults(defineProps<LockAuthProps>(), {
    shouldShowError: false,
    isLoading: false
})

// EMITS:
const emit = defineEmits(['input', 'codeComplete'])

// DATA:
const currentCode = ref<string>('')

// METHODS:
const onInputClick = (input: string) => {
    emit('input')
    if (input === 'X') {
        currentCode.value = currentCode.value.slice(0, -1)
    } else {
        currentCode.value = currentCode.value.concat(input)
    }
}

// WATCHERS:
// watch for the current code and check correctness when it reaches correct length
watch(currentCode, () => {
    if (currentCode.value.length >= props.codeLength) {
        emit('codeComplete', currentCode.value)
        // in either cases we reset the code
        currentCode.value = ''
    }
})

</script>

<template>
    <!-- In the current use-case I did not see a practical reason to divide this component into more sub-components.
        I didn't want to do it just for "the show". Hope I didn't miss anything. -->
    <div class="pin-code-container">
        <div v-if="isLoading">
            <!-- just created a simple css spinner for demo purpose -->
            <SimpleSpinner />
        </div>
        <div v-else class="circle-display">
            <div v-for="n in codeLength" :key="n" class="code-circle"
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