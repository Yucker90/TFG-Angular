import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';  


@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  encrypt(textToEncrypt: string): string{
    return CryptoJS.AES.encrypt(textToEncrypt, "fenixDataEncrypt").toString();
  }

  decrypt(textToDecrypt: string):string{
    return CryptoJS.AES.decrypt(textToDecrypt, "fenixDataEncrypt").toString(CryptoJS.enc.Utf8);
  }

  private parseKey(): string{
    return CryptoJS.enc.Utf8.parse("fenixDataEncrypt");
  }

  private parseText(text: string): string{
    return CryptoJS.enc.Base64.parse(text);
  }
}
