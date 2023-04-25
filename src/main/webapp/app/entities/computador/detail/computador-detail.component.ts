import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComputador } from '../computador.model';

@Component({
  selector: 'jhi-computador-detail',
  templateUrl: './computador-detail.component.html',
})
export class ComputadorDetailComponent implements OnInit {
  computador: IComputador | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ computador }) => {
      this.computador = computador;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
