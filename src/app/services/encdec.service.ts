import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncdecService {

  p_key = {
    key: 'key.aaa'
  }

  constructor() { }

  encrypt(type, value) {
    try {
      var key = this.p_key[`${type}`];
      if (key) {
        var b64 = CryptoJS.AES.encrypt(JSON.stringify(value), key).toString();
        var e64 = CryptoJS.enc.Base64.parse(b64);
        var encrypted = e64.toString(CryptoJS.enc.Hex);
        return encrypted;
      }
      else throw 'Error - encrypt';
    }
    catch (err) {
      // console.error(err);
      return 'Error - encrypt';
    }
  }

  decrypt(type, value) {
    try {
      var key = this.p_key[`${type}`];
      if (key) {
        var reb64 = CryptoJS.enc.Hex.parse(value);
        var bytes = reb64.toString(CryptoJS.enc.Base64);
        var decrypt = CryptoJS.AES.decrypt(bytes, key);
        var decrypted = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
        return decrypted;
      }
      else throw 'Error - encrypt';
    }
    catch (err) {
      // console.error(err);
      return 'Error - decrypt';
    }
  }

}