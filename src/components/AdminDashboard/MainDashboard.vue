<template>
    <div class="main-dashboard">
        <Sidebar />
        <div class="content">
            <h1>Admin Dashboard</h1>
            <!-- Your content goes here -->
        </div>
    </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";

export default {
    name: "MainDashboard",
    components: {
        Sidebar
    }
};
</script>

<style scoped>
.main-dashboard {
    display: flex;
}

.content {
    flex: 1;
    padding: 20px;
}
</style>