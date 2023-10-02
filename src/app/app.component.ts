import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

import { CookieService } from 'ngx-cookie-service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: any;
  constructor(private authService: AuthService, private http: HttpClient, private cookieService: CookieService) {

   }
   public login = () => {
    this.authService.login();
  }

  public logout = () => {
    this.authService.logout();
  }
  ngOnInit(): void {
    this.user = this.authService.getUserData();
    console.log(this.user);
  }
}
