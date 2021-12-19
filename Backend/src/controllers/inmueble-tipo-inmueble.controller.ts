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
  TipoInmueble,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleTipoInmuebleController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/tipo-inmueble', {
    responses: {
      '200': {
        description: 'TipoInmueble belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoInmueble)},
          },
        },
      },
    },
  })
  async getTipoInmueble(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<TipoInmueble> {
    return this.inmuebleRepository.tipoInmueble(id);
  }
}
