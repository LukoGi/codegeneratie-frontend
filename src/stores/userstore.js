import { defineStore } from 'pinia';

export const useUserStore = defineStore('userstore', {
    state: () => ({
        user_id: null,
        roles: [],
    }),
    getters: {
        getUserId: (state) => state.user_id,
        getRoles: (state) => {
            console.log('Getting roles:', state.roles);
            return state.roles;
        },
        isLoggedIn: (state) => state.user_id !== null,
    },
    actions: {
        setUserId(user_id) {
            this.user_id = user_id;
        },
        setRoles(roles) {
            console.log('Setting roles:', roles);
            this.roles = roles;
            console.log('Roles after setting:', this.roles);
        },
        logout() {
            this.user_id = null;
            this.roles = [];
        },
    },
});
