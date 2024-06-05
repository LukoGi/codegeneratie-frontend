<template>
  <div class="filters">
    <input type="date" v-model="startDate" placeholder="Start Date" />
    <input type="date" v-model="endDate" placeholder="End Date" />
    <input type="number" v-model="minAmount" placeholder="Min Amount" />
    <input type="number" v-model="maxAmount" placeholder="Max Amount" />
    <input type="text" v-model="iban" placeholder="IBAN" />
    <button @click="fetchTransactions">Apply Filters</button>
  </div>

  <div v-if="userStore.getRoles && userStore.getRoles.includes('ROLE_EMPLOYEE')">
    <h1 class="mb-3">Transactions for Customer ID: {{ customerId }} </h1>
    <div class="row justify-content-center">
      <div class="col-md-5" v-for="transaction in transactions" :key="transaction.transactionId">
        <TransactionCard :transaction="transaction" />
      </div>
    </div>
  </div>

  <div v-if="userStore.getRoles && userStore.getRoles.includes('ROLE_USER')">
    <h1 class="mb-3"> Your Transactions</h1>
    <div class="row justify-content-center">
      <div class="col-md-5" v-for="transaction in transactions" :key="transaction.transactionId">
        <TransactionCard :transaction="transaction" />
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
        if (endDate.value) url += `&endDate=${new Date(endDate.value).toISOString()}`;
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