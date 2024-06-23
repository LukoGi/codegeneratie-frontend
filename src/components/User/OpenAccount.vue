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
          <label for="firstName">First Name:</label>
          <input id="firstName" v-model="user.firstName" type="text" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <label for="lastName">Last Name:</label>
          <input id="lastName" v-model="user.lastName" type="text" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <label for="email">Email:</label>
          <input id="email" v-model="user.email" type="email" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <label for="phoneNumber">Phone Number:</label>
          <input id="phoneNumber" v-model="user.phoneNumber" type="text" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <label for="bsnNumber">BSN Number:</label>
          <input id="bsnNumber" v-model="user.bsnNumber" type="text" class="form-control" required>
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
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                bsnNumber: '',
                is_archived: false,
                isApproved: false,
                roles: ['ROLE_USER'],
                dailyTransferLimit: null,
            },
            errorMessage: '',
        };
    },
    methods: {
        submitForm() {
            if (!this.validatePhoneNumber(this.user.phoneNumber)) {
              this.errorMessage = 'Invalid phone number';
             return;
            }
            if(this.user.bsnNumber.length !== 9) {
              this.errorMessage = 'Invalid BSN number';
              return;
            }

            axios.post('/users/', this.user)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ path: '/login' });
                })
                .catch(error => {
                    console.log(error);
                    this.errorMessage = error.response.data.message;
                });
        },
        validatePhoneNumber(phoneNumber) {
            const phoneRegex = /^\d{10,11}$/;
            return phoneRegex.test(phoneNumber);
        },
    },
};
</script>
