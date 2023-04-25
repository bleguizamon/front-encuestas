import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../computador.test-samples';

import { ComputadorFormService } from './computador-form.service';

describe('Computador Form Service', () => {
  let service: ComputadorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputadorFormService);
  });

  describe('Service methods', () => {
    describe('createComputadorFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createComputadorFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            marca: expect.any(Object),
          })
        );
      });

      it('passing IComputador should create a new form with FormGroup', () => {
        const formGroup = service.createComputadorFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            marca: expect.any(Object),
          })
        );
      });
    });

    describe('getComputador', () => {
      it('should return NewComputador for default Computador initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createComputadorFormGroup(sampleWithNewData);

        const computador = service.getComputador(formGroup) as any;

        expect(computador).toMatchObject(sampleWithNewData);
      });

      it('should return NewComputador for empty Computador initial value', () => {
        const formGroup = service.createComputadorFormGroup();

        const computador = service.getComputador(formGroup) as any;

        expect(computador).toMatchObject({});
      });

      it('should return IComputador', () => {
        const formGroup = service.createComputadorFormGroup(sampleWithRequiredData);

        const computador = service.getComputador(formGroup) as any;

        expect(computador).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IComputador should not enable id FormControl', () => {
        const formGroup = service.createComputadorFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewComputador should disable id FormControl', () => {
        const formGroup = service.createComputadorFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
