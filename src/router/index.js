import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';

import ATMLogin from '../components/ATM/ATMLogin.vue';
import ATMMainMenu from '../components/ATM/ATMMainMenu.vue';
import ATMWithdraw from '../components/ATM/ATMWithdraw.vue';
import ATMDeposit from '../components/ATM/ATMDeposit.vue';
import Login from '../components/User/login.vue';
import UserMenu from '@/components/User/UserMenu.vue';
import OpenAccount from '@/components/User/OpenAccount.vue';
import TransactionForm from '../components/Transaction/TransactionForm.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/atm/login', component: ATMLogin },
    { path: '/atm/main-menu', component: ATMMainMenu },
    { path: '/atm/withdraw', component: ATMWithdraw },
    { path: '/atm/deposit', component: ATMDeposit },
    { path: '/login', component: Login},
    { path: '/usermenu', component: UserMenu},
    { path: '/openaccount', component: OpenAccount},
    { path: '/transactions', component: TransactionForm }
  ]
})

export default router
