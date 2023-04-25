import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FormularioEncuestaComponent } from './list/formulario-encuesta.component';
import { FormularioEncuestaDetailComponent } from './detail/formulario-encuesta-detail.component';
import { FormularioEncuestaUpdateComponent } from './update/formulario-encuesta-update.component';
import { FormularioEncuestaDeleteDialogComponent } from './delete/formulario-encuesta-delete-dialog.component';
import { FormularioEncuestaRoutingModule } from './route/formulario-encuesta-routing.module';

@NgModule({
  imports: [SharedModule, FormularioEncuestaRoutingModule],
  declarations: [
    FormularioEncuestaComponent,
    FormularioEncuestaDetailComponent,
    FormularioEncuestaUpdateComponent,
    FormularioEncuestaDeleteDialogComponent,
  ],
})
export class FormularioEncuestaModule {}
