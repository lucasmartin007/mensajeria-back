// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {
  repository
} from '@loopback/repository';
import {
  getModelSchemaRef,






  post,








  requestBody,
  response,

  SchemaObject
} from '@loopback/rest';
import {Usuarios} from '../models/Usuarios.model';
import {UsuariosRepository} from '../repositories';


const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UsuariosController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository : UsuariosRepository,

  ) {}

  @post('/usuarios')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuarios',

          }),
        },
      },
    })
    usuarios: Usuarios,
  ): Promise<Usuarios> {
    return this.usuariosRepository.create(usuarios);
  }

  //

  // @get('/greet/{name}', {
  //   responses: {
  //     '200': {
  //       description: '',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //             properties: {
  //               message: 'string',
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // async greet(@param.path.string('name') name: string): Promise<Object> {
  //   const greeting = "Hola " + name
  //   return {
  //     timestamp: new Date(),
  //     greeting,
  //   };
  // }
}
