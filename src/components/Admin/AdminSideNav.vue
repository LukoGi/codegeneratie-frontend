<template>
  <div class="sidenav">

    <h3>Users</h3>
    <router-link to="/admin/pendinguser">Pending Users</router-link>
    <br>

    <h3>Bank Accounts</h3>
    <router-link to="/admin/setlimitsdashboard">Set Limits</router-link>
    <router-link to="/admin/bankoverview">Bank account overview</router-link>
    <br>

    <h3>Transactions</h3>
    <router-link to="/admin/transactionoverview">Transaction overview</router-link>
    <router-link to="/admin/employeecreatetransaction">Transfer funds</router-link>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userstore.js';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    if (!userStore.getRoles.includes('ROLE_ADMIN')) {
      router.push('/');
    }
  },
};
</script>

<style>
.sidenav {
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 55px;
  left: 0;
  background-color: #64bba8;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 16px;
  color: white;
  display: block;
}

.sidenav a:hover {
  color: grey;
}

.sidenav h3 {
  padding: 10px 16px;
  color: #f1f1f1;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 10px;
}
</style>