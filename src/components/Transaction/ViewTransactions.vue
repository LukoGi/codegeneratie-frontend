<template>
  <div class="container">
    <h1 class="mb-3">Transactions for Customer ID: {{ customerId }} </h1>

    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card p-3">
          <ul class="list-group">
            <li v-for="transaction in transactions" :key="transaction.transactionId" class="list-group-item">
              <div class="row">
                <div class="col-sm-6">
                  <p><strong>Transfer amount:</strong> € {{ new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(transaction.transfer_amount) }}</p>
                  <p><strong>From:</strong> {{ transaction.initiatorName }}</p>
                  <p><strong>To:</strong> {{ transaction.recipientName }}</p>
                </div>
                <div class="col-sm-6">
                  <p><strong>Date:</strong> {{ new Date(transaction.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
                  <p><strong>Description:</strong> {{ transaction.description.length > 100 ? transaction.description.substring(0, 100) + '...' : transaction.description }}</p>
                  <button v-if="transaction.description.length > 100" @click="transaction.showFullDescription = !transaction.showFullDescription">{{ transaction.showFullDescription ? 'Show Less' : 'Read More' }}</button>
                  <p v-if="transaction.showFullDescription">{{ transaction.description }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import { useUserStore } from '@/stores/userstore';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

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
};
</script>

<style scoped>
.card {
  border-color: #e5e5e5 !important;
}
</style>