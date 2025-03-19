import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientApiService } from '../services/apis/client/client-api.service';

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<any> {
  constructor(private clientService: ClientApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const clientId = route.paramMap.get('id');

      return this.clientService.get(parseInt(clientId ?? '0'));
  }
}
