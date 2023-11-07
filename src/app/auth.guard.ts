// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { DataServiceService } from './data-service.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private lsdataServ: DataServiceService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     if (this.lsdataServ.isUserSignedIn()) {
//       return true;
//     } else {
//       this.router.navigate(['/login-signup']);
//       return false;
//     }
//   }
// }
