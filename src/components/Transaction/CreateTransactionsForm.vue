<template>
  <div class="container d-flex justify-content-center align-items-center" style="height: 80vh;">

    <section class="p-3 card col-md-6 mx-auto">
    <div class="mt-3 input-group col-md-6">
      <input v-model="usernameToSearch" type="text" class="form-control" placeholder="Enter username to find IBAN">
      <div class="input-group-append">
        <button @click="getIbanByUsername" class="btn btn-primary">Find IBAN</button>
      </div>
    </div>

    <div v-if="accounts && accounts.length" class="mt-3 col-md-6">
      <div v-for="account in accounts" :key="account.account_id" class="alert alert-info">
        <p>Account Holder: {{ account.user.first_name }} {{ account.user.last_name }}</p>
        <p>Account Type: {{ account.account_type }}</p>
        <p>IBAN: {{ account.iban }}</p>
      </div>
    </div>
  </section>

    <form class="p-3 card col-md-3" @submit.prevent="submitForm">
      <h1>Transaction</h1>
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
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import { useUserStore } from '@/stores/userstore';

export default {
  setup() {
    const userStore = useUserStore();

    return {
      userStore,

    };
  },
  data() {
    return {
      to_account_iban: '',
      transfer_amount: null,
      description: '',
      errorMessage: '',
      cannotfind: '',
      accounts: [],
      usernameToSearch: '',
    };
  },
  methods: {
    async submitForm() {
      const transaction = {
        to_account_iban: this.to_account_iban,
        initiator_user_id: this.userStore.getUserId,
        transfer_amount: this.transfer_amount,
        description: this.description,
      };

      try {
        await axios.post('/transactions/createWithIban', transaction);
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = error.response.data.message || 'An error occurred while submitting the form.';
      }
    },
    getIbanByUsername() {
      axios.get(`/accounts/username/${this.usernameToSearch}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
          .then(response => {
            if (response.data.length === 0) {
              this.cannotFind = 'No accounts found for this username.';
            } else {
              this.accounts = response.data;
              this.cannotFind = '';
            }
            console.log(response.data)
          })
          .catch(error => {
            console.error(error);
          });
    },
  },
};
</script>

<style scoped>

</style>