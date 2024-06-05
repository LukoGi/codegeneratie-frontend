<template>
  <div class="SetLimits container">
    <AdminSideNav />
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <div class="row mt-5">
      <div class="col-md-6 offset-md-3 card">
        <h2 class="text-center mb-4">Set Limits</h2>

        <div class="form-group">
          <label for="user-select">User</label>
          <select
            id="user-select"
            class="form-control"
            v-model="selectedUser"
            @change="fetchBankAccounts"
          >
            <option disabled value="">Please select a user</option>
            <option
              v-for="user in users"
              :key="user.user_id"
              :value="user.user_id"
            >
              {{ user.username }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="account-select">Bank Account</label>
          <select
            id="account-select"
            class="form-control"
            v-model="selectedBankAccount"
          >
            <option disabled value="">Please select a bank account</option>
            <option
              v-for="account in bankAccounts"
              :key="account.account_id"
              :value="account.account_id"
            >
              {{ account.iban }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="daily-limit">Daily Transfer Limit</label>
          <input
            id="daily-limit"
            type="number"
            class="form-control"
            v-model="dailyTransferLimit"
            placeholder="Daily Transfer Limit"
            :disabled="!selectedUser"
          />
        </div>

        <div class="form-group mb-3">
          <label for="absolute-limit">Absolute Limit</label>
          <input
            id="absolute-limit"
            type="number"
            class="form-control"
            v-model="absoluteLimit"
            placeholder="Absolute Limit"
            :disabled="!selectedBankAccount"
          />
        </div>

        <button class="btn btn-primary btn-block mb-3" @click="submitLimits">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSideNav from "./AdminSideNav.vue";
import axios from "../../axios-auth";

export default {
  components: {
    AdminSideNav,
  },
  data() {
    return {
      users: [],
      selectedUser: "",
      bankAccounts: [],
      selectedBankAccount: "",
      dailyTransferLimit: "",
      absoluteLimit: "",
      token: localStorage.getItem("token"),
    };
  },
  watch: {
    selectedUser(newValue) {
      if (newValue) {
        const user = this.users.find((user) => user.user_id === newValue);
        if (user) {
          this.dailyTransferLimit = user.daily_transfer_limit;
        }
      } else {
        this.dailyTransferLimit = "";
      }
      this.absoluteLimit = "";
      this.selectedBankAccount = "";
    },
    selectedBankAccount(newValue) {
      if (newValue) {
        const account = this.bankAccounts.find(
          (account) => account.account_id === newValue
        );
        if (account) {
          this.absoluteLimit = account.absolute_limit;
        }
      } else {
        this.absoluteLimit = "";
      }
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("users/all", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchBankAccounts() {
      try {
        const response = await axios.get(`accounts/user/${this.selectedUser}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.bankAccounts = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async submitLimits() {
      await this.setDailyLimit();
      await this.setAbsoluteLimit();
    },
    async setDailyLimit() {
      try {
        await axios.put(
          `users/${this.selectedUser}/setDailyLimit?dailyLimit=${this.dailyTransferLimit}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.$toast.success("Daily transfer limit set");
        this.dailyTransferLimit = "";
      } catch (error) {
        console.log("Error:", error);
        console.log("Error message:", error.response.data);
        this.errorMessage = error.response.data;
        this.$toast.error("Failed to set daily transfer limit");
      }
    },
    async setAbsoluteLimit() {
      try {
        await axios.put(
          `accounts/${this.selectedBankAccount}/setAbsoluteLimit?absoluteLimit=${this.absoluteLimit}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.$toast.success("Absolute limit set");
        this.absoluteLimit = "";
        this.dailyTransferLimit = "";
        this.selectedBankAccount = "";
      } catch (error) {
        console.log("Error:", error);
        console.log("Error message:", error.response.data);
        this.errorMessage = error.response.data;
        this.$toast.error("Failed to set absolute limit");
      }
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
