import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { IsAuthenticatedGuard} from './core/guards/is-authenticated.guard';
import { IsRoleGrantedGuard} from './core/guards/is-role-granted.guard';
import { PerformTestComponent } from './components/testing/perform-test/perform-test.component';
import { UserRole } from './core/enums/user-role.enum';
import { ManageAppTextComponent } from './components/management/admin/manage-app-text/manage-app-text.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'perform-test', component: PerformTestComponent, canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
     data: {roles: [UserRole.Admin, UserRole.User]}},
  {path: 'manage', component: ManageAppTextComponent, canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
     data: {roles: [UserRole.Admin]}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
