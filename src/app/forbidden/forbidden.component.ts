import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forbidden',
  templateUrl: 'forbidden.component.html',
})
export class ForbiddenComponent implements OnInit {
  public authenticated$: Observable<boolean>;
  userData$: Observable<any>;

  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.authenticated$ = this.oidcSecurityService.isAuthenticated$;
    this.userData$ = this.oidcSecurityService.userData$;
  }
}

