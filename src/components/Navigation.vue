<template>
  <nav class="navbar navbar-expand-md mb-4">
    <div class="container-fluid d-flex justify-content-between">
      <div>
        <a class="navbar-brand fw-bold" href="/" style="color: #48877a;">Spring</a>
      </div>

      <ul class="navbar-nav mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li class="nav-item" :class="{ 'disabled-link': !isApproved }">
          <router-link to="/transactionshome" class="nav-link" active-class="active">Transactions</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/atm/login" class="nav-link" active-class="active">ATM</router-link>
        </li>
        <li class="nav-item" :class="{ 'disabled-link': !isApproved }">
          <router-link to="/usermenu" class="nav-link" active-class="active">User Info</router-link>
        </li>
      </ul>

      <div>
        <router-link v-if="!isLoggedIn" to="/login" tag="button" class="btn btn-primary me-2">Login</router-link>
        <button v-if="isLoggedIn" class="btn btn-secondary me-2" @click="logout">Logout</button>
        <router-link v-if="!isLoggedIn" to="/openaccount" tag="button" class="btn btn-secondary me-2">Open Account</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import router from '@/router';

export default {
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('token'),
      isApproved: localStorage.getItem('isApproved') === 'true',
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('isApproved');
      this.isLoggedIn = false;
      this.isApproved = true;
      router.push({ path: '/login' });
    }
  },
  created() {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.isApproved = localStorage.getItem('isApproved') === 'true';
  },
  watch: {
    '$route': function() {
      this.isLoggedIn = !!localStorage.getItem('token');
      this.isApproved = localStorage.getItem('isApproved') === 'true';
    }
  }
}
</script>

<style>
.navbar {
  border-bottom: 1px solid #e5e5e5;
}
.disabled-link {
  pointer-events: none;
  opacity: 0.6;
}
</style>