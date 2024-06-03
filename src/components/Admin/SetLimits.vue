<template>
  <div class="login-container d-flex justify-content-center align-items-center" style="height: 80vh;">
    <form class="p-3 card col-md-3" @submit.prevent="setLimits">

      <h1>Set Limits</h1>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

      <div class="form-group mb-3">
        <label for="absolute">Absolute Transfer Limit:</label>
        <input id="absolute" v-model="limits.absolute_transfer_limit" type="number" class="form-control" required>
      </div>

      <div class="form-group mb-3">
        <label for="daily">Daily Transfer Limit:</label>
        <input id="daily" v-model="limits.daily_transfer_limit" type="number" class="form-control" required>
      </div>

      <button class="btn btn-primary" type="submit">Set Limits</button>
    </form>
  </div>
</template>

<script>
import axios from "../../axios-auth";

export default {
  data() {
    return {
      user_id: null,
      errorMessage: '',
      limits: {
        absolute_transfer_limit: null,
        daily_transfer_limit: null,
      },
    };
  },
  created() {
    this.user_id = this.$route.params.user_id;
  },
  methods: {
    setLimits() {
      if (this.limits.absolute_transfer_limit <= 0 || this.limits.daily_transfer_limit <= 0) {
        this.errorMessage = 'Limits must be greater than zero';
        return;
      }
      const userUpdate = {
        user_id: this.user_id,
        daily_transfer_limit: this.limits.daily_transfer_limit,
        absolute_transfer_limit: this.limits.absolute_transfer_limit,
      };

      axios.put('http://localhost:8080/users/acceptUser/' + this.user_id, userUpdate)
        .then(response => {
          console.log(response.data);
          this.$router.push({ path: '/admin/pendinguser' });
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
/* Your CSS goes here */
</style>