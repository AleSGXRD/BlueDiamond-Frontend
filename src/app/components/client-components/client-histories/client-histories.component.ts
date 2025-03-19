import { Component, Input } from '@angular/core';
import { HistoryClient } from '../../../types/api/history-client';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../buttons/button/button.component';
import { format } from 'date-fns';
import { FormField, FormFieldType } from '../../../types/forms/form-field';
import { HistoryClientApiManagerService } from '../../../services/managers/api/history-client/history-client-api-manager.service';
import { FormType } from '../../../types/forms/form-type';
import { FormService } from '../../../services/managers/form/form.service';
import { FormData } from '../../../types/forms/form-data';
import { HistoryClientApiService } from '../../../services/apis/history-client/history-client-api.service';
import { DialogService } from '../../../services/managers/dialog/dialog.service';
import { NotificationSystemService } from '../../../services/notification-system.service';

@Component({
  selector: 'client-histories',
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './client-histories.component.html',
  styleUrl: './client-histories.component.css'
})
export class ClientHistoriesComponent {
  @Input()
  histories! : HistoryClient[];

  constructor(private formBuilder: FormBuilder,
    private historyClientApiService : HistoryClientApiService,
    private historyClientApiManagerService : HistoryClientApiManagerService,
    private formService: FormService,
    private dialogService:DialogService,
    private notificationSystem: NotificationSystemService
  ){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  serviceDay(item : HistoryClient){
    if(item.date == undefined) return 'No Date'
    return format(new Date(item.date), 'yyyy-MM-dd')
  }
  edit(item : HistoryClient){
    const addform = this.formBuilder.group({
      clientId: [item.clientId],
      active: [item.active, Validators.required],
      note : [item.note],
      date: [new Date(item.date), Validators.required],
    })
    const addInputs:FormField[] = [
      {
        type : FormFieldType.DATETIME,
        formControlName: 'date',
        name: "Fecha*",
        value: new Date(item.date)
      },
      {
        type : FormFieldType.BOOLEAN,
        formControlName: 'active',
        name: "Cliente activo*",
        value: false
      },
      {
        type : FormFieldType.TEXT,
        formControlName: 'note',
        name: "Nota",
      },
    ]

    const editHistoryClientFormData: FormData ={
      apiService: this.historyClientApiManagerService,
      form: addform,
      inputs: addInputs
    }
    this.formService.SetFormData(editHistoryClientFormData, FormType.EDIT);
  }
  delete(item: HistoryClient){
    this.dialogService.SetDeleteMethod(()=>{
      this.historyClientApiService.delete(item).subscribe(
        res => {
          this.notificationSystem.showNotifcation("Se ha eliminado la historia con exito.", 1);
        },
        err => {
          this.notificationSystem.showNotifcationWithoutRefresh("No se ha podido eliminar la historia del cliente.", 1);
        }
      )
    })
  }
}
