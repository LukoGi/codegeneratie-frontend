<template>
  <div class="sidebar">
    <ul>
      <li v-for="item in menuItems" :key="item.id">
        <router-link :to="item.route">{{ item.label }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { id: 1, label: "Dashboard", route: "/dashboard" },
        { id: 2, label: "Users", route: "/adminpanel" },
        // Add more menu items as needed
      ],
    };
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #f0f0f0;
  width: 200px;
  padding: 20px;
  height: 100vh;
  margin-top: -1.5rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #333;
}

a:hover {
  color: #666;
}
</style>
