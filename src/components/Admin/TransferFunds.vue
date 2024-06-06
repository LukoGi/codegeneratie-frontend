<template>
  <div class="TransferFunds container">
    <AdminSideNav />
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <div class="row mt-5">
      <div class="col-md-6 offset-md-3 card">
        <h2 class="text-center mb-4">Transfer Funds</h2>

        <form @submit.prevent="submitForm">
          <div class="form-group mb-3">
            <label for="from_account_iban">From Account IBAN:</label>
            <input
                type="text"
                class="form-control"
                id="from_account_iban"
                v-model="from_account_iban"
                required
            />
          </div>
          <div class="form-group mb-3">
            <label for="to_account_iban">To Account IBAN:</label>
            <input
                type="text"
                class="form-control"
                id="to_account_iban"
                v-model="to_account_iban"
                required
            />
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
      from_account_iban: '',
      to_account_iban: '',
      transfer_amount: null,
      description: '',
      errorMessage: '',
    };
  },
  methods: {
    async submitForm() {
      const transaction = {
        from_account_iban: this.from_account_iban,
        to_account_iban: this.to_account_iban,
        initiator_user_id: this.userStore.getUserId,
        transfer_amount: this.transfer_amount,
        description: this.description,
      };

      try {
        await axios.post('/transactions/transferFunds', transaction);
        this.errorMessage = '';
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
