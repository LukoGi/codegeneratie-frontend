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
import SetLimits from "@/components/Admin/SetLimits.vue";
import CreateTransactionsForm from '@/components/Transaction/CreateTransactionsForm.vue';
import TransactionsHome from '@/components/Transaction/TransactionsHome.vue';
import TransActionHistoryOverview from "@/components/User/TransActionHistoryOverview.vue";
import TransferFundsForm from '@/components/Transaction/TransferFundsForm.vue';
import ViewTransactions from '../components/Admin/ViewTransactions.vue';
import AllTransactions from '../components/Admin/TransactionsOverview.vue';
import SetLimitsDashboard from '../components/Admin/SetLimitsDashboard.vue';
import BankOverview from '../components/Admin/BankAccountOverview.vue';
import AdminSideNav from "@/components/Admin/AdminSideNav.vue";
import TransferFunds from '@/components/Admin/TransferFunds.vue';

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
    { path: '/admin/pendinguser', component: PendingUser},
    { path: '/createtransactionsform', component: CreateTransactionsForm},
    { path: '/transactionshome', component: TransactionsHome},
    { path: '/transactions/:id', component: TransActionHistoryOverview},
    { path: '/transferfundsform', component: TransferFundsForm},
    { path: '/admin/transactionoverview/:customerId', component: ViewTransactions },
    { path: '/admin/transactionoverview', component: AllTransactions },
    { path: '/admin/setlimitsdashboard', component: SetLimitsDashboard },
    { path: '/admin/setlimits/:user_id', component: SetLimits},
    { path: '/admin/bankoverview', component: BankOverview},
    { path: '/admin', component: AdminSideNav},
    { path: '/admin/transferfunds', component: TransferFunds}
  ]
})

export default router
