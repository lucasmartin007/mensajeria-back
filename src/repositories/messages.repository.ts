import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyMensajeriaDataSource} from '../datasources';
import {Messages, MessagesRelations} from '../models';

export class MessagesRepository extends DefaultCrudRepository<
  Messages,
  typeof Messages.prototype.id,
  MessagesRelations
> {
  constructor(
    @inject('datasources.proy_mensajeria') dataSource: ProyMensajeriaDataSource,
  ) {
    super(Messages, dataSource);
  }
}
