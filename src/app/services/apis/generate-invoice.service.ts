import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PrintOptions } from '../../types/api/print-options';

@Injectable({
  providedIn: 'root'
})
export class GenerateInvoiceService {

  private print: string = environment.apiUrl + 'pdf/generate-invoice/'
  constructor(private http: HttpClient){

  }
  printAll(printOptions:PrintOptions){
    return this.http.post(this.print, printOptions);
  }
  sendServiceOffer(){
    const printOptions : PrintOptions = { send : true, print: true}
    return this.http.post(this.print, printOptions );
  }
}
