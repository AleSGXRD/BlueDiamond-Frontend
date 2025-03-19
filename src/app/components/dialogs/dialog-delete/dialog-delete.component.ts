import { Component, Input, SimpleChanges } from '@angular/core';
import { ButtonComponent } from '../../buttons/button/button.component';
import { DialogService } from '../../../services/managers/dialog/dialog.service';

@Component({
  selector: 'app-dialog-delete',
  imports:[ButtonComponent],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
})
export class DialogDeleteComponent {
  constructor(public dialogService: DialogService){

  }
  back(){
    this.dialogService.RemoveDeleteMethod();
  }
}
