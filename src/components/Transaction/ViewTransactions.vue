<template>
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

    <div v-if="userStore.getRoles && userStore.getRoles.includes('ROLE_EMPLOYEE')" class="mt-3">
      <h1 class="mb-3">Transactions for Customer ID: {{ customerId }}</h1>
      <div class="row justify-content-center">
        <div class="col-md-5" v-for="transaction in transactions" :key="transaction.transactionId">
          <TransactionCard :transaction="transaction" />
        </div>
      </div>
    </div>

    <div v-if="userStore.getRoles && userStore.getRoles.includes('ROLE_USER')" class="mt-3">
      <h1 class="mb-3">Your Transactions</h1>
      <div class="row justify-content-center">
        <div class="col-md-5" v-for="transaction in transactions" :key="transaction.transactionId">
          <TransactionCard :transaction="transaction" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userstore';
import axios from '@/axios-auth';
import TransactionCard from './TransactionCard.vue';

export default {
  components: {
    TransactionCard,
  },
  setup() {
    const route = useRoute();
    const userStore = useUserStore();
    const customerId = ref(route.params.customerId);
    const transactions = ref([]);
    const loading = ref(true);

    // Filter parameters
    const startDate = ref('');
    const endDate = ref('');
    const minAmount = ref('');
    const maxAmount = ref('');
    const iban = ref('');

    const fetchTransactions = async () => {
      try {
        let url = `transactions/customer/${customerId.value}?offset=0&limit=10`;
        if (userStore.getRoles.includes('ROLE_USER')) {
          url = `transactions/customer/${userStore.getUserId}?offset=0&limit=10`;
        }
        if (startDate.value) url += `&startDate=${new Date(startDate.value).toISOString()}`;
        if (endDate.value) {
          const endDateInclusive = new Date(endDate.value);
          endDateInclusive.setHours(23, 59, 59, 999);
          url += `&endDate=${endDateInclusive.toISOString()}`;
        }
        if (minAmount.value) url += `&minAmount=${minAmount.value}`;
        if (maxAmount.value) url += `&maxAmount=${maxAmount.value}`;
        if (iban.value) url += `&iban=${iban.value}`;

        const response = await axios.get(url);
        transactions.value = response.data;
        loading.value = false;
      } catch (error) {
        console.error('Error:', error);
        loading.value = false;
      }
    };

    onMounted(fetchTransactions);

    return {
      userStore,
      customerId,
      transactions,
      loading,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      iban,
      fetchTransactions,
    };
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
