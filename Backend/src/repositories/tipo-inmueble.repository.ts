import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DatasourceDataSource} from '../datasources';
import {TipoInmueble, TipoInmuebleRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class TipoInmuebleRepository extends DefaultCrudRepository<
  TipoInmueble,
  typeof TipoInmueble.prototype.id,
  TipoInmuebleRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof TipoInmueble.prototype.id>;

  constructor(
    @inject('datasources.datasource') dataSource: DatasourceDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(TipoInmueble, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
