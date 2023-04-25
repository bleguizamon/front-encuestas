import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFormularioEncuesta, NewFormularioEncuesta } from '../formulario-encuesta.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFormularioEncuesta for edit and NewFormularioEncuestaFormGroupInput for create.
 */
type FormularioEncuestaFormGroupInput = IFormularioEncuesta | PartialWithRequiredKeyOf<NewFormularioEncuesta>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFormularioEncuesta | NewFormularioEncuesta> = Omit<T, 'fechaRespuesta'> & {
  fechaRespuesta?: string | null;
};

type FormularioEncuestaFormRawValue = FormValueOf<IFormularioEncuesta>;

type NewFormularioEncuestaFormRawValue = FormValueOf<NewFormularioEncuesta>;

type FormularioEncuestaFormDefaults = Pick<NewFormularioEncuesta, 'id' | 'fechaRespuesta'>;

type FormularioEncuestaFormGroupContent = {
  id: FormControl<FormularioEncuestaFormRawValue['id'] | NewFormularioEncuesta['id']>;
  numeroDocumento: FormControl<FormularioEncuestaFormRawValue['numeroDocumento']>;
  email: FormControl<FormularioEncuestaFormRawValue['email']>;
  comentarios: FormControl<FormularioEncuestaFormRawValue['comentarios']>;
  fechaRespuesta: FormControl<FormularioEncuestaFormRawValue['fechaRespuesta']>;
  marcaFavoritaPC: FormControl<FormularioEncuestaFormRawValue['marcaFavoritaPC']>;
};

export type FormularioEncuestaFormGroup = FormGroup<FormularioEncuestaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FormularioEncuestaFormService {
  createFormularioEncuestaFormGroup(formularioEncuesta: FormularioEncuestaFormGroupInput = { id: null }): FormularioEncuestaFormGroup {
    const formularioEncuestaRawValue = this.convertFormularioEncuestaToFormularioEncuestaRawValue({
      ...this.getFormDefaults(),
      ...formularioEncuesta,
    });
    return new FormGroup<FormularioEncuestaFormGroupContent>({
      id: new FormControl(
        { value: formularioEncuestaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      numeroDocumento: new FormControl(formularioEncuestaRawValue.numeroDocumento, {
        validators: [Validators.required],
      }),
      email: new FormControl(formularioEncuestaRawValue.email, {
        validators: [Validators.required],
      }),
      comentarios: new FormControl(formularioEncuestaRawValue.comentarios),
      fechaRespuesta: new FormControl(formularioEncuestaRawValue.fechaRespuesta),
      marcaFavoritaPC: new FormControl(formularioEncuestaRawValue.marcaFavoritaPC),
    });
  }

  getFormularioEncuesta(form: FormularioEncuestaFormGroup): IFormularioEncuesta | NewFormularioEncuesta {
    return this.convertFormularioEncuestaRawValueToFormularioEncuesta(
      form.getRawValue() as FormularioEncuestaFormRawValue | NewFormularioEncuestaFormRawValue
    );
  }

  resetForm(form: FormularioEncuestaFormGroup, formularioEncuesta: FormularioEncuestaFormGroupInput): void {
    const formularioEncuestaRawValue = this.convertFormularioEncuestaToFormularioEncuestaRawValue({
      ...this.getFormDefaults(),
      ...formularioEncuesta,
    });
    form.reset(
      {
        ...formularioEncuestaRawValue,
        id: { value: formularioEncuestaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FormularioEncuestaFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      fechaRespuesta: currentTime,
    };
  }

  private convertFormularioEncuestaRawValueToFormularioEncuesta(
    rawFormularioEncuesta: FormularioEncuestaFormRawValue | NewFormularioEncuestaFormRawValue
  ): IFormularioEncuesta | NewFormularioEncuesta {
    return {
      ...rawFormularioEncuesta,
      fechaRespuesta: dayjs(rawFormularioEncuesta.fechaRespuesta, DATE_TIME_FORMAT),
    };
  }

  private convertFormularioEncuestaToFormularioEncuestaRawValue(
    formularioEncuesta: IFormularioEncuesta | (Partial<NewFormularioEncuesta> & FormularioEncuestaFormDefaults)
  ): FormularioEncuestaFormRawValue | PartialWithRequiredKeyOf<NewFormularioEncuestaFormRawValue> {
    return {
      ...formularioEncuesta,
      fechaRespuesta: formularioEncuesta.fechaRespuesta ? formularioEncuesta.fechaRespuesta.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
