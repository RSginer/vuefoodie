<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <a class="btn-ghost btn text-xl normal-case" href="/">
        <img
          alt="OpenFoodFacts logo"
          class="logo"
          src="../assets/openfoodfacts-horizontal-logo.svg"
          width="272"
          height="48"
        />
      </a>
    </div>
    <div class="navbar-center">
      <div class="form-control">
        <div>
          <div class="join">
            <QueryOrBarcodeForm />
          </div>
        </div>
      </div>
    </div>
    <div class="navbar-end gap-2">
      <a
        class="btn btn-outline link"
        href="https://github.com/rsginer/vuefoodie"
        target="_blank"
        aria-label="GitHub"
        ><span class="icon-[mdi--github] h-8 w-8"></span
      ></a>
    </div>
  </div>
</template>
<script setup lang="ts">
import QueryOrBarcodeForm from './QueryOrBarcodeForm.vue'
</script>
