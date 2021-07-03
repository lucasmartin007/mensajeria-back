import {inject} from '@loopback/core';
import {
  get,

  HttpErrors, oas,
  param,
  Response,
  RestBindings
} from '@loopback/rest';
import path from 'path';


export class FileDownloadController {
  constructor() {}

  //
  @get('/files/{nomarchivo}/{fecha}')
  @oas.response.file()
  async downloadFile(
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
