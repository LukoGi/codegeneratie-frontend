<template>
  <div class="container">
    <h1 class="mb-3">Transactions for Customer ID: {{ customerId }} </h1>

    <div class="row justify-content-center">
      <div class="col-md-5" v-for="transaction in transactions" :key="transaction.transactionId">
        <div class="card mb-3">
          <div class="card-header">
            <p class="card-text"><strong>From Account:</strong> {{ transaction.from_account.iban }} ({{ transaction.from_account.account_type }})</p>
          </div>
          <div class="card-body">
            <h5 class="card-title">Transfer amount: € {{ formatCurrency(transaction.transfer_amount) }}</h5>
            <p class="card-text"><strong>To Account:</strong> {{ transaction.to_account.iban }} ({{ transaction.to_account.account_type }})</p>
            <p class="card-text"><strong>To Account Balance:</strong> € {{ formatCurrency(transaction.to_account.balance) }}</p>
            <p class="card-text"><strong>From:</strong> {{ transaction.initiatorName }}</p>
            <p class="card-text"><strong>To:</strong> {{ transaction.recipientName }}</p>
            <p class="card-text"><strong>Date:</strong> {{ formatDate(transaction.date) }}</p>
            <p class="card-text"><strong>Description:</strong> {{ moreDescription(transaction.description) }}</p>
            <button v-if="transaction.description.length > 100" @click="transaction.showFullDescription = !transaction.showFullDescription" class="btn btn-link p-0">{{ transaction.showFullDescription ? 'Show Less' : 'Read More' }}</button>
            <p v-if="transaction.showFullDescription">{{ transaction.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <button @click="prevPage" :disabled="offset === 0" class="btn btn-primary btn-sm mr-2 custom-button">Previous</button>
      <button @click="nextPage" :disabled="transactions.length < limit" class="btn btn-primary btn-sm custom-button">Next</button>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const customerId = ref(route.params.customerId);
    const transactions = ref([]);
    const loading = ref(true);

    onMounted(async () => {
      try {
        const response = await axios.get(`http://localhost:8080/transactions/customer/${customerId.value}`);
        transactions.value = response.data;
        loading.value = false;
      } catch (error) {
        console.error('Error:', error);
        loading.value = false;
      }
    });

    return {
      customerId,
      transactions,
      loading,
    };
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(amount);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    },
    moreDescription(description) {
      return description.length > 100 ? description.substring(0, 100) + '...' : description;
    },
  },
};
</script>

<style scoped>
.card {
  border-color: #e5e5e5 !important;
}
.custom-button {
  width: 120px;
}
</style>