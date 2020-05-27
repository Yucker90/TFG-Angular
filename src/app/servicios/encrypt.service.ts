import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class EncryptService {
  constructor() {}

  encrypt(textToEncrypt: string): string {
    return CryptoJS.AES.encrypt(textToEncrypt, "fenixDataEncrypt").toString();
  }

  decrypt(textToDecrypt: string): string {
    return CryptoJS.AES.decrypt(textToDecrypt, "fenixDataEncrypt").toString(
      CryptoJS.enc.Utf8
    );
  }

  encrypt2(textToEncrypt: string): string {
    return CryptoJS.AES.encrypt(
      textToEncrypt,
      "pjsZCQs75TupyZOR0pmAFYPkU1TY4QyF"
    ).toString();
  }

  decrypt2(textToDecrypt: string): string {
    return CryptoJS.AES.decrypt(
      textToDecrypt,
      "pjsZCQs75TupyZOR0pmAFYPkU1TY4QyF"
    ).toString(CryptoJS.enc.Utf8);
  }
}
