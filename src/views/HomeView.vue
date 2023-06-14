<script setup lang='ts'>

</script>

<template>
    <div class="main-container">
        <span class="title">Welcome!</span>
        <span class="content-text">You entered the correct PIN code</span>
    </div>
</template>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    align-items: center;
    font-family: 'Inter';
    font-style: normal;
    color: #000000;
}

.title {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
}

.content-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
}
</style>