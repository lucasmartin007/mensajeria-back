// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {
  AnyObject,
  Filter, FilterExcludingWhere, repository
} from '@loopback/repository';
import {
  get, getModelSchemaRef,
  param, post,
  requestBody,
  response
} from '@loopback/rest';
import {Usuarios} from '../models/usuarios.model';
import {UsuariosRepository} from '../repositories';


export class UsuarioDevuelto {
  id: number
  username: string
}

export class UsuariosController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,

  ) { }

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

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarios) filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.usuariosRepository.find(filter);
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

  @post('/usuarios/login')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          username: "string",
          password: "string",
        },
      },
    })
    credenciales: AnyObject,
  ): Promise<Object> {
    // console.log(credenciales)

    return await this.usuariosRepository.find({where: {username: credenciales.username, password: credenciales.password}});
  }

  //

  @post('/usuarios-campos')
  @response(200, {
    description: 'Array of Usuarios model instances',
    content: {
      'application/json': {
        schema: {
          items: getModelSchemaRef(Usuarios, {includeRelations: true}),
        },
      },
    },
  })
  async findUsuarios(
    @requestBody({
      content: {
        'application/json': {
          idUsuario: 0,
        },
      },
    })
    arreglo: AnyObject,
  ): Promise<AnyObject> {
    return await this.usuariosRepository.find(
      {
        fields: ["id", "username"],
        where: {
          id: {
            neq: arreglo.idUsuario
          }
        }
      }
    );
  }

  //

  @get('/usuario-nombre/{id}')
  @response(200, {
    description: 'Messages model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id_usuario: number,
    @param.filter(Usuarios, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuarios>
  ): Promise<Object> {
    return await this.usuariosRepository.find({
      fields: ["username"],
      where: {
        id: id_usuario
      }
    });
  }
}
