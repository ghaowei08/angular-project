import { Injectable } from '@angular/core';
import {
  Router, CanActivate,
  // CanActivateChild, CanDeactivate, CanLoad, 
  Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private Router: Router,
    private AuthService: AuthService,    
  ) { }

  async canActivate(ActivatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let redirectTo = '';

    // 2nd: verify if user_type == 'Admin'
    if (ActivatedRouteSnapshot['data']) {
      let verified_user_type = false;
      if (ActivatedRouteSnapshot['data'][0] == 'ok') verified_user_type = true; 
      if (ActivatedRouteSnapshot['data'][0] == 'admin') verified_user_type = this.AuthService.verify_user_type('admin');
      // console.log(verified_user_type)
      if (!verified_user_type) {
        this.Router.navigate([redirectTo]);
        return false;
      }
    }

    // // 3rd: verify if token is expired
    // let isTokenExpired = this.AuthService.isTokenExpired();
    // if (!isTokenExpired) {
    //   this.Router.navigate([redirectTo]);
    //   return false;
    // }

    return true;
  }
}
