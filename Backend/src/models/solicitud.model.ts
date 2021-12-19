import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {User} from './user.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
  })
  comentarios?: string;

  @property({
    type: 'string',
  })
  contrato?: string;

  @belongsTo(() => Inmueble)
  inmuebleId: string;

  @belongsTo(() => User)
  clienteId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
