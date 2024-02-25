<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import PaymentView from "@/views/PaymentView.vue";
import AddressView from "@/views/AddressView.vue";
import Error from "@/components/Error.vue";
import { ref } from "vue";
import state from "@/state";
const error = ref("");
function setError(msg) {
  error.value = msg;
}
</script>
<template>
  <Header />

  <Error :msg="error"></Error>
  <payment-view></payment-view>
  <Footer />
</template>
