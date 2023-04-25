import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFormularioEncuesta, NewFormularioEncuesta } from '../formulario-encuesta.model';

export type PartialUpdateFormularioEncuesta = Partial<IFormularioEncuesta> & Pick<IFormularioEncuesta, 'id'>;

type RestOf<T extends IFormularioEncuesta | NewFormularioEncuesta> = Omit<T, 'fechaRespuesta'> & {
  fechaRespuesta?: string | null;
};

export type RestFormularioEncuesta = RestOf<IFormularioEncuesta>;

export type NewRestFormularioEncuesta = RestOf<NewFormularioEncuesta>;

export type PartialUpdateRestFormularioEncuesta = RestOf<PartialUpdateFormularioEncuesta>;

export type EntityResponseType = HttpResponse<IFormularioEncuesta>;
export type EntityArrayResponseType = HttpResponse<IFormularioEncuesta[]>;

@Injectable({ providedIn: 'root' })
export class FormularioEncuestaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/formulario-encuestas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(formularioEncuesta: NewFormularioEncuesta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formularioEncuesta);
    return this.http
      .post<RestFormularioEncuesta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(formularioEncuesta: IFormularioEncuesta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formularioEncuesta);
    return this.http
      .put<RestFormularioEncuesta>(`${this.resourceUrl}/${this.getFormularioEncuestaIdentifier(formularioEncuesta)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(formularioEncuesta: PartialUpdateFormularioEncuesta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formularioEncuesta);
    return this.http
      .patch<RestFormularioEncuesta>(`${this.resourceUrl}/${this.getFormularioEncuestaIdentifier(formularioEncuesta)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFormularioEncuesta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFormularioEncuesta[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFormularioEncuestaIdentifier(formularioEncuesta: Pick<IFormularioEncuesta, 'id'>): number {
    return formularioEncuesta.id;
  }

  compareFormularioEncuesta(o1: Pick<IFormularioEncuesta, 'id'> | null, o2: Pick<IFormularioEncuesta, 'id'> | null): boolean {
    return o1 && o2 ? this.getFormularioEncuestaIdentifier(o1) === this.getFormularioEncuestaIdentifier(o2) : o1 === o2;
  }

  addFormularioEncuestaToCollectionIfMissing<Type extends Pick<IFormularioEncuesta, 'id'>>(
    formularioEncuestaCollection: Type[],
    ...formularioEncuestasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const formularioEncuestas: Type[] = formularioEncuestasToCheck.filter(isPresent);
    if (formularioEncuestas.length > 0) {
      const formularioEncuestaCollectionIdentifiers = formularioEncuestaCollection.map(
        formularioEncuestaItem => this.getFormularioEncuestaIdentifier(formularioEncuestaItem)!
      );
      const formularioEncuestasToAdd = formularioEncuestas.filter(formularioEncuestaItem => {
        const formularioEncuestaIdentifier = this.getFormularioEncuestaIdentifier(formularioEncuestaItem);
        if (formularioEncuestaCollectionIdentifiers.includes(formularioEncuestaIdentifier)) {
          return false;
        }
        formularioEncuestaCollectionIdentifiers.push(formularioEncuestaIdentifier);
        return true;
      });
      return [...formularioEncuestasToAdd, ...formularioEncuestaCollection];
    }
    return formularioEncuestaCollection;
  }

  protected convertDateFromClient<T extends IFormularioEncuesta | NewFormularioEncuesta | PartialUpdateFormularioEncuesta>(
    formularioEncuesta: T
  ): RestOf<T> {
    return {
      ...formularioEncuesta,
      fechaRespuesta: formularioEncuesta.fechaRespuesta?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restFormularioEncuesta: RestFormularioEncuesta): IFormularioEncuesta {
    return {
      ...restFormularioEncuesta,
      fechaRespuesta: restFormularioEncuesta.fechaRespuesta ? dayjs(restFormularioEncuesta.fechaRespuesta) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFormularioEncuesta>): HttpResponse<IFormularioEncuesta> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFormularioEncuesta[]>): HttpResponse<IFormularioEncuesta[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
