import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyMensajeriaDataSource} from '../datasources/proy-mensajeria.datasource';
import {Usuarios, UsuariosRelations} from '../models';


export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {
  constructor(
    @inject('datasources.proy_mensajeria') dataSource: ProyMensajeriaDataSource,
  ) {
    super(Usuarios, dataSource);
  }

}
