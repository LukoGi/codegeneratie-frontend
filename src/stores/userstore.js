import { defineStore } from 'pinia';

export const useUserStore = defineStore('userstore', {
    state: () => ({
        user_id: null,
        roles: [],
        username: null,
    }),
    getters: {
        getUserId: (state) => state.user_id,
        getUsername: (state) => {
            console.log('Getting username:', state.username)
            return state.username
        },
        getRoles: (state) => {
            return state.roles;
        },
        isLoggedIn: (state) => state.user_id !== null,
    },
    actions: {
        setUserId(user_id) {
            this.user_id = user_id;
        },
        setUsername(username) {
            this.username = username;
        },
        setRoles(roles) {
            this.roles = roles;
        },
        logout() {
            this.user_id = null;
            this.roles = [];
        },
    },
});
