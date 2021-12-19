import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DatasourceDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Ciudad, TipoInmueble, User, Solicitud} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {TipoInmuebleRepository} from './tipo-inmueble.repository';
import {UserRepository} from './user.repository';
import {SolicitudRepository} from './solicitud.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {
  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Inmueble.prototype.id>;

  public readonly tipoInmueble: BelongsToAccessor<TipoInmueble, typeof Inmueble.prototype.id>;

  public readonly asesor: BelongsToAccessor<User, typeof Inmueble.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.datasource') dataSource: DatasourceDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('TipoInmuebleRepository') protected tipoInmuebleRepositoryGetter: Getter<TipoInmuebleRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Inmueble, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', userRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.tipoInmueble = this.createBelongsToAccessorFor('tipoInmueble', tipoInmuebleRepositoryGetter,);
    this.registerInclusionResolver('tipoInmueble', this.tipoInmueble.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
