import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppServicesService } from '../services/app-services.service';

@Injectable({
  providedIn: 'root'
})
export class JwtGuard implements CanActivate {
  constructor( 
    private router: Router,
    private services: AppServicesService

  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.services.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
  

