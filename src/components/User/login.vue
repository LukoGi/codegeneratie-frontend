<template>
  <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  
  <div class="login-container d-flex justify-content-center align-items-center" style="height: 80vh;">
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

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    }
    
  },
  methods: {
    login() {
      axios.post('http://localhost:8080/users/login', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$router.push({ path: '/usermenu' });
        
      })
      .catch(error => {
        console.log('Error:', error);
        console.log('Error message:', error.response.data);
         this.errorMessage = error.response.data;
      });
    }
  }
}

</script>
