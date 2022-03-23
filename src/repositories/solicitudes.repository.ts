import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyMensajeriaDataSource} from '../datasources/proy-mensajeria.datasource';
import {Solicitudes, SolicitudesRelations} from '../models';

export class SolicitudesRepository extends DefaultCrudRepository<
  Solicitudes,
  typeof Solicitudes.prototype.id,
  SolicitudesRelations
> {
  constructor(
    @inject('datasources.proy-mensajeria') dataSource: ProyMensajeriaDataSource,
  ) {
    super(Solicitudes, dataSource);
  }
}
