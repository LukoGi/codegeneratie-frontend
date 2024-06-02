<template>
  <div>
    <h1 class="mb-3">All Transactions</h1>
    <div class="row justify-content-center">
      <div class="col-md-5" v-for="transaction in transactions" :key="transaction.id">
        <TransactionCard :transaction="transaction" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from '@/axios-auth';
import TransactionCard from './AllTransactionCard.vue';

export default {
  components: {
    TransactionCard,
  },
  setup() {
    const transactions = ref([]);
    const loading = ref(true);

    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/transactions/all', {
          params: {
            date: null,
            minAmount: null,
            maxAmount: null,
            iban: null,
          },
        });
        console.log('Response:', response);
        transactions.value = response.data.content; // Changed this line
        loading.value = false;
      } catch (error) {
        console.error('Error:', error);
        loading.value = false;
      }
    };

    onMounted(fetchTransactions);

    return {
      transactions,
      loading,
    };
  },
};
</script>

<style scoped>
</style>