import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userManager: UserManager;
  private _user: User;
  
  private get idpSettings() : UserManagerSettings {
    return {
      authority: "https://oauth.apiidentity.duckdns.org/",
      client_id: "recruiter",
      redirect_uri:  window.location.origin + '/signin-oidc',
      scope: "openid profile",
      response_type: "code",
      // post_logout_redirect_uri: `${Constants.clientRoot}/signout-callback`
    }
  }
  constructor() {
    this._userManager = new UserManager(this.idpSettings);
  }

  public login = () => {
    return this._userManager.signinRedirect();
  }

  public completeLogin = () => {
    return this._userManager.signinRedirectCallback().then(user => {
      this._user = user;
    });
  }

  public logout = () => {
    return this._userManager.signoutRedirect();
  }

  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser().then(user => {
      this._user = user;
      return !!user && !user.expired;
    });
  }

  public getUserData = (): User => {
    return this._user;
  }
  
}
