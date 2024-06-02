import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';

import ATMLogin from '../components/ATM/ATMLogin.vue';
import ATMMainMenu from '../components/ATM/ATMMainMenu.vue';
import ATMWithdraw from '../components/ATM/ATMWithdraw.vue';
import ATMDeposit from '../components/ATM/ATMDeposit.vue';
import Login from '../components/User/Login.vue';
import UserMenu from '@/components/User/UserMenu.vue';
import OpenAccount from '@/components/User/OpenAccount.vue';
import BankAccountCreation from '@/components/Admin/BankAccountCreation.vue';
import PendingUser from "@/components/Admin/PendingUser.vue";
import CreateTransactionsForm from '@/components/Transaction/CreateTransactionsForm.vue';
import TransactionsHome from '@/components/Transaction/TransactionsHome.vue';
import TransferFundsForm from '@/components/Transaction/TransferFundsForm.vue';
import ViewTransactions from '../components/Transaction/ViewTransactions.vue';
import AllTransactions from '../components/Transaction/AllTransactionsView.vue';
import SetLimits from '../components/Admin/SetLimits.vue';

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
    { path: '/admin/bankaccountcreation', component: BankAccountCreation},
    { path: '/pendinguser', component: PendingUser},
    { path: '/createtransactionsform', component: CreateTransactionsForm},
    { path: '/transactionshome', component: TransactionsHome},
    { path: '/transferfundsform', component: TransferFundsForm},
    { path: '/transactionsView/:customerId', component: ViewTransactions },
    { path: '/allTransactions', component: AllTransactions },
    { path: '/admin/setlimits', component: SetLimits },
  ]
})

export default router
