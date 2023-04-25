import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ComputadorComponent } from '../list/computador.component';
import { ComputadorDetailComponent } from '../detail/computador-detail.component';
import { ComputadorUpdateComponent } from '../update/computador-update.component';
import { ComputadorRoutingResolveService } from './computador-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const computadorRoute: Routes = [
  {
    path: '',
    component: ComputadorComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ComputadorDetailComponent,
    resolve: {
      computador: ComputadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ComputadorUpdateComponent,
    resolve: {
      computador: ComputadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ComputadorUpdateComponent,
    resolve: {
      computador: ComputadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(computadorRoute)],
  exports: [RouterModule],
})
export class ComputadorRoutingModule {}
