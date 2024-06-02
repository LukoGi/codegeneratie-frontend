<template>
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

    const fetchTransactions = async () => {
      try {
        let url = `transactions/customer/${customerId.value}`;
        if (userStore.getRoles.includes('ROLE_USER')) {
          url = `transactions/customer/${userStore.getUserId}`;
        }
        const response = await axios.get(url);
        console.log('Transactions:', response.data);
        console.log('Roles:', userStore.getRoles);
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
    };
  },
};
</script>