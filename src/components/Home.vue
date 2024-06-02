<template>
  <div class="home">
    <header class="text-white text-center py-5">
      <h1>Welcome to Spring Bank</h1>
      <p>Your favorite season of a bank</p>
      <div v-if="isApproved">
        <h1>Account Pending</h1>
        <p>Your account has been created successfully and is currently awaiting approval. Once your account has been approved, you will get access to the other functions. Thank you for your patience.</p>
      </div>
    </header>
    <section class="overview py-5">
      <div class="container">
        <h2 class="text-center">Why Choose Spring Bank?</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Secure Banking</h5>
                <p class="card-text">We ensure your data and money are safe with top-notch security measures.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Customer Support</h5>
                <p class="card-text">24/7 customer support to assist you with all your banking needs.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Flexible Accounts</h5>
                <p class="card-text">A variety of account types (2)  to suit different financial goals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="services py-5">
      <div class="container">
        <h2 class="text-center">Our Services</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Savings Account</h5>
                <p class="card-text">Secure and reliable savings account with competitive interest rates.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Investment Advisory</h5>
                <p class="card-text">Expert investment advice to help you grow your wealth.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Loans</h5>
                <p class="card-text">Flexible loan options to suit your needs, whether it's for a home, car, or personal
                  use.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="bg-dark text-white text-center py-3">
      <p>&copy; 2024 Spring Bank. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isApproved() {
      return localStorage.getItem('is_approved') === 'false';
    }
  }
}
</script>

<style>
.home {
  text-align: center;
}

header {
  background-color: #64bba8;
  color: white;
  padding: 20px;
}

.overview, .services {
  background-color: #f8f9fa;
  padding: 40px 0;
}

footer {
  background-color: #343a40;
  color: white;
  padding: 10px 0;
}
</style>
