<template>
  <div class="maincontainer">
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <div
      class="login-container d-flex justify-content-center align-items-center"
      style="height: 80vh"
    >
      <form class="p-3 card col-md-3" @submit.prevent="login">
        <h1>Insert Card</h1>
        <div class="form-group mb-3">
          <label for="fullName">Name on Card</label>
          <input
            type="text"
            class="form-control"
            id="fullName"
            v-model="fullName"
            required
          />
          <small class="text-muted">Full name as displayed on card</small>
        </div>
        <div class="form-group mb-3">
          <label for="iban">IBAN</label>
          <input
            type="text"
            class="form-control"
            id="iban"
            v-model="iban"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="pin">PIN</label>
          <input
            type="password"
            class="form-control"
            id="pin"
            v-model="pin"
            required
          />
        </div>
        <button class="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAtmStore } from "@/stores/atmstore";

export default {
  name: "ATMLogin",
  data() {
    return {
      fullName: "",
      iban: "",
      pin: "",
      errorMessage: "",
    };
  },
  setup() {
    const atmStore = useAtmStore();
    atmStore.logout();
    return { atmStore };
  },
  methods: {
    async login() {
      try {
        await this.atmStore.login(this.fullName, this.iban, this.pin)
        this.$router.push("/atm/main-menu");
      } catch (error) {
        this.errorMessage = error.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
.maincontainer {
  margin-top: -1.5rem;
}
</style>
