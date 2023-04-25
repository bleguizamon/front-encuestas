import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'formulario-encuesta',
        data: { pageTitle: 'encuestasApp.formularioEncuesta.home.title' },
        loadChildren: () => import('./formulario-encuesta/formulario-encuesta.module').then(m => m.FormularioEncuestaModule),
      },
      {
        path: 'computador',
        data: { pageTitle: 'encuestasApp.computador.home.title' },
        loadChildren: () => import('./computador/computador.module').then(m => m.ComputadorModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
