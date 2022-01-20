import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CommonService } from './common/common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurdService {
  constructor(private router: Router, public common: CommonService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!this.common.isUserLoggedIn()) {
      alert(
        'You are not allowed to view this page. You are redirected to login Page'
      );

      this.router.navigate(['/'], { queryParams: { retUrl: route.url } });
      return false;

      //var urlTree = this.router.createUrlTree(['login']);
      //return urlTree;
    }

    return true;
  }
}
