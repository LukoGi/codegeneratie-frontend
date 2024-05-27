<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="to_account_id">To Account ID:</label>
        <input id="to_account_id" v-model="to_account_id" type="number" required>
      </div>
      <div>
        <label for="from_account_id">From Account ID:</label>
        <input id="from_account_id" v-model="from_account_id" type="number" required>
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

export default {
  data() {
    return {
      to_account_id: null,
      from_account_id: null,
      transfer_amount: null,
      description: '',
    };
  },
  methods: {
    async submitForm() {
      const transaction = {
        to_account_id: this.to_account_id,
        from_account_id: this.from_account_id,
        transfer_amount: this.transfer_amount,
        description: this.description,
      };

      try {
        const response = await axios.post('http://localhost:8080/transactions', transaction);

      } catch (error) {

      }
    },
  },
};
</script>

<style scoped>

</style>