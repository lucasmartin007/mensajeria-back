// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-file-transfer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject} from '@loopback/core';
import {
  HttpErrors, post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {FILE_UPLOAD_SERVICE} from '../keys';
//
import {UploadFilesKeys} from '../keys/upload-file-keys';
import {FileUploadHandler} from '../types';





/**
 * A controller to handle file uploads using multipart/form-data media type
 */
export class FileUploadController {
  /**
   * Constructor
   * @param handler - Inject an express request handler to deal with the request
   */
  constructor(
    @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
  ) {}
  @post('/files', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.handler(request, response, (err: unknown) => {
        if (err) reject(err);
        else {
          resolve(FileUploadController.getFilesAndFields(request));
        }
      });
    });
  }

  /**
   * Get files and fields for the request
   * @param request - Http request
   */
  private static getFilesAndFields(request: Request) {
    const uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
    });
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
    return {files, fields: request.body};
  }

  //

  /**
   *
   * @param response
   * @param request
   */
   @post('/advertisingImage', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Advertising Image',
      },
    },
  })
  async advertisingImageUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const advertisingImagePath = path.join(__dirname, UploadFilesKeys.ADVERTISING_IMAGE_PATH);
    let res = await this.StoreFileToPath(advertisingImagePath, UploadFilesKeys.ADVERTISING_IMAGE_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT); //
    if (res) {
      //const filename = response.req?.file.filename;
      const filename = {
        "nombre":"hola"
      }
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }

  //

  /**
   *
   * @param response
   * @param request
   */
   @post('/textFile', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Text file',
      },
    },
  })
  async textFileUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const textFilePath = path.join(__dirname, UploadFilesKeys.TEXT_FILE_PATH);
    let res = await this.StoreFileToPath(textFilePath, UploadFilesKeys.TEXT_FILE_FIELDNAME, request, response, UploadFilesKeys.TEXT_ACCEPTED_EXT); //
    if (res) {
      // const filename = response.req?.file.filename;
      const filename = {
        "nombre":"hola"
      }
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }

  //

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
   private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('This format file is not supported.'));
        },
        limits: {
          fileSize: UploadFilesKeys.MAX_FILE_SIZE
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

  //

    /**
   * Return a config for multer storage
   * @param path
   */
     private GetMulterStorageConfig(path: string) {
      var filename: string = '';
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path)
        },
        filename: function (req, file, cb) {
          let fec_actual = Date.now();
          let fec_cadena = fec_actual.toString();
          let fec_sin_milisegundos = "";
          for(let i = 0; i < fec_cadena.length; i ++){
            if(i > fec_cadena.length - 1 - 3){
              fec_sin_milisegundos += "0"
            }else{
              fec_sin_milisegundos += fec_cadena[i]
            }
          }
          let fec_sin_milisegundos_numerica = parseInt(fec_sin_milisegundos)
          filename = `${fec_sin_milisegundos_numerica}-${file.originalname}`
          cb(null, filename);
        }
      });
      return storage;
    }
}
