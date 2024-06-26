<template>
  <div class="all-transactions-view">
    <AdminSideNav />
    <div class="container">
      <h1 class="text-center mt-5">All Transactions</h1>
      <table class="table table-striped mt-3">
        <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Initiator Name</th>
          <th>Recipient Name</th>
          <th>To Account IBAN</th>
          <th>Transfer Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ transaction.date }}</td>
          <td>{{ transaction.description }}</td>
          <td>{{ transaction.initiatorUser.firstName }} {{ transaction.initiatorUser.lastName }}</td>
          <td>{{ transaction.toAccount.user.firstName }} {{ transaction.toAccount.user.lastName }}</td>
          <td>{{ maskIban(transaction.toAccount.iban) }}</td>
          <td>{{ transaction.transferAmount }} </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import axios from '@/axios-auth.js';
import AdminSideNav from './AdminSideNav.vue';

export default {
  components: {
    AdminSideNav,
  },
  data() {
    return {
      transactions: [],
      token: localStorage.getItem('token'),
    };
  },
  created() {
    this.fetchTransactions();
  },
  methods: {
    maskIban(iban) {
      return iban.slice(-4).padStart(iban.length, '*');
    },

    formatTransactions(transactions) {
      transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        transaction.date = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        transaction.transferAmount = (transaction.transferAmount).toLocaleString('en-US', {
          style: 'currency',
          currency: 'EUR',
        });
      });
      return transactions;
    },
    async fetchTransactions() {
      try {
        const response = await axios.get('/transactions/', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.transactions = this.formatTransactions(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
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