import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IComputador, NewComputador } from '../computador.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IComputador for edit and NewComputadorFormGroupInput for create.
 */
type ComputadorFormGroupInput = IComputador | PartialWithRequiredKeyOf<NewComputador>;

type ComputadorFormDefaults = Pick<NewComputador, 'id'>;

type ComputadorFormGroupContent = {
  id: FormControl<IComputador['id'] | NewComputador['id']>;
  marca: FormControl<IComputador['marca']>;
};

export type ComputadorFormGroup = FormGroup<ComputadorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ComputadorFormService {
  createComputadorFormGroup(computador: ComputadorFormGroupInput = { id: null }): ComputadorFormGroup {
    const computadorRawValue = {
      ...this.getFormDefaults(),
      ...computador,
    };
    return new FormGroup<ComputadorFormGroupContent>({
      id: new FormControl(
        { value: computadorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      marca: new FormControl(computadorRawValue.marca),
    });
  }

  getComputador(form: ComputadorFormGroup): IComputador | NewComputador {
    return form.getRawValue() as IComputador | NewComputador;
  }

  resetForm(form: ComputadorFormGroup, computador: ComputadorFormGroupInput): void {
    const computadorRawValue = { ...this.getFormDefaults(), ...computador };
    form.reset(
      {
        ...computadorRawValue,
        id: { value: computadorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ComputadorFormDefaults {
    return {
      id: null,
    };
  }
}
