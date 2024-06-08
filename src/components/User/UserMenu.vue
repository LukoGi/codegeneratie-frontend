<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h1 class="text-center">Welcome, {{ user.first_name }} {{ user.last_name }}</h1>
      </div>
      <div class="card-body">
        <h5 class="card-title">User Details:</h5>
        <p class="card-text">Username: {{ user.username }}</p>
        <p class="card-text">Email: {{ user.email }}</p>
        <p class="card-text">BSN-number: {{ user.bsn_number }}</p>
        <p class="card-text">Phone number: {{ user.phone_number }}</p>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        <h2 class="text-center">Total Bank Accounts: {{ bankAccounts.length }}</h2>
      </div>
      <div class="card-body">
        <h5 class="card-title">Bank Accounts:</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="account in bankAccounts" :key="account.id">
            {{ account.iban }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from "../../axios-auth";
  
  export default {
    data() {
      return {
        user: { first_name: 'first_name', last_name: 'last_name', username: 'username', email: 'email', bsn_number: 'bsn_number', phone_number: 'phone_number'},
        bankAccounts: [],
      };
    },
    created() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login');
        return;
    }
      axios.get('/users/userinfo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        console.error(error);
      });
      axios.get('/users/myAccounts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        this.bankAccounts = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
  };
  </script>
