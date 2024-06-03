<template>
  <div class="home">
    <header class="text-white text-center py-5">
      <h1>Transactions</h1>
    </header>
    <section class="overview py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Create New Transaction</h5>
                <router-link to="/createtransactionsform" class="btn btn-primary">Go</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Transfer Funds Between Accounts</h5>
                <router-link to="/transferfundsform" class="btn btn-primary">Go</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">View Transaction History</h5>
                <router-link to="/transactionsView/1" class="btn btn-primary">Go</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>

</script>

<style scoped>
.home {
  text-align: center;
  margin-top: -1.5rem;
}

header {
  background-color: #64bba8;
  color: white;
  padding: 20px;
}

.overview {
  background-color: #f8f9fa;
  padding: 40px 0;
}
</style>