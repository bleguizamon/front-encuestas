import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFormularioEncuesta } from '../formulario-encuesta.model';
import { FormularioEncuestaService } from '../service/formulario-encuesta.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './formulario-encuesta-delete-dialog.component.html',
})
export class FormularioEncuestaDeleteDialogComponent {
  formularioEncuesta?: IFormularioEncuesta;

  constructor(protected formularioEncuestaService: FormularioEncuestaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.formularioEncuestaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
