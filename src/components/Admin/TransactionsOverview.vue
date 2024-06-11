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
          <td>{{ transaction.initiator_user.first_name }} {{ transaction.initiator_user.last_name }}</td>
          <td>{{ transaction.to_account.user.first_name }} {{ transaction.to_account.user.last_name }}</td>
          <td>{{ maskIban(transaction.to_account.iban) }}</td>
          <td>{{ amountFormatter(transaction.transfer_amount) }}</td>
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
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: '',
      iban: '',
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
    amountFormatter(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);
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
        let url = '/transactions/';
        if (this.startDate) url += `?startDate=${new Date(this.startDate).toISOString()}`;
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
        this.transactions = this.formatTransactions(response.data); // Changed from response.data.content to response.data
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