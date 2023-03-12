import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { ApiBackEndService } from './services/api-back-end.service';
import { ApiFrontEndService } from './services/api-front-end.service';
import { AuthInterceptor, authInterceptorProviders } from './services/auth.interceptor';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ApiBackEndService,
    ApiFrontEndService,
    AuthInterceptor,
    AuthGuard,
    AuthService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
