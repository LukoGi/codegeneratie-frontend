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

    user_id: null,
    first_name: null,
    last_name: null,
  }),
  getters: {
    getaccountId: (state) => state.accountId,
    getIban: (state) => state.iban,
    getBalance: (state) => Number(state.balance).toFixed(2),
    getaccountType: (state) => state.accountType,
    getisActive: (state) => state.isActive,
    getabsoluteLimit: (state) => state.absoluteLimit,

    getUser_id: (state) => state.user_id,
    getFirst_name: (state) => state.first_name,
    getLast_name: (state) => state.last_name,
    getFullName: (state) => state.first_name + " " + state.last_name,

    isLoggedIn: (state) => state.accountId !== null,
  },
  actions: {
    async login(fullname, iban, pincode) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.post("accounts/login", {
            fullname: fullname,
            iban: iban,
            pincode: pincode,
          });
          const data = res.data;
          this.accountId = data.accountId;
          this.balance = data.balance;
          this.user_id = data.user.user_id;
          this.first_name = data.user.first_name;
          this.last_name = data.user.last_name;

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
      this.user_id = null;
      this.first_name = null;
      this.last_name = null;

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
