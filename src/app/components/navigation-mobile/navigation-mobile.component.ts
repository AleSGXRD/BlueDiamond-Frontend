import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundComponent } from '../background/background.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FormService } from '../../services/managers/form/form.service';
import { FormType } from '../../types/forms/form-type';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormData } from '../../types/forms/form-data';
import { NavigationMobileService } from '../../services/managers/navigation-mobile.service';
import { ClientApiService } from '../../services/apis/client/client-api.service';
import { NotificationSystemService } from '../../services/notification-system.service';
import { PrintOptions } from '../../types/api/print-options';
import { LoaderService } from '../../services/managers/loader.service';
import { DialogService } from '../../services/managers/dialog/dialog.service';
import { GenerateInvoiceService } from '../../services/apis/generate-invoice.service';

@Component({
  selector: 'app-navigation-mobile',
  imports:[BackgroundComponent, ToolbarComponent, SidebarComponent, CommonModule],
  templateUrl: './navigation-mobile.component.html',
  styleUrl: './navigation-mobile.component.css'
})
export class NavigationMobileComponent {
  openedSideBar:boolean = false;

  public formData! : FormData;
  public clientId? : number;
  public openedNavigation : boolean  = false;

  get cantOptions(){
    const cant = ((this.formData?.form) ? 1 : 0) + (this.clientId ? 2 : 0) + (this.canUseMultipleDelete?1:0)
    return cant;
  }


  canUseMultipleDelete :boolean = false;
  canDelete :boolean = false;

  constructor(private router: Router,
    private formService: FormService,
    private navigationMobileService: NavigationMobileService,
    private clientApiService: ClientApiService,
    private generateInvoiceService: GenerateInvoiceService,
    private notificationSystemService: NotificationSystemService,
    private dialogService: DialogService,
    private loaderService: LoaderService
    // private multipleDelete : MultipleDeleteService
  ){
    this.navigationMobileService.formData.subscribe(
      res => {
        if(res != undefined)
        this.formData = res
      },
      err => {
        console.log(err);
      }
    )
    this.navigationMobileService.clientId.subscribe(
      res=>{
        this.clientId = res;
      },
      err=>{
        console.log(err);
      }
    )
    // this.multipleDelete.canDelete.subscribe(res =>{
    //   this.canDelete = res;
    // })
    // this.multipleDelete.canUseMultipleDelete.subscribe(res => {
    //   this.canUseMultipleDelete = res;
    // })
  }
  ActiveForm(){
    if(!this.formData) return;
    if(!this.formData.apiService) return;
    this.formData.form.reset();
    this.formService.SetFormData({...this.formData}, FormType.ADD);
  }
  openSideBar(value:boolean){
    this.openedSideBar = value;
  }

  printAllInvoices(){
    if(!this.clientId) return;
    const printOptions:PrintOptions ={send:false, print:true};
    this.dialogService.SetMethod(()=>{
      if(!this.clientId) return;
      this.loaderService.setLoader('Imprimiendo Invoices...')
      this.clientApiService.printAll(this.clientId, printOptions).subscribe((res:any) =>{
        this.notificationSystemService.showNotifcation("Han sido generados todos los invoices del client", 0);
        this.loaderService.hideLoader()
      },
      err => {
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message ?? "Ha ocurrido un error al generar los invoices", 1);
        this.loaderService.hideLoader()
      }
      )
    })
  }
  printAndSendAllInvoices(){
    if(!this.clientId) return;
    const printOptions:PrintOptions ={send:true, print:true};
    this.dialogService.SetMethod(()=>{
      if(!this.clientId) return;
      this.loaderService.setLoader('Enviando Invoices...')
      this.clientApiService.printAll(this.clientId, printOptions).subscribe((res:any) =>{
        this.notificationSystemService.showNotifcation(res.message ?? "Se han enviado los invoices con exito.", 0);
        this.loaderService.hideLoader()
      },
      err => {
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message ?? "Ha ocurrido un error al generar los invoices", 1);
        this.loaderService.hideLoader()
      }
      )
    })
  }


  printAllInvoicesAllClients(){
    if(!this.clientId) return;
    const printOptions:PrintOptions ={send:false, print:true};
    this.dialogService.SetMethod(()=>{
      if(!this.clientId) return;
      this.loaderService.setLoader('Imprimiendo Invoices...')
      this.generateInvoiceService.printAll(printOptions).subscribe((res:any) =>{
        this.notificationSystemService.showNotifcation("Han sido generados todos los invoices del client", 0);
        this.loaderService.hideLoader()
      },
      err => {
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message ?? "Ha ocurrido un error al generar los invoices", 1);
        this.loaderService.hideLoader()
      }
      )
    })
  }
  printAndSendAllInvoicesAllClients(){
    if(!this.clientId) return;
    const printOptions:PrintOptions ={send:true, print:true};
    this.dialogService.SetMethod(()=>{
      if(!this.clientId) return;
      this.loaderService.setLoader('Enviando Invoices...')
      this.generateInvoiceService.printAll(printOptions).subscribe((res:any) =>{
        this.notificationSystemService.showNotifcation(res.message ?? "Se han enviado los invoices con exito.", 0);
        this.loaderService.hideLoader()
      },
      err => {
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message ?? "Ha ocurrido un error al generar los invoices", 1);
        this.loaderService.hideLoader()
      }
      )
    })
  }
  // deleteAll(){
  //   if(this.canDelete == false) return;
  //   this.multipleDelete.deleteMultiples.emit();
  // }

  openNavigation(){
    this.openedNavigation = ! this.openedNavigation;
  }
}
