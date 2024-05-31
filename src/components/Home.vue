<template>
    <div class="container">
        <h1 class="mt-4">Home</h1>
        <p>Welcome to the home page!</p>
      <div v-if="isApproved">
        <h1>Account Pending</h1>
        <p>Your account has been created successfully and is currently awaiting approval. Once your account has been approved, you will get access to the other functions. Thank you for your patience.</p>
      </div>
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