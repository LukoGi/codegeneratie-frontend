<template>
  <div
    class="login-container d-flex justify-content-center align-items-center"
    style="height: 80vh"
  >
    <form class="p-3 card col-md-3" @submit.prevent="login">
      <h1>Insert Card</h1>

      <div class="form-group mb-3">
        <label for="fullname">Name on Card</label>
        <input
          type="text"
          class="form-control"
          id="fullname"
          v-model="fullname"
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
</template>

<script>
import { useAtmStore } from "@/stores/atmstore";

export default {
  name: "ATMLogin",
  data() {
    return {
      fullname: "",
      iban: "",
      pin: "",
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
        await this.atmStore.login(this.fullname, this.iban, this.pin);
        this.$router.push("/atm/main-menu");
      } catch (error) {
        this.errorMessage = error;
      }
    },
  },
};
</script>
