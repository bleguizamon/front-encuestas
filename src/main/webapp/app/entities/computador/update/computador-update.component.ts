import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ComputadorFormService, ComputadorFormGroup } from './computador-form.service';
import { IComputador } from '../computador.model';
import { ComputadorService } from '../service/computador.service';

@Component({
  selector: 'jhi-computador-update',
  templateUrl: './computador-update.component.html',
})
export class ComputadorUpdateComponent implements OnInit {
  isSaving = false;
  computador: IComputador | null = null;

  editForm: ComputadorFormGroup = this.computadorFormService.createComputadorFormGroup();

  constructor(
    protected computadorService: ComputadorService,
    protected computadorFormService: ComputadorFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ computador }) => {
      this.computador = computador;
      if (computador) {
        this.updateForm(computador);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const computador = this.computadorFormService.getComputador(this.editForm);
    if (computador.id !== null) {
      this.subscribeToSaveResponse(this.computadorService.update(computador));
    } else {
      this.subscribeToSaveResponse(this.computadorService.create(computador));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComputador>>): void {
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

  protected updateForm(computador: IComputador): void {
    this.computador = computador;
    this.computadorFormService.resetForm(this.editForm, computador);
  }
}
