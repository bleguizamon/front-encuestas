import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FormularioEncuestaFormService } from './formulario-encuesta-form.service';
import { FormularioEncuestaService } from '../service/formulario-encuesta.service';
import { IFormularioEncuesta } from '../formulario-encuesta.model';
import { IComputador } from 'app/entities/computador/computador.model';
import { ComputadorService } from 'app/entities/computador/service/computador.service';

import { FormularioEncuestaUpdateComponent } from './formulario-encuesta-update.component';

describe('FormularioEncuesta Management Update Component', () => {
  let comp: FormularioEncuestaUpdateComponent;
  let fixture: ComponentFixture<FormularioEncuestaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let formularioEncuestaFormService: FormularioEncuestaFormService;
  let formularioEncuestaService: FormularioEncuestaService;
  let computadorService: ComputadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FormularioEncuestaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FormularioEncuestaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FormularioEncuestaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    formularioEncuestaFormService = TestBed.inject(FormularioEncuestaFormService);
    formularioEncuestaService = TestBed.inject(FormularioEncuestaService);
    computadorService = TestBed.inject(ComputadorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Computador query and add missing value', () => {
      const formularioEncuesta: IFormularioEncuesta = { id: 456 };
      const marcaFavoritaPC: IComputador = { id: 13354 };
      formularioEncuesta.marcaFavoritaPC = marcaFavoritaPC;

      const computadorCollection: IComputador[] = [{ id: 76043 }];
      jest.spyOn(computadorService, 'query').mockReturnValue(of(new HttpResponse({ body: computadorCollection })));
      const additionalComputadors = [marcaFavoritaPC];
      const expectedCollection: IComputador[] = [...additionalComputadors, ...computadorCollection];
      jest.spyOn(computadorService, 'addComputadorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ formularioEncuesta });
      comp.ngOnInit();

      expect(computadorService.query).toHaveBeenCalled();
      expect(computadorService.addComputadorToCollectionIfMissing).toHaveBeenCalledWith(
        computadorCollection,
        ...additionalComputadors.map(expect.objectContaining)
      );
      expect(comp.computadorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const formularioEncuesta: IFormularioEncuesta = { id: 456 };
      const marcaFavoritaPC: IComputador = { id: 71979 };
      formularioEncuesta.marcaFavoritaPC = marcaFavoritaPC;

      activatedRoute.data = of({ formularioEncuesta });
      comp.ngOnInit();

      expect(comp.computadorsSharedCollection).toContain(marcaFavoritaPC);
      expect(comp.formularioEncuesta).toEqual(formularioEncuesta);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormularioEncuesta>>();
      const formularioEncuesta = { id: 123 };
      jest.spyOn(formularioEncuestaFormService, 'getFormularioEncuesta').mockReturnValue(formularioEncuesta);
      jest.spyOn(formularioEncuestaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formularioEncuesta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: formularioEncuesta }));
      saveSubject.complete();

      // THEN
      expect(formularioEncuestaFormService.getFormularioEncuesta).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(formularioEncuestaService.update).toHaveBeenCalledWith(expect.objectContaining(formularioEncuesta));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormularioEncuesta>>();
      const formularioEncuesta = { id: 123 };
      jest.spyOn(formularioEncuestaFormService, 'getFormularioEncuesta').mockReturnValue({ id: null });
      jest.spyOn(formularioEncuestaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formularioEncuesta: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: formularioEncuesta }));
      saveSubject.complete();

      // THEN
      expect(formularioEncuestaFormService.getFormularioEncuesta).toHaveBeenCalled();
      expect(formularioEncuestaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormularioEncuesta>>();
      const formularioEncuesta = { id: 123 };
      jest.spyOn(formularioEncuestaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formularioEncuesta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(formularioEncuestaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareComputador', () => {
      it('Should forward to computadorService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(computadorService, 'compareComputador');
        comp.compareComputador(entity, entity2);
        expect(computadorService.compareComputador).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
