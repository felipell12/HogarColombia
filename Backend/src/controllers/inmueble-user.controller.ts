import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  User,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleUserController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<User> {
    return this.inmuebleRepository.asesor(id);
  }
}
