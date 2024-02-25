<template>
  <div class="container">
    <h1 class="text-2xl font-bold mb-4">Questionnaire App</h1>
    <Questionnaire @completed="handleCompleted" :showForm="showForm" />
    <PaymentForm :data="formData" v-show="showForm" />
    <Error :msg="error"></Error>
    <payment-view :disabled="!showForm"></payment-view>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import PaymentView from "@/views/PaymentView.vue";
import AddressView from "@/views/AddressView.vue";
import Error from "@/components/Error.vue";
import { ref } from "vue";
import state from "@/state";

const error = ref("");
function setError(msg) {
  error.value = msg;
}

import Questionnaire from '@/components/Questionnaire.vue';
import PaymentForm from '@/components/PaymentForm.vue';

const showForm = ref(false); 

const handleCompleted = (data) => {
  setFormData(data);
  showForm.value = true; 
}
</script>
