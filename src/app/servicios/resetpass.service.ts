import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EncryptService } from './encrypt.service';

@Injectable({ providedIn: "root" })
export class ResetPass {
  constructor(private httpClient: HttpClient, private encrypt: EncryptService) {}

  private resetUrl = "https://api.josejoaquinmaglop.es/api/v1/reset";

  resetPassword(email: string) {
    return this.httpClient.post(`${this.resetUrl}`,email);
  }
}
