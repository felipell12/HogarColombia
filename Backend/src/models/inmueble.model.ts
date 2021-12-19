import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {TipoInmueble} from './tipo-inmueble.model';
import {User} from './user.model';
import {Solicitud} from './solicitud.model';

@model()
export class Inmueble extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  tipoOferta: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreEncargado: string;

  @property({
    type: 'string',
    required: true,
  })
  contactoEncargado: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'string',
  })
  video?: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  @belongsTo(() => TipoInmueble)
  tipoInmuebleId: string;

  @belongsTo(() => User)
  asesorId: string;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
