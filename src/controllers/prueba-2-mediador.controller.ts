// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {get, response} from '@loopback/rest';
import axios from 'axios';


export interface UsGithub {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export class Prueba2MediadorController {
  constructor() { }

  @get('/obtener_registros')
  @response(200, {
    description: 'Array of registrys',
    content: {
      'application/json': {
        'result': 'array'
      },
    },
  })
  async obtener_registros(): Promise<string> {
    let cad_json: string = ""

    const url_usuarios = "https://api.github.com/users"

    await axios
      .get(url_usuarios, {
        headers: {"Content-Type": "application/json"}
      })
      .then(r => {
        cad_json += JSON.stringify(r.data)
      });

    return cad_json
  }

}
