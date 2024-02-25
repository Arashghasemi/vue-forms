<template>
      <div class="container bg-slate-300 mx-auto p-2">
    <h2>Payment</h2>

    <div class="border rounded p-1 bg-gray-100">
      <form novalidate @submit.prevent="onSubmit">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <h3 class="mb-6">Shipping Adress</h3>
            <label for="fullName">Full Name</label>
            <input type="text" id="fullName" v-model="shipping.fullName" />
            <label for="company">Company</label>
            <input type="text" id="company" v-model="shipping.company" />
            <label for="adress1">Street Adress</label>
            <input type="text" id="adress1" v-model="shipping.adress1" />
            <input type="text" id="adress2" v-model="shipping.adress2" />
            <label for="cityTown">City</label>
            <input type="text" id="cityTown" v-model="shipping.cityTown" />
            <label for="state">State</label>
            <select id="state" v-model="shipping.state">
              <option
                v-for="state in states"
                :value="state.abbreviation"
                :key="state.id"
              >
                {{ formatState(state) }}
              </option>
            </select>
            <label for="postalCode">Postal Code</label>
            <input type="text" id="postalCode" v-model="shipZip" />
          </div>
          <div>
            <h3>Billing</h3>
            <label class="flex">
              <input type="checkbox" v-model="sameAsShipping">
              &nbsp; Same as shipping?
            </label>
                        <label for="fullName">Full Name</label>
            <input type="text" id="fullName" 
            v-model="billing.fullName" 
            :disabled="sameAsShipping"/>
            <label for="company">Company</label>
            <input type="text" id="company" v-model="billing.company" :disabled="sameAsShipping" />
            <label for="adress1">Street Adress</label>
            <input type="text" id="adress1" v-model="billing.adress1" :disabled="sameAsShipping" />
            <input type="text" id="adress2" v-model="billing.adress2" :disabled="sameAsShipping" />
            <label for="cityTown">City</label>
            <input type="text" id="cityTown" v-model="shipping.cityTown" :disabled="sameAsShipping" />
            <label for="state">State</label>
            <select id="state" v-model="billing.state" :disabled="sameAsShipping">
              <option
                v-for="state in states"
                :value="state.abbreviation"
                :key="state.id"
              >
                {{ formatState(state) }}
              </option>
            </select>
            <label for="postalCode">Postal Code</label>
            <input type="text" id="postalCode" v-model="billZip" :disabled="sameAsShipping" />
          </div>
        </div>
        <div class="w-1/2">
          <h3>Credit Card</h3>
          <label for="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" v-model="card.cardNumber"/>
          <label for="cardHolder">Name on Card</label>
          <input type="text" id="cardHolder" v-model="card.cardHolder"/>
          <div class="grid grid-cols-3 gap-2">
          <div>
            <label for="exMonth">Expiration Month</label>
            <select id="exMonth" v-model="card.exMonth">
              <option v-for="month in months" :value="month.number" :key="month.number">{{ month.name }}</option>
            </select>
          </div>
          <div>
            <label for="exYear">Expiration Year</label>
            <select id="exYear" v-model="card.exYear">
              <option v-for="year in years" :key="year.number">{{ year }}</option>
            </select>
          </div>
          <div>
            <label for="ccv">CCV</label>
            <input type="text" id="ccv" v-model="card.ccv">
          </div>
        </div>
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
    <div>
      <pre>{{ shipping }}</pre>
      <pre>{{ billing }}</pre>
      <pre>{{ card }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import states from "@/lookup/states.js";
import { formatState } from "@/utils";
import months from "@/lookup/months.js";

const emits = defineEmits([
    "onError"
]);
const sameAsShipping = ref(false);
const years = Array.from({ length: 10 }, (_, i) => i + 2023);
const shipping = ref({});

const billing = ref({});
const card = ref({});
function onSubmit() {
  emits("onError", "Can't have yet, no API");
}



const shipZip = computed({
  get: () => shipping.value.postalCode,
  set: (newVal) => {
    if (newVal&& typeof newVal === "string") {
      if(newVal.length <= 5 || newVal.indexOf("-") > -1) {
        shipping.value.postalCode = newVal;
      }else {
         shipping.value.postalCode = `${newVal.substring(0,5)}-${newVal.substring(5)}`;
      }
      } else {
        console.error("Failed to set the postal code");
    }
  },
});

const billZip = computed({
  get: () => billing.value.postalCode,
  set: (newVal) => {
    if (newVal&& typeof newVal === "string") {
      if(newVal.length <= 5 || newVal.indexOf("-") > -1) {
        billing.value.postalCode = newVal;
      }else {
         billing.value.postalCode = `${newVal.substring(0,5)}-${newVal.substring(5)}`;
      }
      } else {
        console.error("Failed to set the postal code");
    }
  },
});

watch(
  () => sameAsShipping.value,
  (newValue) => {
    if (newValue) {
      billing.value.fullName = shipping.value.fullName; 
      billing.value.company = shipping.value.company;
      billing.value.adress1 = shipping.value.adress1;
      billing.value.adress2 = shipping.value.adress2;
      billing.value.cityTown = shipping.value.cityTown;
      billing.value.state = shipping.value.state;
      billing.value.postalCode = shipping.value.postalCode; 
    }
  }
)
</script>
