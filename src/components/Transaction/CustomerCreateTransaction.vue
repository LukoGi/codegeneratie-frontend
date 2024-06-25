<template>
  <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  <div
    class="container d-flex justify-content-center align-items-center"
    style="height: 80vh"
  >
    <section class="p-3 card col-md-6 mx-auto">
      <h1> Find accounts by username</h1>
      <div class="mt-3 input-group col-md-6">
        <input v-model="usernameToSearch" type="text" class="form-control" placeholder="Enter username to find IBAN">
        <div class="input-group-append">
          <button @click="getIbanByUsername" class="btn btn-primary">Find IBAN</button>
        </div>
      </div>
      <div v-for="(iban, index) in foundIbans" :key="index" class="alert alert-info mt-3">
        <p>{{ iban }}</p>
        <button @click="selectIban(iban)" class="btn btn-primary">Select this IBAN</button>
      </div>
      <div v-if="cannotFind" class="alert alert-danger mt-3">{{ cannotFind }}</div>
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
      foundIbans: [],
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
    selectIban(iban) {
      this.toAccountIban = iban;
    },

    getIbanByUsername() {
      axios.get(`/accounts/username/${this.usernameToSearch}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
          .then(response => {
              this.foundIbans = response.data;
              this.cannotFind = '';
            console.log(response.data)
          })
          .catch(error => {
            if (error.response && error.response.data) {
              this.cannotFind = "Cannot find any accounts with that username."
              this.foundIbans = [];
            } else {
              console.error(error);
            }
          });
    },
  },
};
</script>

<style scoped></style>
