<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    {{ otp }}
    <otp-input @code="otp = $event" :childs="6" type="number" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OtpInput from "@/components/otp-input.vue";

export default defineComponent({
  name: "Home",
  components: {
    OtpInput,
  },
  data() {
    return {
      otp: "",
    };
  },
});
</script>
