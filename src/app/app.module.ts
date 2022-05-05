import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BidingComponent } from './shared/modal/biding/biding.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WinComponent } from './components/win/win.component';
import { MatMenuModule } from '@angular/material/menu';
import { RechargeComponent } from './components/recharge/recharge.component';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PromotionComponent } from './components/promotion/promotion.component';
import { NoticeComponent } from './shared/modal/notice/notice.component';
import { ErrorhandlingInterceptor } from './errorhandling.interceptor';
import { MatSelectModule } from '@angular/material/select';
import { AddBankComponent } from './shared/modal/add-bank/add-bank.component';
import { AddUpiComponent } from './shared/modal/add-upi/add-upi.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminAuthComponent } from './components/admin/admin-auth/admin-auth.component';
import { AdminWithdrawlComponent } from './components/admin/admin-withdrawl/admin-withdrawl.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { ConfirmationComponent } from './shared/modal/confirmation/confirmation.component';
import { UsersComponent } from './components/admin/users/users.component';
import { EditUserComponent } from './shared/modal/edit-user/edit-user.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { AdminComponent } from './components/admin/admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { GameInfoComponent } from './shared/modal/game-info/game-info.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { FeedbackComponent } from './components/admin/feedback/feedback.component';
import { AdminTransactionComponent } from './components/admin/admin-transaction/admin-transaction.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    BidingComponent,
    WinComponent,
    RechargeComponent,
    WithdrawalComponent,
    PromotionComponent,
    NoticeComponent,
    AddBankComponent,
    AddUpiComponent,
    DashboardComponent,
    AdminAuthComponent,
    AdminWithdrawlComponent,
    AdminHeaderComponent,
    ConfirmationComponent,
    UsersComponent,
    EditUserComponent,
    AdminComponent,
    GameInfoComponent,
    ForgotPasswordComponent,
    ComplaintsComponent,
    FeedbackComponent,
    AdminTransactionComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressBarModule,
    ClipboardModule,
    MatTabsModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorhandlingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
