<style scoped></style>
<template>
    <header v-if="$slots.header" class="container mx-auto">
        <slot name="header"></slot>
    </header>
    <main v-if="$slots.default" class="flex flex-col h-screen justify-start mx-auto px-8 container bg-base-100">
        <slot></slot>
    </main>
    <footer class="pt-12 bg-secondary pt-12" v-if="$slots.footer">
        <div class="container mx-auto text-secondary-content text-center flex flex-col gap-2">
            <slot name="footer"></slot>
        </div>
        <div v-if="$slots.credits"
            class="mt-8 flex justify-center w-100% py-2 text-secondary-content backdrop-brightness-50">
            <slot name="credits"></slot>
        </div>
    </footer>
</template>
<script setup lang="ts">
</script>
