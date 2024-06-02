<template>
  <div class="container d-flex justify-content-center align-items-center" style="height: 80vh;">
    <form class="p-3 card col-md-3" @submit.prevent="submitForm">
      <h1>Transfer Funds</h1>

      <div class="form-group mb-3">
        <label for="from_account">Transfer From:</label>
        <select class="form-control" id="from_account" v-model="from_account" required>
          <option value="checkings">Checkings Account</option>
          <option value="savings">Savings Account</option>
        </select>
      </div>

      <div class="form-group mb-3">
        <label for="to_account">To:</label>
        <select class="form-control" id="to_account" v-model="to_account" required>
          <option value="checkings">Checkings Account</option>
          <option value="savings">Savings Account</option>
        </select>
      </div>

      <div class="form-group mb-3">
        <label for="transfer_amount">Transfer Amount:</label>
        <input
            type="number"
            class="form-control"
            id="transfer_amount"
            v-model="transfer_amount"
            step="0.01"
            required
        />
      </div>

      <button class="btn btn-primary" type="submit">Confirm</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userstore';
import { watch } from 'vue';

export default {
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
  data() {
    return {
      from_account: '',
      to_account: '',
      transfer_amount: null,
      errorMessage: '',
    };
  },
  methods: {
    async submitForm() {
      const transaction = {
        from_account: this.from_account,
        to_account: this.to_account,
        transfer_amount: this.transfer_amount,
      };

      try {
        await axios.post('http://localhost:8080/transactions/transfer', transaction);
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = error.response.data.message || 'An error occurred while submitting the form.';
      }
    },
  },
  created() {
    watch(() => this.from_account, (newVal) => {
      if (newVal === 'checkings') {
        this.to_account = 'savings';
      } else if (newVal === 'savings') {
        this.to_account = 'checkings';
      }
    });

    watch(() => this.to_account, (newVal) => {
      if (newVal === 'checkings') {
        this.from_account = 'savings';
      } else if (newVal === 'savings') {
        this.from_account = 'checkings';
      }
    });
  },
};
</script>

<style scoped>

</style>