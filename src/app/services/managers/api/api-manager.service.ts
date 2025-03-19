import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiManagerService {
  abstract add(data:any):any
  abstract edit(id:any, data:any):any
}
