import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';

import ATMLogin from '../components/ATM/ATMLogin.vue';
import ATMMainMenu from '../components/ATM/ATMMainMenu.vue';
import ATMWithdraw from '../components/ATM/ATMWithdraw.vue';
import ATMDeposit from '../components/ATM/ATMDeposit.vue';
import Login from '../components/User/Login.vue';
import UserMenu from '@/components/User/UserMenu.vue';
import OpenAccount from '@/components/User/OpenAccount.vue';
import NotApproved from '@/components/User/NotApproved.vue';
import AdminPanel from '@/components/User/AdminPanel.vue';
import MainDashboard from '@/components/AdminDashboard/MainDashboard.vue';
import CreateTransactionsForm from '@/components/Transaction/CreateTransactionsForm.vue';
import TransactionsHome from '@/components/Transaction/TransactionsHome.vue';
import TransferFundsForm from '@/components/Transaction/TransferFundsForm.vue';
import ViewTransactions from '../components/Transaction/ViewTransactions.vue';
import AllTransactions from '../components/Transaction/AllTransactionsView.vue';

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
    { path: '/notapproved', component: NotApproved},
    { path: '/adminpanel', component: AdminPanel},
    { path: '/dashboard', component: MainDashboard},
    { path: '/createtransactionsform', component: CreateTransactionsForm},
    { path: '/transactionshome', component: TransactionsHome},
    { path: '/transferfundsform', component: TransferFundsForm},
    { path: '/transactionsView/:customerId', component: ViewTransactions },
    { path: '/allTransactions', component: AllTransactions },
  ]
})

export default router
