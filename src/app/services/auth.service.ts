import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ApiBackEndService } from './api-back-end.service';
// import { ApiFrontEndService } from './api-front-end.service';
import { EncdecService } from './encdec.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private ApiBackEndService: ApiBackEndService,
    // private API: ApiFrontEndService,
    private EncdecService: EncdecService,    
    private Router: Router
  ) { }

  public login(data) {
    sessionStorage.clear();
    return new Promise((resolve, reject) => {
      this.ApiBackEndService.login(data).subscribe(
        (res: any) => {
          // console.log(res)
          if (res['token']) {
            resolve(res.data);
            this.setToken(res.token);
          }
          else reject(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  token: string = '';
  setToken(token) {
    this.token = token;
    sessionStorage.setItem('token', token);
  }
  getToken() {
    var token = this.token;
    if (!token) {
      token = sessionStorage.getItem('token');
      this.token = token;
    }
    return token;
  }

  jwt_decode(token: string) {
    const decoded = jwt_decode(token);
    return decoded;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string) {
    return new Promise<any>((resolve, reject) => {
      if (!token) token = this.getToken();
      if (!token) reject('Token Expired');
      const date = this.getTokenExpirationDate(token);
      if (date === undefined) reject('Token Expired');
      resolve(date.valueOf() > new Date().valueOf());
    })
  }

  verify_user_type(toPage?: string) {
    let token = this.getToken();
    if (!token) return false;
    const decoded = jwt_decode(token);
    // console.log(decoded);
    if (decoded['user_type']) {
      decoded['user_type'] = decoded['user_type'].toUpperCase();
      // console.log(decoded['user_type'])
      if (toPage) {
        if (toPage == 'admin') {
          if (decoded['user_type'] == 'ADMIN'
            || decoded['user_type'] == 'MODERATOR'
            || decoded['user_type'] == 'ORGANISER') {
            return true;
          }
        }
      }
      else return false;
    } else return false;
  }
  
}