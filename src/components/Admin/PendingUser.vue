<template>
  <div class="Pending-User">
    <AdminSideNav />
    <div class="container">
      <h1 class="text-center mt-5">Users waiting to be approved</h1>
      <table class="table table-striped mt-3">
        <thead>
        <tr>
          <th> Id</th>
          <th>Username</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Create account</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td> {{user.userId}}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td><button class="btn btn-primary" @click="acceptUser(user)">Approve user</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminSideNav from './AdminSideNav.vue';
import axios from "../../axios-auth";

export default {
  components: {
    AdminSideNav
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios.get('/users/unapprovedUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    acceptUser(user) {
      console.log(user);
      this.$router.push({ path: `/admin/setlimits/${user.userId}` });


  }
}
};

</script>

<style scoped>
.Pending-User {
  margin-left: 200px;
  padding: 20px;
}
</style>