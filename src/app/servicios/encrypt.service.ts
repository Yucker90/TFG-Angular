import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';  


@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  encrypt(textToEncrypt: string): string{
    return CryptoJS.AES.encrypt(textToEncrypt.trim(), "fenixDataEncrypt").toString();
  }

  decrypt(textToDecrypt: string):string{
    return CryptoJS.AES.decrypt(textToDecrypt.trim(), "fenixDataEncrypt").toString();
  }

  encryptWithKey(textToEncrypt: string){
    return CryptoJS.AES.encrypt(textToEncrypt.trim(), Date.now().toString()).toString();
  }
}
