import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IComputador } from '../computador.model';
import { ComputadorService } from '../service/computador.service';

@Injectable({ providedIn: 'root' })
export class ComputadorRoutingResolveService implements Resolve<IComputador | null> {
  constructor(protected service: ComputadorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IComputador | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((computador: HttpResponse<IComputador>) => {
          if (computador.body) {
            return of(computador.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
