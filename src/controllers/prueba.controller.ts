// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {AnyObject} from '@loopback/repository';
import {post, requestBody, response} from '@loopback/rest';


export class PruebaController {
  constructor() { }

  //

  @post('/verificar-suma')
  @response(200, {
    description: 'Resultado de la consulta',
    content: {
      'application/json': {
        'result': 'true or false',
      },
    },
  })
  async verificar_suma(
    @requestBody({
      content: {
        'application/json': {
          arr_numeros: [],
          numero: 0,
        },
      },
    })
    arr: AnyObject,
  ): Promise<boolean> {
    let arr_numeros = arr.arr_numeros
    let numero = arr.numero

    let tam = arr_numeros.length

    if (tam < 50) {
      for (let i = 0; i < tam - 2; i++) {
        for (let j = i + 1; j < tam - 1; j++) {
          if (arr_numeros[i] + arr_numeros[j] == numero) {
            return true
          }
        }
      }
    } else {
      let may: number = 0, segmay: number = 0
      let men: number = 0, segmen: number = 0

      may = arr_numeros[0]
      men = arr_numeros[0]
      segmay = arr_numeros[0]
      segmen = arr_numeros[0]

      for (let i = 1; i < tam - 1; i++) {
        if (arr_numeros[i] > may) {
          segmay = may
          may = arr_numeros[i]
        } else if (arr_numeros[i] > segmay) {
          segmay = arr_numeros[i]
        }
        if (arr_numeros[i] < men) {
          segmen = men
          men = arr_numeros[i]
        } else if (arr_numeros[i] < segmay) {
          segmen = arr_numeros[i]
        }
      }

      if (men + segmen > numero || may + segmay < numero) {
        return false
      } else {
        let nuev_lista = this.insercionBinaria(arr_numeros, tam)
        if (numero > may) {
          let resta = numero - may
          let posicion = this.busquedaBinaria(nuev_lista, resta)
          if (nuev_lista[posicion] + resta > numero) {
            posicion--
          }
          let pos_resta2 = -1
          for (let i = posicion; i < tam - 1; i++) {
            let resta2 = numero - nuev_lista[i]
            pos_resta2 = this.busquedaBinaria2(nuev_lista, resta2)
            if (pos_resta2 != -1) {
              return true
            }
          }
        } else {
          for (let i = 0; i < tam - 1; i++) {
            if (nuev_lista[i] < numero) {
              let resta2 = numero - nuev_lista[i]
              let pos_resta2 = -1
              pos_resta2 = this.busquedaBinaria2(nuev_lista, resta2)
              if (pos_resta2 != -1) {
                return true
              }
            }
          }
        }
      }
    }

    return false
  }

  insercionBinaria(lista: number[], tam: number): number[] {
    let aux: number, izq: number, der: number, m: number, j: number;
    for (let i = 1; i < tam; i++) {
      aux = lista[i]
      izq = 0
      der = i - 1
      while (izq <= der) {
        m = Math.floor((izq + der) / 2)
        if (aux < lista[m]) {
          der = m - 1
        } else {
          izq = m + 1
        }
      }

      j = i - 1
      while (j >= izq) {
        lista[j + 1] = lista[j]
        j = j - 1
      }
      lista[izq] = aux
    }
    return lista;
  }

  busquedaBinaria(lista: number[], valor: number): number {
    let izq: number, der: number, medio: number = 0

    izq = 0
    der = lista.length - 1
    while (izq <= der) {
      medio = Math.floor((izq + der) / 2)
      if (lista[medio] == valor) {
        return medio
      } else if (lista[medio] > valor) {
        der = medio - 1
      } else {
        izq = medio + 1
      }
    }
    return medio
  }

  busquedaBinaria2(lista: number[], valor: number): number {
    let izq: number, der: number, medio: number = 0

    izq = 0
    der = lista.length - 1
    while (izq <= der) {
      medio = Math.floor((izq + der) / 2)
      if (lista[medio] == valor) {
        return medio
      } else if (lista[medio] > valor) {
        der = medio - 1
      } else {
        izq = medio + 1
      }
    }
    return -1
  }
}
