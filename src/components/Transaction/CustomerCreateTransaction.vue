<template>
  <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  <div
    class="container d-flex justify-content-center align-items-center"
    style="height: 80vh"
  >
    <section class="p-3 card col-md-6 mx-auto">
      <div class="mt-3 input-group col-md-6">
        <input v-model="usernameToSearch" type="text" class="form-control" placeholder="Enter username to find IBAN">
        <div class="input-group-append">
          <button @click="getIbanByUsername" class="btn btn-primary">Find IBAN</button>
        </div>
      </div>

      <div v-if="accounts && accounts.length" class="mt-3 col-md-6">
        <div v-for="account in accounts" :key="account.account_id" class="alert alert-info">
          <p>Account Holder: {{ account.user.firstName }} {{ account.user.lastName }}</p>
          <p>Account Type: {{ account.accountType }}</p>
          <p>IBAN: {{ account.iban }}</p>
        </div>
      </div>
    </section>

    <form class="p-3 card col-md-3" @submit.prevent="submitForm">
      <h1>Transaction</h1>

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
import { useUserStore } from "@/stores/userstore";

export default {
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
  data() {
    return {
      toAccountIban: "",
      transferAmount: null,
      description: "",
      errorMessage: "",
      usernameToSearch: "",
      accounts: [],
      cannotFind: "",
    };
  },
  methods: {
    async submitForm() {
      const transaction = {
        toAccountIban: this.toAccountIban,
        initiatorUserId: this.userStore.getUserId,
        transferAmount: this.transferAmount,
        description: this.description,
      };

      try {
        await axios.post("/transactions/customer", transaction, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.errorMessage = "";
        this.$router.push("/transactionshome");
      } catch (error) {
        this.errorMessage =
          error.response.data.message ||
          "An error occurred while submitting the form.";
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

<style scoped></style>
