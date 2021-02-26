import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
})
export class NavigationComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  refreshSession(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoff();
  }
}
