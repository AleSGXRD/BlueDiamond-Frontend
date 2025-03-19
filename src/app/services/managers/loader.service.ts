import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loader$ : BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  setLoader(message:string){
    this.loader$.next({
      active : true,
      message
    })
  }
  hideLoader(){
    this.loader$.next(null)
  }
}
