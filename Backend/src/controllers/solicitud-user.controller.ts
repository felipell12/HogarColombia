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
  User,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudUserController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }
// ////////////////////////////////////////////////////////////////////////////////////////////
/*servicio para obtener una info del usuario que hizo la solicitud*/
  @get('/solicituds/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Admin', 'Adviser'],
    voters: [basicAuthorization],
  })
  async getUser(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<User> {
    return this.solicitudRepository.cliente(id);
  }
}
