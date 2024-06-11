<template>
  <div class="transaction-history">
    <router-link to="/usermenu" class="btn btn-primary">Back to User Menu</router-link>
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
            <button class="btn btn-primary mb-2" @click="getTransactionHistory">Apply Filters</button>
          </div>
        </div>
        <p class="text-muted">Note: The date range is inclusive. Transactions from the start date to the end date will be displayed.</p>
      </div>
    </div>
    <h1 class="text-center mt-5">Transaction History</h1>
    <div v-if="transactions.length === 0" class="alert alert-info mt-3">
      No transactions made yet.
    </div>
    <table v-else class="table table-striped mt-3">
      <thead>
      <tr>
        <th>Date</th>
        <th>To Account</th>
        <th>Amount</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="transaction in transactions" :key="transaction.date">
        <td>{{ formatDate(transaction.date) }}</td>
        <td>{{ transaction.to_account.user.username }}</td>
        <td>{{ transaction.initiator_user.username === userStore.getUsername ? '- ' : '+ ' }}{{ formatCurrency(transaction.transfer_amount) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import { useUserStore } from "@/stores/userstore.js";

export default {
  data() {
    return {
      transactions: [],
      accountId: null,
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: '',
      iban: '',
      token: localStorage.getItem('token'),
    };
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  created() {
    this.accountId = this.$route.params.id;
    this.getTransactionHistory();
  },
  methods: {
    formatDate(value) {
      const date = new Date(value);
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(value);
    },
    getTransactionHistory() {
      let url = `/transactions/account/${this.accountId}`;
      if (this.startDate) url += `?startDate=${new Date(this.startDate).toISOString()}`;
      if (this.endDate) {
        const endDateInclusive = new Date(this.endDate);
        endDateInclusive.setHours(23, 59, 59, 999);
        url += `&endDate=${endDateInclusive.toISOString()}`;
      }
      if (this.minAmount) url += `&minAmount=${this.minAmount}`;
      if (this.maxAmount) url += `&maxAmount=${this.maxAmount}`;
      if (this.iban) url += `&iban=${this.iban}`;

      const token = localStorage.getItem('token');

      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
          .then(response => {
            this.transactions = response.data;
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
};
</script>

<style scoped>
.transaction-history {
  margin: 20px;
}
</style>