import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthComponent } from './components/admin/admin-auth/admin-auth.component';
import { AdminWithdrawlComponent } from './components/admin/admin-withdrawl/admin-withdrawl.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { WinComponent } from './components/win/win.component';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import {ForgotPasswordComponent} from './components/auth/forgot-password/forgot-password.component'

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomepageComponent},
  {path:'win',component:WinComponent,canActivate:[AuthGuard]},
  {path:'recharge',component:RechargeComponent,canActivate:[AuthGuard]},
  {path:'withdrawal',component:WithdrawalComponent,canActivate:[AuthGuard]},
  {path:'promotion',component:PromotionComponent,canActivate:[AuthGuard]},
  {path:'admin', component: AdminComponent ,children:[
    {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
    {path:'auth',component:AdminAuthComponent},
    {path:'dashboard',component:DashboardComponent,canActivate:[AdminAuthGuard]},
    {path:'users',component:UsersComponent,canActivate:[AdminAuthGuard]},
    {path:'withdrawl',component:AdminWithdrawlComponent,canActivate:[AdminAuthGuard]},
  ]},
  {path:'auth',component:AuthComponent,children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'forgot-password',component:ForgotPasswordComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
