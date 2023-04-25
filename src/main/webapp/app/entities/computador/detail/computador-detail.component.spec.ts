import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ComputadorDetailComponent } from './computador-detail.component';

describe('Computador Management Detail Component', () => {
  let comp: ComputadorDetailComponent;
  let fixture: ComponentFixture<ComputadorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComputadorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ computador: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ComputadorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ComputadorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load computador on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.computador).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
