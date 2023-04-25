import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IComputador, NewComputador } from '../computador.model';

export type PartialUpdateComputador = Partial<IComputador> & Pick<IComputador, 'id'>;

export type EntityResponseType = HttpResponse<IComputador>;
export type EntityArrayResponseType = HttpResponse<IComputador[]>;

@Injectable({ providedIn: 'root' })
export class ComputadorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/computadors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(computador: NewComputador): Observable<EntityResponseType> {
    return this.http.post<IComputador>(this.resourceUrl, computador, { observe: 'response' });
  }

  update(computador: IComputador): Observable<EntityResponseType> {
    return this.http.put<IComputador>(`${this.resourceUrl}/${this.getComputadorIdentifier(computador)}`, computador, {
      observe: 'response',
    });
  }

  partialUpdate(computador: PartialUpdateComputador): Observable<EntityResponseType> {
    return this.http.patch<IComputador>(`${this.resourceUrl}/${this.getComputadorIdentifier(computador)}`, computador, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IComputador>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComputador[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getComputadorIdentifier(computador: Pick<IComputador, 'id'>): number {
    return computador.id;
  }

  compareComputador(o1: Pick<IComputador, 'id'> | null, o2: Pick<IComputador, 'id'> | null): boolean {
    return o1 && o2 ? this.getComputadorIdentifier(o1) === this.getComputadorIdentifier(o2) : o1 === o2;
  }

  addComputadorToCollectionIfMissing<Type extends Pick<IComputador, 'id'>>(
    computadorCollection: Type[],
    ...computadorsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const computadors: Type[] = computadorsToCheck.filter(isPresent);
    if (computadors.length > 0) {
      const computadorCollectionIdentifiers = computadorCollection.map(computadorItem => this.getComputadorIdentifier(computadorItem)!);
      const computadorsToAdd = computadors.filter(computadorItem => {
        const computadorIdentifier = this.getComputadorIdentifier(computadorItem);
        if (computadorCollectionIdentifiers.includes(computadorIdentifier)) {
          return false;
        }
        computadorCollectionIdentifiers.push(computadorIdentifier);
        return true;
      });
      return [...computadorsToAdd, ...computadorCollection];
    }
    return computadorCollection;
  }
}
