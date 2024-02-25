<template>
  <div>
    <h2>Payment Information</h2>
    <div v-for="(value, key) in data" :key="key">
      <label>{{ key }}: {{ value }}</label>
    </div>
    <h3>Recommended Products:</h3>
    <ul>
      <li v-for="product in products" :key="product.name">
        {{ product.name }} - ${{ product.price }}
      </li>
    </ul>
    <form @submit.prevent="submitForm">
      <button type="submit">Pay Now</button>
    </form>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  data: Object,
  products: Array
});

const submitForm = (e) => {
  e.preventDefault();
}
</script>