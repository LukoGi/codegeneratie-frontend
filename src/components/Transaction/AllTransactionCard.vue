<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary"> <strong>From:</strong> {{ transaction.from_account.user.username }}<br>
        <strong>To:</strong> {{ transaction.to_account.user.username }}<br>
      </h6>
    </div>
    <div class="card-body">
      <p class="card-text">
        <strong>From Account:</strong> {{ transaction.from_account.iban }} ({{ transaction.from_account.account_type }})<br>
        <strong>To Account:</strong> {{ transaction.to_account.iban }} ({{ transaction.to_account.account_type }})<br>
        <strong>Transfer Amount:</strong> {{ formatCurrency(transaction.transfer_amount) }}<br>
        <strong>Date:</strong> {{ formatDate(transaction.date) }}
      </p>
      <p v-if="transaction.description.length > 100"
         @click="transaction.showFullDescription = !transaction.showFullDescription" class="btn btn-link p-0">
        {{ transaction.showFullDescription ? 'Show Less' : 'Read More' }}</p>
      <p v-if="transaction.showFullDescription">{{ transaction.description }}</p>
      <p v-else>{{ moreDescription(transaction.description) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('de-DE', {minimumFractionDigits: 2}).format(amount);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});
    },
    moreDescription(description) {
      return description.length > 100 ? description.substring(0, 100) + '...' : description;
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>