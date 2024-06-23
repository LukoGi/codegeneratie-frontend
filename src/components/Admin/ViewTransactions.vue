<template>
  <div class="all-transactions-view">
    <AdminSideNav />
    <div class="container">
      <div class="card mt-3">
        <div class="card-body">
          <h5 class="card-title">Filter Transactions</h5>
          <div class="row">
            <div class="col-md-6">
              <label for="start-date" class="form-label">Start Date</label>
              <input id="start-date" type="date" class="form-control mb-2" v-model="startDate" placeholder="Start Date" />
            </div>
            <div class="col-md-6">
              <label for="end-date" class="form-label">End Date</label>
              <input id="end-date" type="date" class="form-control mb-2" v-model="endDate" placeholder="End Date" />
            </div>
            <div class="col-md-6">
              <label for="min-amount" class="form-label">Min Amount</label>
              <input id="min-amount" type="number" class="form-control mb-2" v-model="minAmount" placeholder="Min Amount" />
            </div>
            <div class="col-md-6">
              <label for="max-amount" class="form-label">Max Amount</label>
              <input id="max-amount" type="number" class="form-control mb-2" v-model="maxAmount" placeholder="Max Amount" />
            </div>
            <div class="col-md-6">
              <label for="iban" class="form-label">IBAN</label>
              <input id="iban" type="text" class="form-control mb-2" v-model="iban" placeholder="IBAN" />
            </div>
            <div class="col-md-6 d-flex align-items-end">
              <button class="btn btn-primary mb-2" @click="fetchTransactions">Apply Filters</button>
            </div>
          </div>
          <p class="text-muted">Note: The date range is inclusive. Transactions from the start date to the end date will be displayed.</p>
        </div>
      </div>
      <div class="container">
        <h1 class="mb-3">All Transactions</h1>
        <table class="table">
          <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>From Account IBAN</th>
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
            <td>{{ transaction.initiatorUser.username }}</td>
            <td>{{ transaction.initiatorUser.firstName }} {{ transaction.initiatorUser.lastName }}</td>
            <td>{{ transaction.toAccount.user.firstName }} {{ transaction.toAccount.user.lastName }}</td>
            <td>{{ transaction.toAccount.iban }}</td>
            <td>{{ transaction.transferAmount }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userstore.js';
import axios from '@/axios-auth.js';
import TransactionCard from '../Transaction/TransactionCard.vue';
import AdminSideNav from './AdminSideNav.vue';

export default {
  components: {
    TransactionCard,
    AdminSideNav,
  },
  data() {
    return {
      userStore: useUserStore(),
      userId: null,
      transactions: [],
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: '',
      iban: '',
      token: localStorage.getItem('token'),
    };
  },
  created() {
    const route = useRoute();
    this.userId = route.params.customerId;
    this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      try {
        let url = `transactions/users/${this.userId}`;
        if (this.startDate) url += `&startDate=${new Date(this.startDate).toISOString()}`;
        if (this.endDate) {
          const endDateInclusive = new Date(this.endDate);
          endDateInclusive.setHours(23, 59, 59, 999);
          url += `&endDate=${endDateInclusive.toISOString()}`;
        }
        if (this.minAmount) url += `&minAmount=${this.minAmount}`;
        if (this.maxAmount) url += `&maxAmount=${this.maxAmount}`;
        if (this.iban) url += `&iban=${this.iban}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        console.log('Response:', response);
        this.transactions = this.formatTransactions(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
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
  },
};
</script>

<style scoped>
.filters {
  margin-bottom: 20px;
}

.filters input {
  margin-bottom: 10px;
}

.filters button {
  margin-top: 10px;
}
</style>
