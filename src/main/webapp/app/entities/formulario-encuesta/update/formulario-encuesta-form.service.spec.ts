import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../formulario-encuesta.test-samples';

import { FormularioEncuestaFormService } from './formulario-encuesta-form.service';

describe('FormularioEncuesta Form Service', () => {
  let service: FormularioEncuestaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioEncuestaFormService);
  });

  describe('Service methods', () => {
    describe('createFormularioEncuestaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFormularioEncuestaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            numeroDocumento: expect.any(Object),
            email: expect.any(Object),
            comentarios: expect.any(Object),
            fechaRespuesta: expect.any(Object),
            marcaFavoritaPC: expect.any(Object),
          })
        );
      });

      it('passing IFormularioEncuesta should create a new form with FormGroup', () => {
        const formGroup = service.createFormularioEncuestaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            numeroDocumento: expect.any(Object),
            email: expect.any(Object),
            comentarios: expect.any(Object),
            fechaRespuesta: expect.any(Object),
            marcaFavoritaPC: expect.any(Object),
          })
        );
      });
    });

    describe('getFormularioEncuesta', () => {
      it('should return NewFormularioEncuesta for default FormularioEncuesta initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFormularioEncuestaFormGroup(sampleWithNewData);

        const formularioEncuesta = service.getFormularioEncuesta(formGroup) as any;

        expect(formularioEncuesta).toMatchObject(sampleWithNewData);
      });

      it('should return NewFormularioEncuesta for empty FormularioEncuesta initial value', () => {
        const formGroup = service.createFormularioEncuestaFormGroup();

        const formularioEncuesta = service.getFormularioEncuesta(formGroup) as any;

        expect(formularioEncuesta).toMatchObject({});
      });

      it('should return IFormularioEncuesta', () => {
        const formGroup = service.createFormularioEncuestaFormGroup(sampleWithRequiredData);

        const formularioEncuesta = service.getFormularioEncuesta(formGroup) as any;

        expect(formularioEncuesta).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFormularioEncuesta should not enable id FormControl', () => {
        const formGroup = service.createFormularioEncuestaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFormularioEncuesta should disable id FormControl', () => {
        const formGroup = service.createFormularioEncuestaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
