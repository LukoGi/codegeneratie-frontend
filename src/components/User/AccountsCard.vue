<template>
  <div class="card">
    <div class="card-body">
      <p class="card-text">
        <strong>Account Type:</strong> {{ account.account_type }}<br>
        <strong>Account Number (IBAN):</strong> {{ account.iban }}<br>
        <strong>Balance:</strong> € {{ formatCurrency(account.balance) }}<br>
        <strong>Is Active:</strong> {{ account.is_active ? 'Yes' : 'No' }}<br>
        <strong>Absolute Limit:</strong> € {{ formatCurrency(account.absolute_limit) }}<br>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('de-DE', {minimumFractionDigits: 2}).format(amount);
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
  flex: 1 0 200px;
  max-width: 300px;
}
</style>