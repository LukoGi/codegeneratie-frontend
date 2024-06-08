<template>
  <div v-if="showModal">
    <h2>Set Limits for {{ selectedUser.username }}</h2>
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
    <button @click="showModal = false">Close</button>
  </div>
</template>

<script>
import axios from "../../axios-auth";

export default {
  props: ["showModal", "selectedUser"],
  data() {
    return {
      selectedUser: "",
      bankAccounts: [],
      selectedBankAccount: "",
      dailyTransferLimit: "",
      absoluteLimit: "",
      token: localStorage.getItem("token"),
    };
  },
  watch : {
    selectedUser(newValue) {
      if (newValue) {
        this.getBankAccounts(newValue);
      }
    }
  },
  methods: {
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
};
</script>
