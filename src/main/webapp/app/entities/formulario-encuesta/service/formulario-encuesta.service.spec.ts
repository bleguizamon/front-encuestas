import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFormularioEncuesta } from '../formulario-encuesta.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../formulario-encuesta.test-samples';

import { FormularioEncuestaService, RestFormularioEncuesta } from './formulario-encuesta.service';

const requireRestSample: RestFormularioEncuesta = {
  ...sampleWithRequiredData,
  fechaRespuesta: sampleWithRequiredData.fechaRespuesta?.toJSON(),
};

describe('FormularioEncuesta Service', () => {
  let service: FormularioEncuestaService;
  let httpMock: HttpTestingController;
  let expectedResult: IFormularioEncuesta | IFormularioEncuesta[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FormularioEncuestaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a FormularioEncuesta', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const formularioEncuesta = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(formularioEncuesta).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FormularioEncuesta', () => {
      const formularioEncuesta = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(formularioEncuesta).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FormularioEncuesta', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FormularioEncuesta', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FormularioEncuesta', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFormularioEncuestaToCollectionIfMissing', () => {
      it('should add a FormularioEncuesta to an empty array', () => {
        const formularioEncuesta: IFormularioEncuesta = sampleWithRequiredData;
        expectedResult = service.addFormularioEncuestaToCollectionIfMissing([], formularioEncuesta);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(formularioEncuesta);
      });

      it('should not add a FormularioEncuesta to an array that contains it', () => {
        const formularioEncuesta: IFormularioEncuesta = sampleWithRequiredData;
        const formularioEncuestaCollection: IFormularioEncuesta[] = [
          {
            ...formularioEncuesta,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFormularioEncuestaToCollectionIfMissing(formularioEncuestaCollection, formularioEncuesta);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FormularioEncuesta to an array that doesn't contain it", () => {
        const formularioEncuesta: IFormularioEncuesta = sampleWithRequiredData;
        const formularioEncuestaCollection: IFormularioEncuesta[] = [sampleWithPartialData];
        expectedResult = service.addFormularioEncuestaToCollectionIfMissing(formularioEncuestaCollection, formularioEncuesta);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(formularioEncuesta);
      });

      it('should add only unique FormularioEncuesta to an array', () => {
        const formularioEncuestaArray: IFormularioEncuesta[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const formularioEncuestaCollection: IFormularioEncuesta[] = [sampleWithRequiredData];
        expectedResult = service.addFormularioEncuestaToCollectionIfMissing(formularioEncuestaCollection, ...formularioEncuestaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const formularioEncuesta: IFormularioEncuesta = sampleWithRequiredData;
        const formularioEncuesta2: IFormularioEncuesta = sampleWithPartialData;
        expectedResult = service.addFormularioEncuestaToCollectionIfMissing([], formularioEncuesta, formularioEncuesta2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(formularioEncuesta);
        expect(expectedResult).toContain(formularioEncuesta2);
      });

      it('should accept null and undefined values', () => {
        const formularioEncuesta: IFormularioEncuesta = sampleWithRequiredData;
        expectedResult = service.addFormularioEncuestaToCollectionIfMissing([], null, formularioEncuesta, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(formularioEncuesta);
      });

      it('should return initial array if no FormularioEncuesta is added', () => {
        const formularioEncuestaCollection: IFormularioEncuesta[] = [sampleWithRequiredData];
        expectedResult = service.addFormularioEncuestaToCollectionIfMissing(formularioEncuestaCollection, undefined, null);
        expect(expectedResult).toEqual(formularioEncuestaCollection);
      });
    });

    describe('compareFormularioEncuesta', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFormularioEncuesta(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFormularioEncuesta(entity1, entity2);
        const compareResult2 = service.compareFormularioEncuesta(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFormularioEncuesta(entity1, entity2);
        const compareResult2 = service.compareFormularioEncuesta(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFormularioEncuesta(entity1, entity2);
        const compareResult2 = service.compareFormularioEncuesta(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
