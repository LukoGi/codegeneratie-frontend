<template>
  <div class="SetLimits container">
    <AdminSideNav />
    <!-- <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div> -->
    <h1 class="text-center mt-5">Set Limits</h1>
    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Set Limits</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.user_id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>
            <button class="btn btn-primary" @click="showModal(user)">
              Set Limits
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <SetLimitsModal
      v-show="isModalVisible"
      :selectedUser="selectedUser"
      @close="closeModal"
    />
  </div>
</template>

<script>
import AdminSideNav from "./AdminSideNav.vue";
import SetLimitsModal from "./SetLimitsModal.vue";
import axios from "../../axios-auth";

export default {
  components: {
    AdminSideNav,
    SetLimitsModal,
  },
  data() {
    return {
      isModalVisible: false,
      users: [],
      selectedUser: "",
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("users/", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.users = response.data.filter(user => user.roles.includes("ROLE_USER"));
      } catch (error) {
        console.log(error);
      }
    },
    showModal(user) {
      this.selectedUser = user;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.fetchUsers();
      selectedUser = "";
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.SetLimits {
  margin-left: 200px;
  padding: 20px;
}
</style>
