<template>

    <div class="login-container d-flex justify-content-center align-items-center" style="height: 80vh;">
    
      <form class="p-3 card col-md-3" @submit.prevent="submitForm">
        <h1>Open Account</h1>
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  
        <div class="form-group mb-3">
          <label for="username">Username:</label>
          <input id="username" v-model="user.username" type="text" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <label for="password">Password:</label>
          <input id="password" v-model="user.password" type="password" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <label for="first_name">First Name:</label>
          <input id="first_name" v-model="user.first_name" type="text" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <label for="last_name">Last Name:</label>
          <input id="last_name" v-model="user.last_name" type="text" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <label for="email">Email:</label>
          <input id="email" v-model="user.email" type="email" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <label for="phone_number">Phone Number:</label>
          <input id="phone_number" v-model="user.phone_number" type="text" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <label for="bsn_number">BSN Number:</label>
          <input id="bsn_number" v-model="user.bsn_number" type="text" class="form-control" required>
        </div>
        <button class="btn btn-primary" type="submit">Open Account</button>
      </form>
    </div>
  </template>

<script>
import axios from "../../axios-auth";

export default {
    name: 'OpenAccount',
    data() {
        return {
            user: {
                username: '',
                password: '',
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                bsn_number: '',
            },
            errorMessage: '',
        };
    },
    methods: {
        submitForm() {
            axios.post('http://localhost:8080/users/createUser', this.user)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ path: '/login' });
                })
                .catch(error => {
                    console.log(error);
                    this.errorMessage = error.response.data.message;
                });
        },
    },
};
</script>
