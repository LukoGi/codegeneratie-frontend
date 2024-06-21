<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <router-link
        to="/atm/main-menu"
        tag="button"
        class="btn btn-secondary btn-lg"
        active-class="active"
        >< Go Back</router-link
      >
      <button class="btn btn-secondary btn-lg" @click="logout">
        Eject card
      </button>
    </div>
    <div class="text-center mt-5">
      <h1>ATM Withdraw</h1>
      <h3 class="mt-5">Your current balance is</h3>
      <h3 class="fw-bold">€ {{ atmStore.getBalance }}</h3>
    </div>
    <div class="d-flex flex-column align-items-center mt-5">
      <input
        min="1"
        type="number"
        class="form-control m-1"
        style="width: 40%"
        placeholder="Enter amount to withdraw"
        v-model="amount"
        @input="correctInput"
      />
      <button
        class="btn btn-primary btn-lg m-1"
        style="width: 40%"
        @click="withdraw"
      >
        Withdraw
      </button>
      <p class="text-danger" id="warningText"></p>
    </div>
  </div>
</template>

<script>
import { useAtmStore } from "@/stores/atmstore";
import router from "@/router";

export default {
  name: "ATMWithdraw",
  setup() {
    const atmStore = useAtmStore();
    const $router = router;

    if (!atmStore.isLoggedIn) {
      $router.push("/atm/login");
    }

    return { atmStore };
  },
  data() {
    return {
      amount: null,
    };
  },
  methods: {
    logout() {
      this.atmStore.logout();
      this.$router.push("/atm/login");
    },
    async withdraw() {
    if (this.validateInput()) {
      try {
        await this.atmStore.withdraw(this.amount);
        document.getElementById("warningText").innerHTML = "";
      } catch (error) {
        document.getElementById("warningText").innerHTML = error.response.data.message;
      }
    }
  },
    correctInput() {
      if (this.amount < 1) {
        this.amount = null;
      }
    },
    validateInput() {
      if (this.amount > 0) {
        return true;
      } else {
        document.getElementById("warningText").innerHTML =
          "Please enter a valid amount";
        return false;
      }
    },
  },
};
</script>

<style scoped></style>
