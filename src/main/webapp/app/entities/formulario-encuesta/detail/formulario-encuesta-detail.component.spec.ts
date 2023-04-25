import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FormularioEncuestaDetailComponent } from './formulario-encuesta-detail.component';

describe('FormularioEncuesta Management Detail Component', () => {
  let comp: FormularioEncuestaDetailComponent;
  let fixture: ComponentFixture<FormularioEncuestaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioEncuestaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ formularioEncuesta: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FormularioEncuestaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FormularioEncuestaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load formularioEncuesta on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.formularioEncuesta).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
