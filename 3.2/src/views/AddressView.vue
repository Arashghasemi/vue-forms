<template>
    <div>
        <label for="fullName">Full Name</label>
        <input type="text" id="fullName" v-model="model.fullName" />
        <label for="company">Company</label>
        <input type="text" id="company" v-model="model.company" />
        <label for="adress1">Street Adress</label>
        <input type="text" id="adress1" v-model="model.adress1" />
        <input type="text" id="adress2" v-model="model.adress2" />
        <label for="cityTown">City</label>
        <input type="text" id="cityTown" v-model="model.cityTown" />
        <label for="state">State</label>
        <select id="state" v-model="model.state">
            <option
            v-for="state in states"
            :value="state.abbreviation"
            :key="state.id"
            >
            {{ formatState(state) }}
            </option>
        </select>
        <label for="postalCode">Postal Code</label>
        <input type="text" id="postalCode" v-model="postalCode" />
    </div>
</template>

<script setup>
import states from "@/lookup/states.js";
import { formatState } from "@/utils";
import { ref, computed, watch } from "vue";
import months from "@/lookup/months.js";
import Error from "@/components/Error.vue";
import AddressView from "@/views/AddressView.vue";

const props = defineProps({
    model: {
        type: Object,
        required: true,
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
});

const postalCode = computed({
  get: () => props.model.postalCode,
  set: (newVal) => {
    if (newVal&& typeof newVal === "string") {
      if(newVal.length <= 5 || newVal.indexOf("-") > -1) {
        props.model.postalCode = newVal;
      }else {
         props.model.postalCode = `${newVal.substring(0,5)}-${newVal.substring(5)}`;
      }
      } else {
        console.error("Failed to set the postal code");
    }
  },
});
</script>