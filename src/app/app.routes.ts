import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ClientComponent } from './pages/client/client.component';
import { ViewClientComponent } from './pages/client/view-client/view-client.component';
import { ServiceItemComponent } from './pages/service-item/service-item.component';
import { UseraccountPageComponent } from './pages/useraccount-page/useraccount-page.component';
import { ClientResolver } from './resolvers/client.resolver';

export const routes: Routes = [
  {
    path : '',component : LoginComponent
  },
  {
    path :'login',
    component:LoginComponent
  },
  {
    path:'home',
    component:ClientComponent,
    canActivate: [authGuard]
  },
  {
    path:'client/:id',
    component:ViewClientComponent,
    canActivate: [authGuard],
    resolve: {
      client: ClientResolver // Implementa un resolver para obtener los datos del cliente
    }

  },
  {
    path:'service-item',
    component:ServiceItemComponent,
    canActivate: [authGuard]
  },
  {
    path:'useraccount',
    component: UseraccountPageComponent,
    canActivate: [authGuard]
  }
];
