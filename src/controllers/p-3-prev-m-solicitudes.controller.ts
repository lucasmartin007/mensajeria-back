// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  AnyObject,
  repository
} from '@loopback/repository';
import {post, requestBody, response} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import axios from 'axios';
import {SolicitudesRepository} from '../repositories';






export class P3PrevMSolicitudesController {
  constructor(
    @repository(SolicitudesRepository)
    public solicitudesRepository: SolicitudesRepository,
  ) { }

  @authenticate('jwt')
  @post('/obtener_registros')
  @response(200, {
    description: 'Cadena de caracteres',
    content: {
      'application/json': {
        "result": "This is the result"
      },
    },
  })
  async obt_registros(
    @requestBody({
      content: {
        'application/json': {
          metodo: "get or post",
          pagina_web: "web page",
          contenido: "array of data"
        },
      },
    })
    arr: AnyObject,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<any> {
    // console.log(id_usuario)
    let cad = ""

    let id_usuario = currentUserProfile[securityId];

    let fec_actual = new Date()
    console.log(fec_actual)

    let fec_minima_numero = fec_actual.getTime() - 1000 * 60 * 30
    let fec_minima = new Date(fec_minima_numero)
    console.log(fec_minima)

    await this.solicitudesRepository.deleteAll({
      created_at: {lt: fec_minima}
    })

    let arreglo = await this.solicitudesRepository.find({
      where: {
        user_id: id_usuario//, created_at: {gt: fec_minima}
      }
    })

    console.log("Longitud del objeto: " + arreglo.length)

    if (arreglo.length < 10) {
      // cad += "Cadena devuelta con autorizacion"
      if (arr.metodo == "get") {
        await axios
          .get(arr.pagina_web, {
            headers: {"Content-Type": "application/json"}
          })
          .then(r => {
            cad += JSON.stringify(r.data)
          });
      } else if (arr.metodo == "post") { // "https://jsonplaceholder.typicode.com/posts"
        await axios
          .post(arr.pagina_web, arr.contenido)
          .then(r => {
            cad += JSON.stringify(r.data)
          })
          .catch(error => {
            console.error('There was an error!', error);
          })

      }
    } else {
      cad += "No se puede ver la cadena porque no esta autorizado"
    }

    this.solicitudesRepository.create({
      "user_id": id_usuario,
      "created_at": fec_actual
    });

    return cad
  }

}
