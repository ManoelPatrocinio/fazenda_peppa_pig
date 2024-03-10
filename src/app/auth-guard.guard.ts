import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log("autenticado !")
      return true;
    } else {
      console.error("não autenticado !")
      this.router.navigate([""])
      return false;
    }
  }
}


// export class AuthGuard implements CanActivate {

//   constructor(private http: HttpClient,private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if(this.authService.isAuthenticated()){
//       console.log("autenticado !")
//       return true;
//     }else{
//       console.error("não autenticado !")
//       this.router.navigate([""])
//       return false
//     }
//   }
// }


