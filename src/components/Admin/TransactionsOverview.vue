<template>
  <div class="all-transactions-view">
    <AdminSideNav />
    <div class="container">
      <h1 class="text-center mt-5">All Transactions</h1>
      <table class="table table-striped mt-3">
        <thead>
        <tr>
          <th>Recipient Name</th>
          <th>From Account</th>
          <th>Initiator Name</th>
          <th>To Account</th>
          <th>Transfer Amount</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="transaction in transactions" :key="transaction.fromAccountIban">
          <td>{{ transaction.recipientName }}</td>
          <td>{{ maskIban(transaction.fromAccountIban)}}</td>
          <td>{{ transaction.initiatorName }}</td>
          <td>{{ maskIban(transaction.toAccountIban) }}</td>
          <td>{{ transaction.transferAmount }}</td>
          <td>{{ transaction.date }}</td>
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
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        transaction.date = formattedDate;
        transaction.transferAmount = (transaction.transferAmount * 1.1).toLocaleString('en-US', {
          style: 'currency',
          currency: 'EUR',
        });

      });
      return transactions;
    },
    async fetchTransactions() {
      try {
        const response = await axios.get('/transactions/', {
          params: {
            date: null,
            minAmount: null,
            maxAmount: null,
            iban: null,
          },
        });
        console.log('Response:', response);
        this.transactions = this.formatTransactions(response.data.content);
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