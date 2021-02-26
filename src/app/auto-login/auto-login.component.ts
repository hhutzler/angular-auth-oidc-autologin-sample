import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-auto-component',
  templateUrl: './auto-login.component.html',
})
export class AutoLoginComponent implements OnInit {
  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    console.log('____ AutoLoginComponent calls oidcSecurityService.authorize() - triggers page reload !' );
    this.oidcSecurityService.authorize();
  }
}
