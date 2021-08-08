// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {
  AnyObject,
  repository
} from '@loopback/repository';
import {post, requestBody, response} from '@loopback/rest';
import axios from 'axios';
import {SolicitudesRepository} from '../repositories';




export class P3PrevMSolicitudesController {
  constructor(
    @repository(SolicitudesRepository)
    public solicitudesRepository: SolicitudesRepository,
  ) { }

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
  ): Promise<any> {
    // console.log(id_usuario)
    let cad = ""

    'use strict';
    const {networkInterfaces} = require('os');
    let nets = networkInterfaces();
    let results = Object.create(null); // Or just '{}', an empty object
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          results[name].push(net.address);
        }
      }
    }
    let dir_ip = ""
    if (results["en0"]) dir_ip = results["en0"][0]
    if (results["eno0"]) dir_ip = results["eno0"][0]
    if (results["wlo1"]) dir_ip = results["wlo1"][0]

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
        direccion_ip: dir_ip//, created_at: {gt: fec_minima}
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
      } else if (arr.metodo == "post") {
        await axios
          .post(arr.pagina_web, {
            headers: {"Content-Type": "application/json"},
            body: arr.contenido
          })
          .then(r => {
            cad += JSON.stringify(r.data)
          });

      }
    } else {
      cad += "No se puede ver la cadena porque no esta autorizado"
    }

    this.solicitudesRepository.create({
      "direccion_ip": dir_ip,
      "created_at": fec_actual
    });

    return cad
  }

}
