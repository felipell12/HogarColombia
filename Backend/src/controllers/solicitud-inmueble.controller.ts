import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import { basicAuthorization } from '../middlewares/auth.midd';
import {
  Solicitud,
  Inmueble,
} from '../models';
import { SolicitudRepository } from '../repositories';

export class SolicitudInmuebleController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }
  // ////////////////////////////////////////////////////////////////////////////////////////////
  /*servicio para obtener una info del inmueble que se solicito*/
  @get('/solicituds/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Inmueble belonging to Solicitud',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Inmueble) },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Client', 'Admin', 'Adviser'],
    voters: [basicAuthorization],
  })
  async getInmueble(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Inmueble> {
    return this.solicitudRepository.inmueble(id);
  }
}
