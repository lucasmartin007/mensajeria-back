import {Entity, model, property} from '@loopback/repository';

@model()
export class Solicitudes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  user_id?: string;

  @property({
    type: 'Date',
    required: true,
  })
  created_at: Date;


  constructor(data?: Partial<Solicitudes>) {
    super(data);
  }
}

export interface SolicitudesRelations {
  // describe navigational properties here
}

export type SolicitudesWithRelations = Solicitudes & SolicitudesRelations;
