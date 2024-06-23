<template>
  <div class="container">
    <div class="d-flex justify-content-end"><button class="btn btn-secondary btn-lg" @click="logout">Eject card</button></div>
    <div class="text-center mt-5">
      <h1>Welcome</h1>
      <h1 class="fw-bold">{{ atmStore.getfullName }}</h1>
      <h3 class="mt-5">Your current balance is</h3> 
      <h3 class="fw-bold"> € {{ atmStore.getBalance }} </h3>
    </div>
    <div class="d-flex justify-content-center mt-5">
      <router-link to="/atm/withdraw" tag="button" class="btn btn-primary btn-lg m-1" style="width: 20%;" active-class="active">Withdraw Money</router-link>
      <router-link to="/atm/deposit" tag="button" class="btn btn-primary btn-lg m-1" style="width: 20%;" active-class="active">Deposit Money</router-link>
    </div>
  </div>
</template>

<script>
import { useAtmStore } from '@/stores/atmstore'; 
import router from '@/router';

export default {
  name: 'ATMMainMenu',
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
