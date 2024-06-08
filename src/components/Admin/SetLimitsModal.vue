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
    };
  },
  watch: {
    selectedUser(newValue) {
      this.fetchBankAccounts();
      this.selectedBankAccount = "";
      this.dailyTransferLimit = newValue.daily_transfer_limit;
    },
    selectedBankAccount(newValue) {
      this.absoluteLimit = newValue.absolute_limit;
    },
  },
  methods: {
    closeModal() {
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
      await this.fetchBankAccounts();
      this.closeModal();
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
      } catch (error) {
        console.log("Error:", error);
        if (error.response) {
          console.log("Error message:", error.response.data);
          this.errorMessage = error.response.data;
        } else {
          this.errorMessage = "Network error";
        }
      }
    },
    async setAbsoluteLimit() {
      try {
        await axios.put(
          `accounts/${this.selectedBankAccount.account_id}/setAbsoluteLimit?absoluteLimit=${this.absoluteLimit}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.selectedBankAccount = "";
      } catch (error) {
        console.log("Error:", error);
        console.log("Error message:", error.response.data);
        this.errorMessage = error.response.data;
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
