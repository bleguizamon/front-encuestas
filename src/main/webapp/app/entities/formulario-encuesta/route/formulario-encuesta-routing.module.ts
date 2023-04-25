import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FormularioEncuestaComponent } from '../list/formulario-encuesta.component';
import { FormularioEncuestaDetailComponent } from '../detail/formulario-encuesta-detail.component';
import { FormularioEncuestaUpdateComponent } from '../update/formulario-encuesta-update.component';
import { FormularioEncuestaRoutingResolveService } from './formulario-encuesta-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const formularioEncuestaRoute: Routes = [
  {
    path: '',
    component: FormularioEncuestaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FormularioEncuestaDetailComponent,
    resolve: {
      formularioEncuesta: FormularioEncuestaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FormularioEncuestaUpdateComponent,
    resolve: {
      formularioEncuesta: FormularioEncuestaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FormularioEncuestaUpdateComponent,
    resolve: {
      formularioEncuesta: FormularioEncuestaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(formularioEncuestaRoute)],
  exports: [RouterModule],
})
export class FormularioEncuestaRoutingModule {}
