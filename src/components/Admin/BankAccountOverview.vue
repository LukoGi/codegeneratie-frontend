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
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="account in users" :key="account.account_id">
            <td>{{ account.user.first_name }}</td>
            <td>{{ account.user.last_name }}</td>
            <td>{{ maskIban(account.iban) }}</td>
            <td>{{ formatCurrency(account.balance) }}</td>
            <td>{{ account.is_active ? 'Active' : 'Not Active' }}</td>
            <td>
              <button class="btn btn-primary" @click="closeAccount(account.account_id)">Close Account</button>
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
      axios.get('/accounts/')
          .then(response => {
            this.users = response.data.users || response.data;
            console.log (response)
          })
          .catch(error => {
            console.log(error);
          });
    },
    closeAccount(accountId) {
      axios.put(`/accounts/${accountId}/closeAccount`)
          .then(response => {
            console.log(response.data);

            this.users = this.users.filter(account => account.account_id !== accountId);
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