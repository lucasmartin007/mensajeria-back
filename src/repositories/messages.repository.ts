import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyMensajeriaDataSource} from '../datasources/proy-mensajeria.datasource';
import {Messages, MessagesRelations} from '../models/messages.model';

export class MessagesRepository extends DefaultCrudRepository<
  Messages,
  typeof Messages.prototype.id,
  MessagesRelations
> {
  constructor(
    @inject('datasources.proy-mensajeria') dataSource: ProyMensajeriaDataSource,
  ) {
    super(Messages, dataSource);
  }
}
