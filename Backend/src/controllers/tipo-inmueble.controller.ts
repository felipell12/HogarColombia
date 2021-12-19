import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { basicAuthorization } from '../middlewares/auth.midd';
import {TipoInmueble} from '../models';
import {TipoInmuebleRepository} from '../repositories';

export class TipoInmuebleController {
  constructor(
    @repository(TipoInmuebleRepository)
    public tipoInmuebleRepository : TipoInmuebleRepository,
  ) {}

  @post('/tipo-inmuebles')
  @response(200, {
    description: 'TipoInmueble model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoInmueble)}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Admin'],
    voters: [basicAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoInmueble, {
            title: 'NewTipoInmueble',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoInmueble: Omit<TipoInmueble, 'id'>,
  ): Promise<TipoInmueble> {
    return this.tipoInmuebleRepository.create(tipoInmueble);
  }

  @get('/tipo-inmuebles/count')
  @response(200, {
    description: 'TipoInmueble model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Admin, Client'],
    voters: [basicAuthorization],
  })
  async count(
    @param.where(TipoInmueble) where?: Where<TipoInmueble>,
  ): Promise<Count> {
    return this.tipoInmuebleRepository.count(where);
  }

  @get('/tipo-inmuebles')
  @response(200, {
    description: 'Array of TipoInmueble model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoInmueble, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Admin','Client', 'Adviser'],
    voters: [basicAuthorization],
  })
  async find(
    @param.filter(TipoInmueble) filter?: Filter<TipoInmueble>,
  ): Promise<TipoInmueble[]> {
    return this.tipoInmuebleRepository.find(filter);
  }

  @patch('/tipo-inmuebles')
  @response(200, {
    description: 'TipoInmueble PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Admin'],
    voters: [basicAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoInmueble, {partial: true}),
        },
      },
    })
    tipoInmueble: TipoInmueble,
    @param.where(TipoInmueble) where?: Where<TipoInmueble>,
  ): Promise<Count> {
    return this.tipoInmuebleRepository.updateAll(tipoInmueble, where);
  }

  @get('/tipo-inmuebles/{id}')
  @response(200, {
    description: 'TipoInmueble model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoInmueble, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Admin','Client', 'Adviser'],
    voters: [basicAuthorization],
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoInmueble, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoInmueble>
  ): Promise<TipoInmueble> {
    return this.tipoInmuebleRepository.findById(id, filter);
  }

  @patch('/tipo-inmuebles/{id}')
  @response(204, {
    description: 'TipoInmueble PATCH success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Admin'],
    voters: [basicAuthorization],
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoInmueble, {partial: true}),
        },
      },
    })
    tipoInmueble: TipoInmueble,
  ): Promise<void> {
    await this.tipoInmuebleRepository.updateById(id, tipoInmueble);
  }

  @put('/tipo-inmuebles/{id}')
  @response(204, {
    description: 'TipoInmueble PUT success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Admin'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoInmueble: TipoInmueble,
  ): Promise<void> {
    await this.tipoInmuebleRepository.replaceById(id, tipoInmueble);
  }

  @del('/tipo-inmuebles/{id}')
  @response(204, {
    description: 'TipoInmueble DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Admin'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoInmuebleRepository.deleteById(id);
  }
}
