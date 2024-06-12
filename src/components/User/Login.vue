<template>
  <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

  <div
    class="login-container d-flex justify-content-center align-items-center"
    style="height: 80vh"
  >
    <form class="p-3 card col-md-3" @submit.prevent="login">
      <h1>Login</h1>

      <div class="form-group mb-3">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          required
        />
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import { useUserStore } from "@/stores/userstore";
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      axios
        .post("/users/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);

          localStorage.setItem("token", response.data.token);

          const userStore = useUserStore();
          userStore.setUserId(response.data.user_id);
          userStore.setRoles(response.data.roles);
          userStore.setUsername(response.data.username);
          console.log("User ID set in store:", userStore.getUserId);

          this.getUserInfo();
        })
        .catch((error) => {
          console.log("Error:", error);
          console.log("Error message:", error.response.data);
          this.errorMessage = error.response.data;
        });
    },
    getUserInfo() {
      const token = localStorage.getItem("token");
      axios
        .get("/users/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          localStorage.setItem("is_approved", response.data.is_approved);
          localStorage.setItem("roles", JSON.stringify(response.data.roles));
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("username", response.data.username);
          if (response.data.roles.includes("ROLE_ADMIN")) {
            this.$router.push("/admin");
          } else {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    },
  },
};
</script>
