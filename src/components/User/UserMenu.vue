<template>
  <div class="home">
    <header class="text-white text-center py-5">
      <h1>User information</h1>
    </header>
  </div>

  <div class="container align-items-center" style="height: 100vh;">
    <div class="d-flex justify-content-center">
      <div class="card p-3 col-md-8">
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
    </div>
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

    <div class="d-flex justify-content-center mt-3">
      <div class="card p-3 col-md-8">
        <div class="card-header">
          <h2 class="text-center">Total Bank Accounts: {{ bankAccounts.length }}</h2>
        </div>
        <div class="card-body">
          <h5 class="card-title">Bank Accounts:</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="account in bankAccounts" :key="account.id">
              <div class="d-flex justify-content-between">
                <div>IBAN: {{ account.iban }}</div>
                <div class="balance">Balance: €{{ account.balance }}</div>
                <div class="account_type"> Account type: {{account.account_type}}</div>
              </div>
            </li>
          </ul>
        </div>
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
<style scoped>
.container {
  margin-top: 20px;
}

.card {
  margin-bottom: 20px;
}

.card-header {
  background-color: #48877a;
  color: white;
}

.card-title {
  margin-bottom: 20px;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balance {
  margin-left: 120px;
}
.account_type {
  margin-left: 120px;
}
</style>


