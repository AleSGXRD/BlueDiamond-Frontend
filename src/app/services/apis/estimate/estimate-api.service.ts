import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PrintOptions } from '../../../types/api/print-options';

@Injectable({
  providedIn: 'root'
})
export class EstimateApiService {
  private estimateRoute : string = environment.apiUrl + 'estimate/';
  private route: string = environment.apiUrl + 'generate-estimate/';

  constructor(private http: HttpClient) { }

  generateEstimate(clientId:number, serviceId:number){
    return this.http.post(this.route + clientId.toString() + "/" + serviceId.toString(), {})
  }
  printEstimate(clientId:number, estimateId:number, options:PrintOptions){
    return this.http.post(this.route + 'pdf/' + clientId.toString() + "/" + estimateId.toString(), options)
  }
  approveEstimate(estimateId:number){
    return this.http.post(this.estimateRoute + estimateId.toString(),{});
  }
  deleteEstimate(estimateId:number){
    return this.http.delete(this.estimateRoute + estimateId.toString());
  }
  viewPdf(estimateId:number){
    window.open(this.route + `view-estimate/${estimateId.toString()}`,'_blank');
  }
}
