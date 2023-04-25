import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FormularioEncuestaFormService, FormularioEncuestaFormGroup } from './formulario-encuesta-form.service';
import { IFormularioEncuesta } from '../formulario-encuesta.model';
import { FormularioEncuestaService } from '../service/formulario-encuesta.service';
import { IComputador } from 'app/entities/computador/computador.model';
import { ComputadorService } from 'app/entities/computador/service/computador.service';

@Component({
  selector: 'jhi-formulario-encuesta-update',
  templateUrl: './formulario-encuesta-update.component.html',
})
export class FormularioEncuestaUpdateComponent implements OnInit {
  isSaving = false;
  formularioEncuesta: IFormularioEncuesta | null = null;

  computadorsSharedCollection: IComputador[] = [];

  editForm: FormularioEncuestaFormGroup = this.formularioEncuestaFormService.createFormularioEncuestaFormGroup();

  constructor(
    protected formularioEncuestaService: FormularioEncuestaService,
    protected formularioEncuestaFormService: FormularioEncuestaFormService,
    protected computadorService: ComputadorService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareComputador = (o1: IComputador | null, o2: IComputador | null): boolean => this.computadorService.compareComputador(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formularioEncuesta }) => {
      this.formularioEncuesta = formularioEncuesta;
      if (formularioEncuesta) {
        this.updateForm(formularioEncuesta);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const formularioEncuesta = this.formularioEncuestaFormService.getFormularioEncuesta(this.editForm);
    if (formularioEncuesta.id !== null) {
      this.subscribeToSaveResponse(this.formularioEncuestaService.update(formularioEncuesta));
    } else {
      this.subscribeToSaveResponse(this.formularioEncuestaService.create(formularioEncuesta));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormularioEncuesta>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(formularioEncuesta: IFormularioEncuesta): void {
    this.formularioEncuesta = formularioEncuesta;
    this.formularioEncuestaFormService.resetForm(this.editForm, formularioEncuesta);

    this.computadorsSharedCollection = this.computadorService.addComputadorToCollectionIfMissing<IComputador>(
      this.computadorsSharedCollection,
      formularioEncuesta.marcaFavoritaPC
    );
  }

  protected loadRelationshipsOptions(): void {
    this.computadorService
      .query()
      .pipe(map((res: HttpResponse<IComputador[]>) => res.body ?? []))
      .pipe(
        map((computadors: IComputador[]) =>
          this.computadorService.addComputadorToCollectionIfMissing<IComputador>(computadors, this.formularioEncuesta?.marcaFavoritaPC)
        )
      )
      .subscribe((computadors: IComputador[]) => (this.computadorsSharedCollection = computadors));
  }
}
