export interface IComputador {
  id: number;
  marca?: string | null;
}

export type NewComputador = Omit<IComputador, 'id'> & { id: null };
