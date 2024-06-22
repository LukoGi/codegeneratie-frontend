<template>
  <div class="login-container d-flex justify-content-center align-items-center" style="height: 80vh;">
    <form class="p-3 card col-md-3" @submit.prevent="setLimits">

      <h1>Set Limits</h1>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

      <div class="form-group mb-3">
        <label for="absolute">Absolute Limit:</label>
        <input id="absolute" v-model="limits.absoluteLimit" type="number" class="form-control" required>
      </div>

      <div class="form-group mb-3">
        <label for="daily">Daily Transfer Limit:</label>
        <input id="daily" v-model="limits.dailyTransferLimit" type="number" class="form-control" required>
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
        absoluteLimit: null,
        dailyTransferLimit: null,
      },
    };
  },
  created() {
    this.user_id = this.$route.params.user_id;
  },
  methods: {
    setLimits() {
      if (this.limits.dailyTransferLimit <= 0) {
        this.errorMessage = 'Daily transfer Limit must be greater than zero';
        return;
      } 
      if (this.limits.absoluteLimit >= 0) {
        this.errorMessage = 'Absolute Limit must be less or equal to zero';
        return;
      }
      const userUpdate = {
        user_id: this.user_id,
        dailyTransferLimit: this.limits.dailyTransferLimit,
        absoluteLimit: this.limits.absoluteLimit,
      };

      axios.put('/users/approve/' + this.user_id, userUpdate, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
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
</style>