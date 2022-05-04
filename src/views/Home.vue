<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    {{ otp }}
    <otp-input-v2 @code="otp = $event" :childs="6" type="text" />

    <range-input />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  data() {
    return {
      otp: "",
    };
  },
});
</script>
