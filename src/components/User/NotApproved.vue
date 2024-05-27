<template>
    <h1> Home</h1>
    <div class="login-container d-flex justify-content-center align-items-center" style="height: 80vh;">
        <div class="p-3 card col-md-3">
            <h1>Account Pending</h1>
            <p>Your account has been created successfully and is currently awaiting approval. Once your account has been approved, you will be able to log in and access your account. Thank you for your patience.</p>
            <router-link to="/login" tag="button" class="btn btn-primary mt-3">Go to Login</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotApproved',
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

h1 {
    margin-bottom: 20px;
}
</style>