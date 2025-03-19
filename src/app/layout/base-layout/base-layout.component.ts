import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavigationMobileComponent } from "../../components/navigation-mobile/navigation-mobile.component";
import { DialogComponent } from '../../components/dialogs/dialog/dialog.component';
import { DialogDeleteComponent } from '../../components/dialogs/dialog-delete/dialog-delete.component';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'base-layout',
  imports: [SidebarComponent, NavigationMobileComponent, DialogComponent, DialogDeleteComponent, FormComponent],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.css'
})
export class BaseLayoutComponent {
}
