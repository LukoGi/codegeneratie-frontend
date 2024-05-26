import { defineStore } from "pinia";
import axios from "../axios-auth";

// I have decided against storing this in localStorage bc it doesnt seem to be the reasonable thing to do for an atm machine
export const useAtmStore = defineStore("atmstore",{
    state: () => ({
        account_id: null,
        iban: null,
        balance: null,
        account_type: null,
        is_active: null,
        absolute_limit: null,

        user_id: null,
        first_name: null,
        last_name: null,
    }),
    getters: {
        getAccount_id: (state) => state.account_id,
        getIban: (state) => state.iban,
        getBalance: (state) => Number(state.balance).toFixed(2),
        getAccount_type: (state) => state.account_type,
        getIs_active: (state) => state.is_active,
        getAbsolute_limit: (state) => state.absolute_limit,

        getUser_id: (state) => state.user_id,
        getFirst_name: (state) => state.first_name,
        getLast_name: (state) => state.last_name,
        getFullName: (state) => state.first_name + " " + state.last_name,

        isLoggedIn: (state) => state.account_id !== null,
    },
    actions: {
        login(fullname, iban, pincode) {
            return new Promise((resolve, reject) => {
                axios.post("accounts/login", {
                    fullname: fullname,
                    iban: iban,
                    pincode: pincode,
                })
                .then((res) => {
                    const data = res.data;
                    this.account_id = data.account_id;
                    this.balance = data.balance;
                    //this.is_active = data.is_active;
                    //this.absolute_limit = data.absolute_limit;
                    this.user_id = data.user.user_id;
                    this.first_name = data.user.first_name;
                    this.last_name = data.user.last_name;

                    axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.token;

                    resolve();
                })
                .catch((error) => reject(error))
            });
        },

        logout() {
            this.account_id = null;
            this.iban = null;
            this.balance = null;
            this.account_type = null;
            this.is_active = null;
            this.absolute_limit = null;
            this.user_id = null;
            this.first_name = null;
            this.last_name = null;

            axios.defaults.headers.common['Authorization'] = null;
        },

        withdraw(amount){
            return new Promise((resolve, reject) => {
                axios.post(`accounts/${this.account_id}/withdraw`, {
                    amount: amount,
                })
                .then((res) => {
                    this.balance = res.data.balance;
                    resolve();
                })
                .catch((error) => reject(error))
            });
        },

        deposit(amount){
            return new Promise((resolve, reject) => {
                axios.post(`accounts/${this.account_id}/deposit`, {
                    amount: amount,
                })
                .then((res) => {
                    this.balance = res.data.balance;
                    resolve();
                })
                .catch((error) => reject(error))
            });
        },

    },
});
