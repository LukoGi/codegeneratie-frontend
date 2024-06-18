<template>
  <div class="modal-backdrop">
    <div class="modal card p-3">
      <div class="d-flex justify-content-between align-items-center">
        <h2>Set Limits for {{ selectedUser.username }}</h2>
        <button class="btn btn-close" @click="closeModal"></button>
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
            :key="account"
            :value="account"
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
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <button class="btn btn-primary btn-block mb-3" @click="submitLimits">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";

export default {
  name: "SetLimitsModal",
  props: ["showModal", "selectedUser"],
  data() {
    return {
      bankAccounts: [],
      selectedBankAccount: "",
      dailyTransferLimit: "",
      absoluteLimit: "",
      token: localStorage.getItem("token"),
      errorMessage: "",
    };
  },
  watch: {
    selectedUser(newValue) {
      this.fetchBankAccounts();
      this.selectedBankAccount = "";
      this.dailyTransferLimit = newValue.dailyTransferLimit;
    },
    selectedBankAccount(newValue) {
      this.absoluteLimit = newValue.absoluteLimit;
    },
  },
  methods: {
    closeModal() {
      this.errorMessage = "";
      this.$emit("close");
    },
    async fetchBankAccounts() {
      try {
        const response = await axios.get(
          `accounts/user/${this.selectedUser.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.bankAccounts = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async submitLimits() {
      if (this.dailyTransferLimit !== "") {
        await this.setDailyLimit();
      } 
      if (this.absoluteLimit !== "") {
        await this.setAbsoluteLimit();
      } 
      
    },
    async setDailyLimit() {
      try {
        await axios.put(
          `users/${this.selectedUser.user_id}/setDailyLimit?dailyLimit=${this.dailyTransferLimit}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        await this.fetchBankAccounts();
        this.closeModal();
      } catch (error) {
        console.log("Error:", error);
        if (error.response) {
          this.errorMessage = error.response.data.message;
        }
      }
    },
    async setAbsoluteLimit() {
      try {
        await axios.put(
          `accounts/${this.selectedBankAccount.accountId}/setAbsoluteLimit?absoluteLimit=${this.absoluteLimit}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.selectedBankAccount = "";
        await this.fetchBankAccounts();
        this.closeModal();
      } catch (error) {
        this.errorMessage = error.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  top: auto;
  left: auto;
  box-shadow: 2px 2px 20px 1px;
  display: flex;
  width: 50%;
  height: auto;
}
</style>
