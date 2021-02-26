import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { AuthConfigModule } from './auth-config.module';
import { AutoLoginComponent } from './auto-login/auto-login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ProtectedComponent } from './protected/protected.component';
@NgModule({
  imports: [BrowserModule, routing, HttpClientModule, AuthConfigModule],
  declarations: [AppComponent, ForbiddenComponent, HomeComponent,  ProtectedComponent, AutoLoginComponent, NavigationComponent,
    UnauthorizedComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
