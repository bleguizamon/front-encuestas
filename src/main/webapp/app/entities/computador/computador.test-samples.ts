import { IComputador, NewComputador } from './computador.model';

export const sampleWithRequiredData: IComputador = {
  id: 50492,
};

export const sampleWithPartialData: IComputador = {
  id: 28665,
};

export const sampleWithFullData: IComputador = {
  id: 15538,
  marca: 'Mauritania',
};

export const sampleWithNewData: NewComputador = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
