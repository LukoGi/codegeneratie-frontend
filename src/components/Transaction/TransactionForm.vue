<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="to_account_iban">To Account IBAN:</label>
        <input id="to_account_iban" v-model="to_account_iban" type="text" required>
      </div>
      <div>
        <label for="transfer_amount">Transfer Amount:</label>
        <input id="transfer_amount" v-model="transfer_amount" type="number" step="0.01" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userstore';

export default {
  setup() {
    const userStore = useUserStore(); // Get an instance of the store

    return {
      userStore,
      // Other data properties and methods go here
    };
  },
  data() {
    return {
      to_account_iban: '', // Changed to IBAN
      transfer_amount: null,
      description: '',
    };
  },
  methods: {
    async submitForm() {
      const transaction = {
        to_account_iban: this.to_account_iban, // Changed to IBAN
        initiator_user_id: this.userStore.getUserId,
        transfer_amount: this.transfer_amount,
        description: this.description,
      };

      try {
        const response = await axios.post('http://localhost:8080/transactions/createWithIban', transaction);
        console.log(response.data);
      } catch (error) {
        // Handle error
      }
    },
  },
};
</script>

<style scoped>
/* CSS styles go here */
</style>