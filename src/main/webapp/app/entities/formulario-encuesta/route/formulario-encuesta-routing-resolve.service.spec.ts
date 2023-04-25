import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IFormularioEncuesta } from '../formulario-encuesta.model';
import { FormularioEncuestaService } from '../service/formulario-encuesta.service';

import { FormularioEncuestaRoutingResolveService } from './formulario-encuesta-routing-resolve.service';

describe('FormularioEncuesta routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: FormularioEncuestaRoutingResolveService;
  let service: FormularioEncuestaService;
  let resultFormularioEncuesta: IFormularioEncuesta | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(FormularioEncuestaRoutingResolveService);
    service = TestBed.inject(FormularioEncuestaService);
    resultFormularioEncuesta = undefined;
  });

  describe('resolve', () => {
    it('should return IFormularioEncuesta returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFormularioEncuesta = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultFormularioEncuesta).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFormularioEncuesta = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultFormularioEncuesta).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IFormularioEncuesta>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFormularioEncuesta = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultFormularioEncuesta).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
