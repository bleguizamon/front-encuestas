import dayjs from 'dayjs/esm';

import { IFormularioEncuesta, NewFormularioEncuesta } from './formulario-encuesta.model';

export const sampleWithRequiredData: IFormularioEncuesta = {
  id: 77778,
  numeroDocumento: 33407,
  email: 'Agustn.Padrn@hotmail.com',
};

export const sampleWithPartialData: IFormularioEncuesta = {
  id: 11546,
  numeroDocumento: 94039,
  email: 'Isabela.Alicea88@hotmail.com',
};

export const sampleWithFullData: IFormularioEncuesta = {
  id: 44966,
  numeroDocumento: 87077,
  email: 'David21@gmail.com',
  comentarios: 'Gerente portals instalación',
  fechaRespuesta: dayjs('2023-04-24T17:20'),
};

export const sampleWithNewData: NewFormularioEncuesta = {
  numeroDocumento: 44837,
  email: 'Maricarmen21@hotmail.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
