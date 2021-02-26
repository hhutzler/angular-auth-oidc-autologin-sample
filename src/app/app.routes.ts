import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './authorization.guard';
import { AutoLoginComponent } from './auto-login/auto-login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { ProtectedComponent } from './protected/protected.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent,  canActivate: [AuthorizationGuard] },
  { path: 'autologin', component: AutoLoginComponent },
  { path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthorizationGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'protected', component: ProtectedComponent },
];

export const routing = RouterModule.forRoot(appRoutes, { enableTracing: true });
