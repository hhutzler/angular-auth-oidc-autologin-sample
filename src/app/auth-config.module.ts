import { APP_INITIALIZER, NgModule } from '@angular/core';
import {AuthModule, LogLevel, OidcConfigService, OidcSecurityService} from 'angular-auth-oidc-client';
import {AuthorizationGuard} from './authorization.guard';

export function configureAuth(oidcConfigService: OidcConfigService): any {
  return () =>
    oidcConfigService.withConfig({
      stsServer: 'http://localhost:8087/auth/realms/ldapdemo',
      redirectUrl: window.location.origin  + '/home',
      clientId: 'cliA',
      scope: 'openid profile email',
      responseType: 'code',
      triggerAuthorizationResultEvent: true,
      postLogoutRedirectUri: `${window.location.origin}/`,
      startCheckSession: false,
      silentRenew: true,
      silentRenewUrl: `${window.location.origin}/silent-renew.html`,
      postLoginRoute: '/home',
      forbiddenRoute: '',
      unauthorizedRoute: '/unauthorized',
      logLevel: LogLevel.Debug,
      /*
         don't set  historyCleanupOff to true - you may run into a autologin loop forbidden/a
         https://github.com/damienbod/angular-auth-oidc-client/issues/877
       */
      historyCleanupOff: false,
      renewTimeBeforeTokenExpiresInSeconds: 10,
      // iss_validation_off: false
      // disable_iat_offset_validation: true
    });
}
/* following method is there to fix a problem with oidc module
   https://github.com/damienbod/angular-auth-oidc-client/issues/906
   see also corresponding app initializer below*/
export function initGuard(service: OidcSecurityService): any {
  return (): Promise<any> => {
    return new Promise <void>((resolve, reject) => {
      console.log('____ APP_INITIALIZER::initGuard initial checkAuth()  call started');
      service.checkAuth().subscribe(isAuthenticated => {
        console.log('____ APP_INITIALIZER::initGuard initial checkAuth()  call  finished:  isAuthenticated Status : ' + isAuthenticated );
        resolve();
      });
    });
  };
}

@NgModule({
  imports: [AuthModule.forRoot()],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
    AuthorizationGuard,
    {
      provide: APP_INITIALIZER,
      deps: [OidcSecurityService],
      useFactory: initGuard,
      multi: true
    }
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
