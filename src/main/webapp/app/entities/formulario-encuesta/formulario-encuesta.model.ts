import dayjs from 'dayjs/esm';
import { IComputador } from 'app/entities/computador/computador.model';

export interface IFormularioEncuesta {
  id: number;
  numeroDocumento?: number | null;
  email?: string | null;
  comentarios?: string | null;
  fechaRespuesta?: dayjs.Dayjs | null;
  marcaFavoritaPC?: Pick<IComputador, 'id' | 'marca'> | null;
}

export type NewFormularioEncuesta = Omit<IFormularioEncuesta, 'id'> & { id: null };
