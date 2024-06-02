<template>
  <div class="bank-account-creation">
    <AdminSideNav />
    <div class="container">
      <h1 class="text-center mt-5">Users without any bank account</h1>
      <table class="table table-striped mt-3">
        <thead>
        <tr>
          <th>Username</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Create account</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td><button class="btn btn-primary" @click="createAccount(user.id)">Create account</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminSideNav from '../AdminSideNav.vue';
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
      axios.get('http://localhost:8080/users/getUsersWithoutBankAccount')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    createAccount(userId) {
      this.$router.push('/addBankAccount/' + userId);
    }
  }
};

</script>

<style scoped>
.bank-account-creation {
  margin-left: 200px;
  padding: 20px;
}
</style>