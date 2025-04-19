<style lang="css" scoped>
.main {
    @apply flex flex-col justify-center items-center;
}
.section {
    @apply container mx-auto flex flex-col justify-between items-center;
}

</style>
<template>
    <header v-if="$slots.header" class="header">
        <slot name="header"></slot>
    </header>
    <main v-if="$slots.default" class="section main">
        <slot></slot>
    </main>
    <footer class="section" v-if="$slots.footer">
        <slot name="footer"></slot>
    </footer>
</template>
<script setup lang="ts">
</script>
