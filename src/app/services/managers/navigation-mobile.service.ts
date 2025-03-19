import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormData } from '../../types/forms/form-data';
import { ApiService } from '../apis/api.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationMobileService {

  public formData : BehaviorSubject<FormData | undefined> = new BehaviorSubject<FormData | undefined>(undefined);
  public clientId : BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);

  constructor() { }

  setFormData(newFormData : FormData){
    this.formData.next(newFormData);
  }
  setClientId(clientId: number){
    this.clientId.next(clientId);
  }
}
