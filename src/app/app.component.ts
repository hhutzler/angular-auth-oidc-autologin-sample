import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentRoute: string;

  constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {
    console.log('____ AppComponent constructor called  - App (re-)startet - bootstrap Component !' );
    /* Just fort debugging  router  NavigationEnd events */
    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        console.log('_____ Router Event: ' + event);
      });
  }

  ngOnInit(): void {
    const noAutoLogin = ['/autologin', '/unauthorized' ];
    this.oidcSecurityService.checkAuth()
      .subscribe((isAuthenticated) => {
        console.log('____ AppComponent::nginit()  window.location.pathname: ' + window.location.pathname +
          ' - isAuthenticated: ' + isAuthenticated);
        if (!isAuthenticated) {
          if (!noAutoLogin.includes(window.location.pathname)) {
            this.write('redirect', window.location.pathname);
            console.log('____ AppComponent::nginit() routing to autologin  ' ) ;
            this.router.navigate(['/autologin']);
          }
        }
        if (isAuthenticated) {
          this.navigateToStoredEndpoint();
        }
      });
  }

  login(): void {
    console.log('start login');
    this.oidcSecurityService.authorize();
  }

  refreshSession(): void {
    console.log('start refreshSession');
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    console.log('start logoff');
    this.oidcSecurityService.logoff();
  }

  private navigateToStoredEndpoint(): void {
    const path = this.read('redirect');

    if (this.router.url === path) {
      console.log('____ AppComponent::navigateToStoredEndpoint()  router url machtes  path - just returning - Path :   '  + path );
      return;
    }
    /*
    if (path === undefined) {
      if ('/' === window.location.pathname) {
        console.log('____ navigateToStoredEndpoint - path undefined - pathname : ' +  window.location.pathname );
        this.router.navigate([this.oidcSecurityService.configuration.configuration.postLoginRoute]);
      }
      else {
        console.log('____ navigateToStoredEndpoint - path undefined - pathname : ' +  window.location.pathname );
        this.router.navigateByUrl(window.location.pathname + window.location.search);
      }
      return;
    }
*
    console.log('____ navigateToStoredEndpoint - path defined navigate to: ' + path );
    this.router.navigateByUrl(path);
    localStorage.removeItem('redirect');
    */
    if (path.toString().includes('/unauthorized')) {
      console.log('____ AppComponent::navigateToStoredEndpoint() path: /unauthorized - navigating to /  ' );
      this.router.navigate(['/']);
    } else {
      console.log('____ AppComponent::navigateToStoredEndpoint()  navigating to path:   '  + path );
      this.router.navigate([path]);
    }
  }

  private read(key: string): any {
    const data = localStorage.getItem(key);
    if (data) {
      console.log('____ AppComponent::read from local storage - data: ' + JSON.parse(data) );
      return JSON.parse(data);
    }

    return;
  }

  private write(key: string, value: any): void {
    console.log('____ AppComponent::write to local storage:  data: ' + JSON.stringify(value) );
    localStorage.setItem(key, JSON.stringify(value));
  }
}
