import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ComputadorComponent } from './list/computador.component';
import { ComputadorDetailComponent } from './detail/computador-detail.component';
import { ComputadorUpdateComponent } from './update/computador-update.component';
import { ComputadorDeleteDialogComponent } from './delete/computador-delete-dialog.component';
import { ComputadorRoutingModule } from './route/computador-routing.module';

@NgModule({
  imports: [SharedModule, ComputadorRoutingModule],
  declarations: [ComputadorComponent, ComputadorDetailComponent, ComputadorUpdateComponent, ComputadorDeleteDialogComponent],
})
export class ComputadorModule {}
