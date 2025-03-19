import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { Notification, NotificationBubbleComponent } from './components/notification-bubble/notification-bubble.component';
import { NotificationSystemService } from './services/notification-system.service';
import { ReloadComponentDirective } from './directives/reload-component.directive';
import { LoaderComponent } from "./components/loader/loader.component";
import { PrintContentService } from './services/managers/print/print-content.service';
import { apiRequestInterceptor } from './interceptors/api-request.interceptor';

export function loadConfig(http: HttpClient) {
  return () => http.get('/assets/config.json').toPromise().then((config) => {
    Object.assign(environment, config);
  });
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationBubbleComponent, ReloadComponentDirective, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BlueDiamond-Frontend';

  notification! : Notification;
  updatePage! : Notification;
  deferredPrompt: any;

  constructor(private notificationService : NotificationSystemService,
    private printHtmlService: PrintContentService
  ){
    this.notificationService.notification.subscribe(res => this.notification = res);
    this.notificationService.updatePage.subscribe(res => this.updatePage = res);
  }
}
