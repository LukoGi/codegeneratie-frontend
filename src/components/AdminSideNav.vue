<template>
  <div class="sidenav">
    <router-link to="/pendinguser">Pending Users</router-link>
    <router-link to="/admin/bankaccountcreation">Create Bank accounts</router-link>

  </div>
</template>

<script>

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
</style>