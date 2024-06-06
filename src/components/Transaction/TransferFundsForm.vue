<template>
  <div class="container d-flex justify-content-center align-items-center" style="height: 80vh;">
    <form class="p-3 card col-md-3" @submit.prevent="submitForm">
      <h1>Transfer Funds</h1>

      <div class="form-group mb-3">
        <label for="fromAccountType">Transfer From:</label>
        <select class="form-control" id="fromAccountType" v-model="fromAccountType" required>
          <option value="checkings">Checkings Account</option>
          <option value="savings">Savings Account</option>
        </select>
      </div>

      <div class="form-group mb-3">
        <label for="toAccountType">To:</label>
        <select class="form-control" id="toAccountType" v-model="toAccountType" required>
          <option value="checkings">Checkings Account</option>
          <option value="savings">Savings Account</option>
        </select>
      </div>

      <div class="form-group mb-3">
        <label for="transferAmount">Transfer Amount:</label>
        <input
            type="number"
            class="form-control"
            id="transferAmount"
            v-model="transferAmount"
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
      fromAccountType: '',
      toAccountType: '',
      transferAmount: null,
      errorMessage: '',
    };
  },
  methods: {
    async submitForm() {
      const transaction = {
        userId: this.userStore.getUserId,
        fromAccountType: this.fromAccountType,
        toAccountType: this.toAccountType,
        transferAmount: this.transferAmount,
      };

      try {
        await axios.post('/transactions/transfer', transaction);
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = error.response.data.message || 'An error occurred while submitting the form.';
      }
    },
  },
  created() {
    watch(() => this.fromAccountType, (newVal) => {
      if (newVal === 'checkings') {
        this.toAccountType = 'savings';
      } else if (newVal === 'savings') {
        this.toAccountType = 'checkings';
      }
    });

    watch(() => this.toAccountType, (newVal) => {
      if (newVal === 'checkings') {
        this.fromAccountType = 'savings';
      } else if (newVal === 'savings') {
        this.fromAccountType = 'checkings';
      }
    });
  },
};
</script>

<style scoped>

</style>