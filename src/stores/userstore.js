import { defineStore } from 'pinia';

export const useUserStore = defineStore('userstore', {
    state: () => ({
        user_id: null,
    }),
    getters: {
        getUserId: (state) => state.user_id,
        isLoggedIn: (state) => state.user_id !== null,
    },
    actions: {
        setUserId(user_id) {
            this.user_id = user_id;
        },
        logout() {
            this.user_id = null;
        },
    },
});
