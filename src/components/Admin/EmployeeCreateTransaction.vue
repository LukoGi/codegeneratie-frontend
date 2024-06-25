<template>
  <div class="TransferFunds container">
    <AdminSideNav />
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <div class="row mt-5">
      <div class="col-md-6 offset-md-3 card">
        <h2 class="text-center mb-4">Transfer Funds</h2>

        <form @submit.prevent="submitForm">
          <div class="form-group mb-3">
            <label for="fromAccountIban">From Account IBAN:</label>
            <input
                type="text"
                class="form-control"
                id="fromAccountIban"
                v-model="fromAccountIban"
                required
            />
          </div>
          <div class="form-group mb-3">
            <label for="toAccountIban">To Account IBAN:</label>
            <input
                type="text"
                class="form-control"
                id="toAccountIban"
                v-model="toAccountIban"
                required
            />
          </div>
          <div class="form-group mb-3">
            <label for="transferAmount">Transfer Amount:</label>
            <input
                type="number"
                class="form-control"
                id="transferAmount"
                v-model="transferAmount"
                step="0.01"
                min="0"
                required
            />
          </div>
          <div class="form-group mb-3">
            <label for="description">Description:</label>
            <textarea
                class="form-control"
                id="description"
                v-model="description"
            ></textarea>
          </div>
          <button class="btn btn-primary btn-block mb-3" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSideNav from "./AdminSideNav.vue";
import axios from "../../axios-auth";
import { useUserStore } from '@/stores/userstore';

export default {
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
  components: {
    AdminSideNav,
  },
  data() {
    return {
      fromAccountIban: '',
      toAccountIban: '',
      transferAmount: null,
      description: '',
      errorMessage: '',
    };
  },
  methods: {
    async submitForm() {
      const transaction = {
        fromAccountIban: this.fromAccountIban,
        toAccountIban: this.toAccountIban,
        initiatorUserId: this.userStore.getUserId,
        transferAmount: this.transferAmount,
        description: this.description,
      };

      try {
        await axios.post('/transactions/employee', transaction, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.errorMessage = '';
        this.fromAccountIban = '';
        this.toAccountIban = '';
        this.transferAmount = null;
        this.description = '';
      } catch (error) {
        this.errorMessage = error.response.data.message || 'An error occurred while submitting the form.';
      }
    },
  },
};
</script>

<style scoped>
.TransferFunds {
  margin-left: 200px;
  padding: 20px;
}
</style>
