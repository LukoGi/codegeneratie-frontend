<template>
    <div class="container">
      <div class="text-center mt-5">
        <h1>Welcome</h1>
        <p>Username: {{ user.username }}</p>
        <p>First Name: {{ user.first_name }}</p>
        <p>Last Name: {{ user.last_name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>BSN-number: {{ user.bsn_number }}</p>
        <p>Phone number: {{ user.phone_number }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "../../axios-auth";
  
  export default {
    data() {
      return {
        user: { first_name: 'first_name', last_name: 'last_name', username: 'username', email: 'email', bsn_number: 'bsn_number', phone_number: 'phone_number'},
      };
    },
    created() {
      axios.get('http://localhost:8080/userinfo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
  };
  </script>