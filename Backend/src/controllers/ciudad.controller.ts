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
import {Ciudad} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadController {
  constructor(
    @repository(CiudadRepository)
    public ciudadRepository : CiudadRepository,
  ) {}

  @post('/ciudades')
  @response(200, {
    description: 'Ciudad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ciudad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {
            title: 'NewCiudad',
            exclude: ['id'],
          }),
        },
      },
    })
    ciudad: Omit<Ciudad, 'id'>,
  ): Promise<Ciudad> {
    return this.ciudadRepository.create(ciudad);
  }


  @get('/ciudades/count')
  @response(200, {
    description: 'Ciudad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ciudad) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.ciudadRepository.count(where);
  }

  @get('/ciudades')
  @response(200, {
    description: 'Array of Ciudad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ciudad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ciudad) filter?: Filter<Ciudad>,
  ): Promise<Ciudad[]> {
    return this.ciudadRepository.find(filter);
  }


  @patch('/ciudades')
  @response(200, {
    description: 'Ciudad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Ciudad,
    @param.where(Ciudad) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.ciudadRepository.updateAll(ciudad, where);
  }


  @get('/ciudades/{id}')
  @response(200, {
    description: 'Ciudad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ciudad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ciudad, {exclude: 'where'}) filter?: FilterExcludingWhere<Ciudad>
  ): Promise<Ciudad> {
    return this.ciudadRepository.findById(id, filter);
  }


  @patch('/ciudades/{id}')
  @response(204, {
    description: 'Ciudad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Ciudad,
  ): Promise<void> {
    await this.ciudadRepository.updateById(id, ciudad);
  }

  @put('/ciudades/{id}')
  @response(204, {
    description: 'Ciudad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ciudad: Ciudad,
  ): Promise<void> {
    await this.ciudadRepository.replaceById(id, ciudad);
  }

  @del('/ciudades/{id}')
  @response(204, {
    description: 'Ciudad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ciudadRepository.deleteById(id);
  }
}