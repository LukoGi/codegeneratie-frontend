<template>
  <div>
    <h1 class="mb-3">All Customer Accounts</h1>
    <div class="row justify-content-center user-group card" v-for="(accounts, username) in groupedAccounts" :key="username">
      <h2 class="nav-link">{{ username }}</h2>
      <div class="accounts-container">
        <AccountsCard v-for="account in accounts" :key="account.account_id" :account="account" />
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, computed} from 'vue';
import axios from '@/axios-auth';
import AccountsCard from './AccountsCard.vue';

export default {
  components: {
    AccountsCard,
  },
  setup() {
    const accounts = ref([]);
    const loading = ref(true);

    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/accounts/all');
        accounts.value = response.data;
        console.log('Accounts:', response.data);
        loading.value = false;
      } catch (error) {
        console.error('Error:', error);
        loading.value = false;
      }
    };

    const groupedAccounts = computed(() => {
      const groups = {};
      for (const account of accounts.value) {
        const username = account.user.username;
        if (!groups[username]) {
          groups[username] = [];
        }
        groups[username].push(account);
      }
      return groups;
    });

    onMounted(fetchAccounts);

    return {
      accounts,
      loading,
      groupedAccounts,
    };
  },
};
</script>

<style scoped>
.user-group {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.accounts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}
</style>