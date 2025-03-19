import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintContentService {

  constructor() { }
  printHtml(html:string){
    const htmlContent = window.open('', '', 'height=600,width=800');
    htmlContent?.document.write('<html><head><title>Imprimir</title></head><body>')
    htmlContent?.document.write(html);
    htmlContent?.document.write('</body></html>')
    htmlContent?.print();
  }
}
