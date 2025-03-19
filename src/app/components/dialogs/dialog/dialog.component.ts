import { Component } from '@angular/core';
import { DialogService } from '../../../services/managers/dialog/dialog.service';
import { ButtonComponent } from '../../buttons/button/button.component';

@Component({
  selector: 'app-dialog',
  imports:[ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  constructor(public dialogService: DialogService){

  }
  back(){
    this.dialogService.RemoveMethod();
  }
}
