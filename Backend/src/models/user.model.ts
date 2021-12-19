import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';
import {Inmueble} from './inmueble.model';
import {Solicitud} from './solicitud.model';

export type Credentials = {
  email: string;
  password: string;
  role?: string
};

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})

export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    // defaultFn: '',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoDocumento: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
  })
  cartaLaboral?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @hasMany(() => Inmueble, {keyTo: 'asesorId'})
  inmuebles: Inmueble[];

  @hasMany(() => Solicitud, {keyTo: 'clienteId'})
  solicitudes: Solicitud[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
