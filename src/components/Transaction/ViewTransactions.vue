<template>

  <div v-if="userStore.getRoles && userStore.getRoles.includes('ROLE_EMPLOYEE')">
    <h1 class="mb-3">Transactions for Customer ID: {{ customerId }} </h1>
    <div class="row justify-content-center">
      <div class="col-md-5" v-for="transaction in transactions" :key="transaction.transactionId">
        <TransactionCard :transaction="transaction" />
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">Prev</button>
      <div class="mx-2">{{ currentPage }}</div>
      <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>

  <div v-if="userStore.getRoles && userStore.getRoles.includes('ROLE_USER')">
    <h1 class="mb-3"> Your Transactions</h1>
    <div class="row justify-content-center">
      <div class="col-md-5" v-for="transaction in transactions" :key="transaction.transactionId">
        <TransactionCard :transaction="transaction" />
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">Prev</button>
      <div class="mx-2">{{ currentPage }}</div>
      <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
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
    const currentPage = ref(1);
    const totalPages = ref(0);

    const fetchTransactions = async () => {
      try {
        let url = `transactions/customer/${customerId.value}?page=${currentPage.value}`;
        if (userStore.getRoles.includes('ROLE_USER')) {
          url = `transactions/customer/${userStore.getUserId}?page=${currentPage.value}`;
        }
        const response = await axios.get(url);
        console.log('Transactions:', response.data);
        console.log('Roles:', userStore.getRoles);
        transactions.value = response.data;
        totalPages.value = response.data.totalPages;
        loading.value = false;
      } catch (error) {
        console.error('Error:', error);
        loading.value = false;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchTransactions();
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchTransactions();
      }
    };

    onMounted(fetchTransactions);

    return {
      userStore,
      customerId,
      transactions,
      loading,
      currentPage,
      nextPage,
      prevPage,
    };
  },
};
</script>