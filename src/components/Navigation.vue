<template>
  <nav class="navbar navbar-expand-md mb-4">
    <div class="container-fluid d-flex justify-content-between">
      <div>
        <a class="navbar-brand fw-bold" href="#" style="color: #48877a;">Bank Name</a>
      </div>

      <ul class="navbar-nav mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
      </ul>

      <div>
        <button class="btn btn-primary me-2">Login</button>
        <button class="btn btn-secondary">Open Account</button>
      </div>
    </div>
  </nav>
</template>

<script>
</script>

<style>
.navbar {
  border-bottom: 1px solid #e5e5e5;
}
</style>