<template>
  <div class="card mb-3">
    <div class="card-header">
      <p class="card-text"><strong>From Account:</strong> {{ transaction.from_account.iban }} ({{ transaction.from_account.account_type }})</p>
    </div>
    <div class="card-body">
      <h5 class="card-title">Transfer amount: € {{ formatCurrency(transaction.transfer_amount) }}</h5>
      <p class="card-text"><strong>To Account:</strong> {{ transaction.to_account.iban }} ({{ transaction.to_account.account_type }})</p>
      <p class="card-text"><strong>To:</strong> {{ transaction.recipientName }}</p>
      <p class="card-text"><strong>Description:</strong> {{ moreDescription(transaction.description) }}</p>
      <button v-if="transaction.description.length > 100" @click="transaction.showFullDescription = !transaction.showFullDescription" class="btn btn-link p-0">{{ transaction.showFullDescription ? 'Show Less' : 'Read More' }}</button>
      <p v-if="transaction.showFullDescription">{{ transaction.description }}</p>
      <p class="card-text"><strong>Date:</strong> {{ formatDate(transaction.date) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['transaction'],
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
</style>