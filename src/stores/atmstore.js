import { defineStore } from "pinia";
import axios from "../axios-auth";

// I have decided against storing this in localStorage bc it doesnt seem to be the reasonable thing to do for an atm machine
export const useAtmStore = defineStore("atmstore", {
  state: () => ({
    accountId: null,
    iban: null,
    balance: null,
    accountType: null,
    isActive: null,
    absoluteLimit: null,

    userId: null,
    firstName: null,
    lastName: null,
  }),
  getters: {
    phoneNumber: (state) => state.accountId,
    getIban: (state) => state.iban,
    getBalance: (state) => Number(state.balance).toFixed(2),
    getAccountType: (state) => state.accountType,
    getIsActive: (state) => state.isActive,
    getAbsoluteLimit: (state) => state.absoluteLimit,

    getUserId: (state) => state.userId,
    getFirstName: (state) => state.firstName,
    getLastName: (state) => state.lastName,
    getfullName: (state) => state.firstName + " " + state.lastName,

    isLoggedIn: (state) => state.accountId !== null,
  },
  actions: {
    async login(fullName, iban, pinCode) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.post("accounts/login", {
            fullName: fullName,
            iban: iban,
            pinCode: pinCode,
          });
          const data = res.data;
          this.accountId = data.accountId;
          this.balance = data.balance;
          this.userId = data.user.userId;
          this.firstName = data.user.firstName;
          this.lastName = data.user.lastName;

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;

          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },

    logout() {
      this.accountId = null;
      this.iban = null;
      this.balance = null;
      this.accountType = null;
      this.isActive = null;
      this.absoluteLimit = null;
      this.userId = null;
      this.firstName = null;
      this.lastName = null;

      axios.defaults.headers.common["Authorization"] = null;
    },

    async withdraw(amount) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.post(`accounts/${this.accountId}/withdraw`, {
            amount: amount,
          });
          this.balance = res.data.balance;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },

    async deposit(amount) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.post(`accounts/${this.accountId}/deposit`, {
            amount: amount,
          });
          this.balance = res.data.balance;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
