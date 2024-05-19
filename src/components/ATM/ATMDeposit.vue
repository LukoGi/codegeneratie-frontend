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
      <button class="btn btn-secondary btn-lg" @click="logout">Eject card</button>
    </div>
    <div class="text-center mt-5">
      <h1>ATM Deposit</h1>
      <h3 class="mt-5">Your current balance is</h3>
      <h3 class="fw-bold"> € {{ atmStore.getBalance }} </h3>
    </div>
    <div class="d-flex flex-column align-items-center mt-5">
      <input
        min="1"
        type="number"
        class="form-control m-1"
        style="width: 40%"
        placeholder="Enter amount to deposit"
      />
      <button class="btn btn-primary btn-lg m-1" style="width: 40%">
        Deposit
      </button>
    </div>
  </div>
</template>

<script>
import { useAtmStore } from '@/stores/atmstore'; 
import router from '@/router';

export default {
  name: 'ATMDeposit',
  setup() {
    const atmStore = useAtmStore();
    const $router = router;

    if (!atmStore.isLoggedIn) {
      $router.push('/atm/login');
    }

    return { atmStore };
  },
  methods: {
    logout() {
      this.atmStore.logout();
      this.$router.push('/atm/login');
    }
  }
};
</script>

<style scoped></style>
