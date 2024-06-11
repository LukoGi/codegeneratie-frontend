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


