<style scoped></style>
<template>
    <header v-if="$slots.header" class="container mx-auto mb-2">
        <slot name="header"></slot>
    </header>
    <main v-if="$slots.default"
        class="flex flex-col h-screen justify-start container mx-auto gap-4 px-4 xl:max-w-6xl bg-base-100 my-4">
        <slot></slot>
    </main>
    <footer class="bg-secondary" v-if="$slots.footer">
        <div
            class="mt-8 flex justify-center w-100% py-2 text-secondary-content backdrop-brightness-70">
            <slot name="footer"></slot>
        </div>
    </footer>

</template>
<script setup lang="ts">
</script>
