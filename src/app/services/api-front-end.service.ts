import { Injectable } from '@angular/core';

import { ApiBackEndService } from '../services/api-back-end.service';
import { EncdecService } from '../services/encdec.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiFrontEndService {

  constructor(
    private ApiBackEndService: ApiBackEndService,
    private EncdecService: EncdecService,
    private AuthService: AuthService
  ) { }

  public onsite_get_token(data) {
    return new Promise<any>((resolve, reject) => {
      data = this.EncdecService.encrypt('key', data);
      this.ApiBackEndService.onsite_get_token(data).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err)
        }
      );
    });
  }

  public verifyToken(token?) {
    return new Promise<any>((resolve, reject) => {
      if (!token) token = this.AuthService.getToken();
      if (!token) reject('Invalid token');
      else if (token) {
        this.ApiBackEndService.verifyToken(token).subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err)
          }
        );
      }
    });
  }

  public forgotPassword(data) {
    return new Promise<any>((resolve, reject) => {
      data = this.EncdecService.encrypt('key', data);
      this.ApiBackEndService.forgotPassword(data).subscribe(
        (res: any) => {
          if (typeof res == 'string') {
            res = this.EncdecService.decrypt('key', res);
            if (res['status'] == 200) {
              resolve(res);
            }
            else reject(res);
          }
          else reject(res);
        },
        (err) => {
          reject(err)
        }
      );
    });
  }


  public to(path, data?) {
    if (data) data = this.EncdecService.encrypt('key', data);
    return new Promise<any>((resolve, reject) => {
      this.ApiBackEndService[path](data).subscribe(
        (res: any) => {
          if (typeof res == 'string') res = this.EncdecService.decrypt('key', res);
          resolve(res);
        },
        (err) => {
          reject(err)
        }
      );
    });
  }

}
