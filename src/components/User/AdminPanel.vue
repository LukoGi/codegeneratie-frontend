<template>
    <div>
        <h1>All Users</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">BSN-number</th>
                    <th scope="col">Phone number</th>
                    <th scope="col">Approved</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.username }}</td>
                    <td>{{ user.first_name }}</td>
                    <td>{{ user.last_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.bsn_number }}</td>
                    <td>{{ user.phone_number }}</td>
                    <td>{{ user.approved }}</td>
                    <td>
                        <router-link :to="{ name: 'EditUser', params: { id: user.id } }" class="btn btn-primary">Edit</router-link>
                        <button @click="archive(user.id)" class="btn btn-danger">archive</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
</script>