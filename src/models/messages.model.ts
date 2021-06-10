import {Entity, model, property} from '@loopback/repository';

@model()
export class Messages extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  sender: number;

  @property({
    type: 'number',
    required: true,
  })
  receiver: number;

  @property({
    type: 'string',
    required: true,
  })
  message: string;


  constructor(data?: Partial<Messages>) {
    super(data);
  }
}

export interface MessagesRelations {
  // describe navigational properties here
}

export type MessagesWithRelations = Messages & MessagesRelations;
