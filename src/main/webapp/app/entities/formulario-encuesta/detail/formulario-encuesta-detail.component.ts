import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormularioEncuesta } from '../formulario-encuesta.model';

@Component({
  selector: 'jhi-formulario-encuesta-detail',
  templateUrl: './formulario-encuesta-detail.component.html',
})
export class FormularioEncuestaDetailComponent implements OnInit {
  formularioEncuesta: IFormularioEncuesta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formularioEncuesta }) => {
      this.formularioEncuesta = formularioEncuesta;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
