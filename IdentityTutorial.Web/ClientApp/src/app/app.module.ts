import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import localeDe from '@angular/common/locales/de-AT';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/authentication/login/login.component';
import { TokenExpiredInterceptor } from './core/guards/token-expired.interceptor';
import { UserAuthenticationInterceptor} from './core/guards/user-authentication.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerformTestComponent } from './components/testing/perform-test/perform-test.component';
import { IsAuthenticatedGuard } from './core/guards/is-authenticated.guard';
import { IsRoleGrantedGuard } from './core/guards/is-role-granted.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';


registerLocaleData(localeDe, 'de-AT');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerformTestComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    IsAuthenticatedGuard,
    IsRoleGrantedGuard,
    {provide: LOCALE_ID, useValue: 'de-AT'},
    {provide: HTTP_INTERCEPTORS, useClass: UserAuthenticationInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenExpiredInterceptor, multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
