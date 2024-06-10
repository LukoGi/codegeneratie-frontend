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
    <!-- Bank Acc Section -->
    <div class="mt-3 input-group">
      <input v-model="usernameToSearch" type="text" class="form-control" placeholder="Enter username to find IBAN">
      <div class="input-group-append">
        <button @click="getIbanByUsername" class="btn btn-primary">Find IBAN</button>
      </div>
    </div>

    <div v-if="accounts && accounts.length" class="mt-3">
      <div v-for="account in accounts" :key="account.account_id" class="alert alert-info">
        <p>Account Holder: {{ account.user.first_name }} {{ account.user.last_name }}</p>
        <p>Account Type: {{ account.account_type }}</p>
        <p>IBAN: {{ account.iban }}</p>
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
            <div>
              Your <strong>{{ account.account_type}} </strong> account: <br>
            {{ account.iban }}
            </div>
            <router-link :to="`/transactions/${account.account_id}`" class="btn btn-primary">View Transactions</router-link>
          </li>
        </ul>
      </div>
      </div>
    <div class="home mt-5">
      <!-- Transactions Section -->
      <section class="overview py-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">Create New Transaction</h5>
                  <router-link to="/createtransactionsform" class="btn btn-primary">Go</router-link>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">Transfer Funds Between Accounts</h5>
                  <router-link to="/transferfundsform" class="btn btn-primary">Go</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
        usernameToSearch: '',
        iban: '',
        accounts: null,
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
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
    },
    methods: {
      getIbanByUsername() {
        axios.get(`/accounts/username/${this.usernameToSearch}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
            .then(response => {
              this.accounts = response.data;
              console.log(response.data)
            })
            .catch(error => {
              console.error(error);
            });
      },
    },
  };
  </script>

<style>
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>


