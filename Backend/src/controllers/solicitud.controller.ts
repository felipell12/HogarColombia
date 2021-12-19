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
import { Solicitud } from '../models';
import { SolicitudRepository } from '../repositories';

export class SolicitudController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }
  ////////////////////////////////////////////////////////////////////////////////////////////
  /*servicio para crear una solicitud*/
  @post('/solicitudes')
  @response(200, {
    description: 'Solicitud model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Solicitud) } },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Client'],
    voters: [basicAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.solicitudRepository.create(solicitud);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  /*servicio para contar todas las solicitudes*/
  @get('/solicitudes/count')
  @response(200, {
    description: 'Solicitud model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Admin'],
    voters: [basicAuthorization],
  })
  async count(
    @param.where(Solicitud) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.count(where);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  /*servicio para obtener todas las solicitudes*/
  @get('/solicitudes')
  @response(200, {
    description: 'Array of Solicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Solicitud, { includeRelations: true }),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Client', 'Admin', 'Adviser'],
    voters: [basicAuthorization],
  })
  async find(
    @param.filter(Solicitud) filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.solicitudRepository.find(filter);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  /*servicio para actualizar conteo solicitudes*/
  @patch('/solicitudes')
  @response(200, {
    description: 'Solicitud PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Client', 'Admin', 'Adviser'],
    voters: [basicAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, { partial: true }),
        },
      },
    })
    solicitud: Solicitud,
    @param.where(Solicitud) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.updateAll(solicitud, where);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  /*servicio para obtener una solicitud por id*/
  @get('/solicitudes/{id}')
  @response(200, {
    description: 'Solicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Solicitud, { includeRelations: true }),
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Client', 'Admin', 'Adviser'],
    voters: [basicAuthorization],
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Solicitud, { exclude: 'where' }) filter?: FilterExcludingWhere<Solicitud>
  ): Promise<Solicitud> {
    return this.solicitudRepository.findById(id, filter);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  /*servicio para actualizar una solicitud por id*/
  @patch('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitud PATCH success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Client', 'Admin', 'Adviser'],
    voters: [basicAuthorization],
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, { partial: true }),
        },
      },
    })
    solicitud: Solicitud,
  ): Promise<void> {
    await this.solicitudRepository.updateById(id, solicitud);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  /*servicio para remplazar una solicitud por id*/
  @put('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitud PUT success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Client', 'Admin', 'Adviser'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitud: Solicitud,
  ): Promise<void> {
    await this.solicitudRepository.replaceById(id, solicitud);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  /*servicio para eliminar una solicitud por id*/
  @del('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitud DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['Client', 'Admin', 'Adviser'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudRepository.deleteById(id);
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
