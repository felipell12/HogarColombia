import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DatasourceDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Inmueble, User} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {UserRepository} from './user.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof Solicitud.prototype.id>;

  public readonly cliente: BelongsToAccessor<User, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.datasource') dataSource: DatasourceDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Solicitud, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', userRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
  }
}
