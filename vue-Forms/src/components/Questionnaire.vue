<template>
  <div>
    <form v-if="!completed" @submit.prevent="handleSubmit">
      <div v-for="(question, index) in questions" :key="index">
        <label :for="question.id">{{ question.text }}</label>
        <input :type="question.type" :id="question.id" v-model="answers[question.id]">
      </div>
      <button type="submit">Submit</button>
    </form>
    <p v-else>You have completed the questionnaire!</p>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  showForm: Boolean,
});

const emits = defineEmits(['completed']);

const questions = ref([
  { id: 'q1', text: 'Question 1', type: 'text' },
  { id: 'q2', text: 'Question 2', type: 'email' },
]);

const answers = ref({});
const completed = ref(false);

const handleSubmit = (e) => {
  e.preventDefault();
  answers.value = Object.fromEntries(new FormData(e.target));
  completed.value = true;
  emits.completed(answers.value);

  // Reset the form
  e.target.reset();
  answers.value = {};
  
}
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
