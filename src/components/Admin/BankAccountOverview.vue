<template>
  <div class="all-transactions-view">
    <AdminSideNav />
    <div class="container">
      <div class="card mt-3">
      </div>
      <div class="container">
        <h1 class="mb-3">All Users</h1>
        <table class="table">
          <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>IBAN</th>
            <th>Balance</th>
            <th>active</th>
            <th>View Users Transaction</th>
            <th>Action</th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="account in users" :key="account.accountId">
            <td>{{ account.user.firstName }}</td>
            <td>{{ account.user.lastName }}</td>
            <td>{{ maskIban(account.iban) }}</td>
            <td>{{ formatCurrency(account.balance) }}</td>
            <td>{{ account.isActive ? 'Active' : 'Not Active' }}</td>
            <td>
              <router-link :to="`/admin/transactionoverview/${account.accountId}`" class="btn btn-primary">View Transactions</router-link>
            </td>
            <td>
              <button class="btn btn-primary" @click="closeAccount(account.accountId)">Close Account</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSideNav from './AdminSideNav.vue';
import axios from "../../axios-auth";

export default {
  components: {
    AdminSideNav
  },
  data() {
    return {
      users: [],
      username: '',
      token: localStorage.getItem('token'),
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    maskIban(iban) {
      return iban.slice(-4).padStart(iban.length, '*');
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    },
    getUsers() {
      axios.get('/accounts/', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
          .then(response => {
            this.users = response.data.users || response.data;
          })
          .catch(error => {
          });
    },
    closeAccount(accountId) {
      axios.put(`/accounts/${accountId}/closeAccount`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response => {
            console.log(response.data);
            this.users = this.users.filter(account => account.accountId !== accountId);
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
};
</script>

<style scoped>
.all-transactions-view {
  margin-left: 200px;
  padding: 20px;
}
</style>