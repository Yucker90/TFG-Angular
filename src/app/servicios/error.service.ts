import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  constructor(private router: Router) {}

  navigateTo(error : string) {
    this.router.navigateByUrl(error);
  }
}
