import {inject} from '@loopback/core';
import {
  get,

  HttpErrors, oas,
  param,
  Response, RestBindings
} from '@loopback/rest';
import path from 'path';


export class FileDownloadController {
  constructor() { }

  //
  @get('/textFiles/{nomarchivo}/{fecha}')
  @oas.response.file()
  async downloadTextFile(
    @param.path.string('nomarchivo') nomarchivo: string,
    @param.path.number('fecha') fecha: number,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const folder = "./uploads/archivostexto/";
    const fileName = fecha.toString() + "-" + nomarchivo;
    response.download(folder + fileName);
    return response;
  }

  //
  @get('/imageFiles/{nomarchivo}/{fecha}')
  @oas.response.file()
  async downloadImageFile(
    @param.path.string('nomarchivo') nomarchivo: string,
    @param.path.number('fecha') fecha: number,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const folder = "./uploads/archivosimagen/";
    const fileName = fecha.toString() + "-" + nomarchivo;
    response.download(folder + fileName);
    return response;
  }

  //

  //
  @get('/base64ImageFile/{nom_imagen}/{fec_imagen}')
  @oas.response.file()
  async getBase64ImageFile(
    @param.path.string('nom_imagen') nom_imagen: string,
    @param.path.number('fec_imagen') fec_imagen: number,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const fs = require('fs');
    const folder = "./uploads/archivosimagen/";
    const fileName = fec_imagen.toString() + "-" + nom_imagen;
    fs.readFile(folder + fileName, 'base64', (err: any, data: any) => {
      if (err) {
        console.error(err)
        return
      }

      console.log(data)
      response = data;
    })
    // response.download(folder + fileName);
    return response;
  }

  //

  /**
   * Validate file names to prevent them goes beyond the designated directory
   * @param fileName - File name
   */
  private ValidateFileName(folder: string, fileName: string) {
    const resolved = path.resolve(folder, fileName);
    if (resolved.startsWith(folder)) return resolved;
    // The resolved file is outside sandbox
    throw new HttpErrors[400](`Invalid file name: ${fileName}`);
  }

}
