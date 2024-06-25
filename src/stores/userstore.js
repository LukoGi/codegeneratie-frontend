import { defineStore } from 'pinia';

export const useUserStore = defineStore('userstore', {
    state: () => ({
        userId: null,
        roles: [],
        username: null,
    }),
    getters: {
        getUserId: (state) => state.userId,
        getUsername: (state) => {
            console.log('Getting username:', state.username)
            return state.username
        },
        getRoles: (state) => {
            return state.roles;
        },
        isLoggedIn: (state) => state.userId !== null,
    },
    actions: {
        setUserId(userId) {
            this.userId = userId;
        },
        setUsername(username) {
            this.username = username;
        },
        setRoles(roles) {
            this.roles = roles;
        },
        logout() {
            this.userId = null;
            this.roles = [];
        },
    },
});
